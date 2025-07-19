import { ethers } from 'ethers';

// Contract addresses on Sepolia testnet
export const CONTRACTS = {
  FACTORY: '0xc4b22029956E322B78DcBd8CEC5947Ab64384b2a',
  SEPOLIA_CHAIN_ID: 11155111,
} as const;

// ABI URLs
const FACTORY_ABI_URL = 'https://raw.githubusercontent.com/arianXdev/smart-constitution-d535919e/refs/heads/main/ParaLeadFactory_ABI.json';
const BRANCH_ABI_URL = 'https://raw.githubusercontent.com/arianXdev/smart-constitution-d535919e/refs/heads/main/ParaLeadBranch_ABI.json';

// Cache for ABIs
let factoryABI: any[] | null = null;
let branchABI: any[] | null = null;

// Fetch ABIs
export async function getFactoryABI() {
  if (!factoryABI) {
    const response = await fetch(FACTORY_ABI_URL);
    factoryABI = await response.json();
  }
  return factoryABI;
}

export async function getBranchABI() {
  if (!branchABI) {
    const response = await fetch(BRANCH_ABI_URL);
    branchABI = await response.json();
  }
  return branchABI;
}

// Enums from contracts
export enum ProposalType {
  BASIC = 0,
  PURCHASE = 1,
  HIRING = 2,
  FIRING = 3,
  REPLACING = 4,
  DEMOTE = 5
}

export enum Stages {
  REGULAR = 0,
  OPEN = 1,
  SUGGESTION = 2,
  CLAIMING = 3,
  SELECTION = 4
}

export enum BranchStatus {
  CHILD = 0,
  LOSER = 1,
  WINNER = 2,
  MOTHER = 3,
  DEAD = 4
}

// Contract utility functions
export class ContractService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private factoryContract: ethers.Contract | null = null;

  async initialize() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not found');
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();

    // Check if we're on Sepolia
    const network = await this.provider.getNetwork();
    if (Number(network.chainId) !== CONTRACTS.SEPOLIA_CHAIN_ID) {
      throw new Error('Please switch to Sepolia testnet');
    }

    // Initialize factory contract
    const abi = await getFactoryABI();
    this.factoryContract = new ethers.Contract(CONTRACTS.FACTORY, abi, this.signer);
  }

  async getFactoryContract() {
    if (!this.factoryContract) {
      await this.initialize();
    }
    return this.factoryContract!;
  }

  async getBranchContract(address: string) {
    if (!this.signer) {
      await this.initialize();
    }
    const abi = await getBranchABI();
    return new ethers.Contract(address, abi, this.signer);
  }

  // Factory contract methods
  async getCurrentStage(): Promise<Stages> {
    const contract = await this.getFactoryContract();
    const stage = await contract.getStage();
    return Number(stage);
  }

  async getCurrentRound(): Promise<number> {
    const contract = await this.getFactoryContract();
    return Number(await contract.round());
  }

  async getMainBranch(): Promise<string> {
    const contract = await this.getFactoryContract();
    return await contract.main();
  }

  async getChildren(): Promise<string[]> {
    const contract = await this.getFactoryContract();
    const childrenLength = await contract.getChildrenSize();
    const children: string[] = [];
    
    for (let i = 0; i < childrenLength; i++) {
      const child = await contract.children(i);
      children.push(child);
    }
    
    return children;
  }

  async getTimer(): Promise<number> {
    const contract = await this.getFactoryContract();
    const timer = await contract.timer();
    return Number(timer);
  }

  async submitProposal(type: ProposalType, title: string, hash: string): Promise<string> {
    const contract = await this.getFactoryContract();
    const tx = await contract.submitProposal(type, title, hash);
    const receipt = await tx.wait();
    
    // Extract child address from BranchCreated event
    const event = receipt.logs.find((log: any) => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed?.name === 'BranchCreated';
      } catch {
        return false;
      }
    });
    
    if (event) {
      const parsed = contract.interface.parseLog(event);
      return parsed?.args[0]; // child address
    }
    
    throw new Error('Failed to get child address from transaction');
  }

  async claimAll(): Promise<void> {
    const contract = await this.getFactoryContract();
    const tx = await contract.claimAll();
    await tx.wait();
  }

  async getBalance(): Promise<bigint> {
    const contract = await this.getFactoryContract();
    const tx = await contract.getBalance();
    await tx.wait();
    
    // Get the updated balance
    const address = await this.signer!.getAddress();
    const payee = await contract.payees(address);
    return payee.payBalance;
  }

  async resetBalance(): Promise<void> {
    const contract = await this.getFactoryContract();
    const tx = await contract.resetBalance();
    await tx.wait();
  }

  // Branch contract methods
  async getBranchInfo(branchAddress: string) {
    const contract = await this.getBranchContract(branchAddress);
    
    const [name, symbol, proposal, vendor, investment, status, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.proposal(),
      contract.vendor(),
      contract.investment(),
      contract.status(),
      contract.totalSupply()
    ]);

    return {
      name,
      symbol,
      proposal,
      vendor,
      investment: ethers.formatEther(investment),
      status: Number(status),
      totalSupply: ethers.formatEther(totalSupply),
      address: branchAddress
    };
  }

  async getTokenBalance(branchAddress: string, userAddress: string): Promise<string> {
    const contract = await this.getBranchContract(branchAddress);
    const balance = await contract.balanceOf(userAddress);
    return ethers.formatEther(balance);
  }

  async buyTokens(branchAddress: string, amount: string, valueInEth: string): Promise<void> {
    const contract = await this.getBranchContract(branchAddress);
    const amountWei = ethers.parseEther(amount);
    const valueWei = ethers.parseEther(valueInEth);
    
    const tx = await contract.buy(amountWei, { value: valueWei });
    await tx.wait();
  }

  async sellTokens(branchAddress: string, amount: string): Promise<void> {
    const contract = await this.getBranchContract(branchAddress);
    const amountWei = ethers.parseEther(amount);
    
    const tx = await contract.sell(amountWei);
    await tx.wait();
  }

  async claimTokens(branchAddress: string): Promise<void> {
    const contract = await this.getBranchContract(branchAddress);
    const tx = await contract.claim();
    await tx.wait();
  }

  async withdrawFunds(branchAddress: string): Promise<void> {
    const contract = await this.getBranchContract(branchAddress);
    const tx = await contract.withdraw();
    await tx.wait();
  }

  async revealProposal(
    branchAddress: string, 
    proposal: string, 
    vendor: string, 
    investment: string
  ): Promise<boolean> {
    const contract = await this.getBranchContract(branchAddress);
    const investmentWei = ethers.parseEther(investment);
    
    const tx = await contract.reveal(proposal, vendor, investmentWei);
    await tx.wait();
    return true;
  }

  // Utility methods
  async getBlockTimestamp(): Promise<number> {
    if (!this.provider) await this.initialize();
    const block = await this.provider!.getBlock('latest');
    return block!.timestamp;
  }

  async switchToSepolia(): Promise<void> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID in hex
      });
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xaa36a7',
            chainName: 'Sepolia Testnet',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io/'],
          }],
        });
      } else {
        throw error;
      }
    }
  }
}

