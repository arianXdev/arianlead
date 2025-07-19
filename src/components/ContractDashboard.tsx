import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Vote, 
  Coins, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Wallet,
  Send,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  contractService, 
  Stages, 
  getStageName, 
  formatTimeRemaining,
  BranchStatus,
  getStatusName 
} from '@/lib/contracts';
import { ProposalSubmissionForm } from './ProposalSubmissionForm';
import { BranchCard } from './BranchCard';

interface ContractState {
  stage: Stages;
  round: number;
  timer: number;
  mainBranch: string;
  children: string[];
  userBalance: string;
}

export const ContractDashboard: React.FC = () => {
  const [contractState, setContractState] = useState<ContractState | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [branches, setBranches] = useState<any[]>([]);
  const [userAddress, setUserAddress] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    loadContractState();
    getUserAddress();
    
    // Update timer every second
    const timer = setInterval(() => {
      if (contractState) {
        setTimeRemaining(formatTimeRemaining(contractState.timer));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contractState?.timer]);

  const getUserAddress = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setUserAddress(accounts[0]);
      }
    } catch (error) {
      console.error('Error getting user address:', error);
    }
  };

  const loadContractState = async () => {
    try {
      setLoading(true);
      
      const [stage, round, timer, mainBranch, children, balance] = await Promise.all([
        contractService.getCurrentStage(),
        contractService.getCurrentRound(),
        contractService.getTimer(),
        contractService.getMainBranch(),
        contractService.getChildren(),
        contractService.getBalance().catch(() => BigInt(0))
      ]);

      const state: ContractState = {
        stage,
        round,
        timer,
        mainBranch,
        children,
        userBalance: balance.toString()
      };

      setContractState(state);
      setTimeRemaining(formatTimeRemaining(timer));

      // Load branch information
      const branchPromises = [
        contractService.getBranchInfo(mainBranch),
        ...children.map(child => contractService.getBranchInfo(child))
      ];

      const branchInfos = await Promise.all(branchPromises);
      setBranches(branchInfos);

    } catch (error: any) {
      console.error('Error loading contract state:', error);
      toast({
        title: "Contract Error",
        description: error.message || "Failed to load contract state",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimAll = async () => {
    try {
      setLoading(true);
      await contractService.claimAll();
      toast({
        title: "Success",
        description: "Successfully claimed all tokens",
      });
      await loadContractState();
    } catch (error: any) {
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim tokens",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      await contractService.resetBalance();
      toast({
        title: "Success",
        description: "Successfully withdrew funds",
      });
      await loadContractState();
    } catch (error: any) {
      toast({
        title: "Withdrawal Failed",
        description: error.message || "Failed to withdraw funds",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !contractState) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading contract state...</span>
      </div>
    );
  }

  if (!contractState) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Failed to load contract state. Please ensure your wallet is connected to Sepolia testnet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStageColor = (stage: Stages) => {
    const colors = {
      [Stages.REGULAR]: 'bg-blue-500',
      [Stages.OPEN]: 'bg-green-500',
      [Stages.SUGGESTION]: 'bg-yellow-500',
      [Stages.CLAIMING]: 'bg-orange-500',
      [Stages.SELECTION]: 'bg-purple-500'
    };
    return colors[stage] || 'bg-gray-500';
  };

  const isProposalStage = contractState.stage === Stages.SUGGESTION;
  const canClaim = contractState.stage === Stages.CLAIMING || contractState.stage === Stages.SELECTION;

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Stage</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className={`${getStageColor(contractState.stage)} text-white`}>
                {getStageName(contractState.stage)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Round {contractState.round} • {timeRemaining} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractState.children.length}</div>
            <p className="text-xs text-muted-foreground">
              Competing for governance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractState.userBalance}</div>
            <p className="text-xs text-muted-foreground">
              Wei available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            {canClaim && (
              <Button 
                onClick={handleClaimAll} 
                size="sm" 
                className="w-full"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Claim All'}
              </Button>
            )}
            <Button 
              onClick={handleWithdraw} 
              variant="outline" 
              size="sm" 
              className="w-full"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Withdraw'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
          <TabsTrigger value="main">Main Branch</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Proposals</CardTitle>
              <CardDescription>
                Current proposals competing for governance control
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contractState.children.length === 0 ? (
                <div className="text-center py-8">
                  <Vote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No active proposals</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {branches.slice(1).map((branch, index) => (
                    <BranchCard
                      key={branch.address}
                      branch={branch}
                      userAddress={userAddress}
                      onUpdate={loadContractState}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submit">
          {isProposalStage ? (
            <ProposalSubmissionForm 
              onSubmit={loadContractState}
              currentRound={contractState.round}
            />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Proposal submission is only available during the Suggestion stage.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Current stage: {getStageName(contractState.stage)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="main">
          {branches.length > 0 && (
            <BranchCard
              branch={branches[0]}
              userAddress={userAddress}
              onUpdate={loadContractState}
              isMainBranch
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};