// Singleton instance
export const contractService = new ContractService();

// Helper function to create proposal hash
export function createProposalHash(proposal: string, vendor: string, investment: string): string {
  const investmentWei = ethers.parseEther(investment);
  return ethers.keccak256(
    ethers.solidityPacked(
      ['string', 'address', 'uint256'],
      [proposal, vendor, investmentWei]
    )
  );
}

// Helper function to format time remaining
export function formatTimeRemaining(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const remaining = timestamp - now;
  
  if (remaining <= 0) return 'Expired';
  
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper function to get stage name
export function getStageName(stage: Stages): string {
  const stageNames = {
    [Stages.REGULAR]: 'Regular',
    [Stages.OPEN]: 'Open',
    [Stages.SUGGESTION]: 'Suggestion',
    [Stages.CLAIMING]: 'Claiming',
    [Stages.SELECTION]: 'Selection'
  };
  return stageNames[stage] || 'Unknown';
}

// Helper function to get proposal type name
export function getProposalTypeName(type: ProposalType): string {
  const typeNames = {
    [ProposalType.BASIC]: 'Basic',
    [ProposalType.PURCHASE]: 'Purchase',
    [ProposalType.HIRING]: 'Hiring',
    [ProposalType.FIRING]: 'Firing',
    [ProposalType.REPLACING]: 'Replacing',
    [ProposalType.DEMOTE]: 'Demote'
  };
  return typeNames[type] || 'Unknown';
}

// Helper function to get status name
export function getStatusName(status: BranchStatus): string {
  const statusNames = {
    [BranchStatus.CHILD]: 'Active Proposal',
    [BranchStatus.LOSER]: 'Rejected',
    [BranchStatus.WINNER]: 'Winner',
    [BranchStatus.MOTHER]: 'Current Main',
    [BranchStatus.DEAD]: 'Inactive'
  };
  return statusNames[status] || 'Unknown';
}