import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  Send,
  Loader2,
  Crown,
  Wallet
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  contractService, 
  BranchStatus, 
  getStatusName,
  ProposalType,
  getProposalTypeName 
} from '@/lib/contracts';

interface BranchInfo {
  name: string;
  symbol: string;
  proposal: string;
  vendor: string;
  investment: string;
  status: number;
  totalSupply: string;
  address: string;
}

interface BranchCardProps {
  branch: BranchInfo;
  userAddress: string;
  onUpdate: () => void;
  isMainBranch?: boolean;
}

export const BranchCard: React.FC<BranchCardProps> = ({
  branch,
  userAddress,
  onUpdate,
  isMainBranch = false
}) => {
  const [userTokens, setUserTokens] = useState('0');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyValue, setBuyValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [revealData, setRevealData] = useState({
    description: '',
    vendor: '',
    investment: '0'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUserTokens();
  }, [branch.address, userAddress]);

  const loadUserTokens = async () => {
    if (!userAddress) return;
    
    try {
      const balance = await contractService.getTokenBalance(branch.address, userAddress);
      setUserTokens(balance);
    } catch (error) {
      console.error('Error loading user tokens:', error);
    }
  };

  const handleBuyTokens = async () => {
    if (!buyAmount || !buyValue) {
      toast({
        title: "Validation Error",
        description: "Please enter both token amount and ETH value",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await contractService.buyTokens(branch.address, buyAmount, buyValue);
      toast({
        title: "Success",
        description: `Bought ${buyAmount} tokens`,
      });
      setBuyAmount('');
      setBuyValue('');
      await loadUserTokens();
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to buy tokens",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSellTokens = async () => {
    if (!sellAmount) {
      toast({
        title: "Validation Error",
        description: "Please enter token amount to sell",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await contractService.sellTokens(branch.address, sellAmount);
      toast({
        title: "Success",
        description: `Sold ${sellAmount} tokens`,
      });
      setSellAmount('');
      await loadUserTokens();
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to sell tokens",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    try {
      setLoading(true);
      await contractService.claimTokens(branch.address);
      toast({
        title: "Success",
        description: "Successfully claimed tokens",
      });
      await loadUserTokens();
      onUpdate();
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
      await contractService.withdrawFunds(branch.address);
      toast({
        title: "Success",
        description: "Successfully withdrew funds",
      });
      await loadUserTokens();
      onUpdate();
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

  const handleReveal = async () => {
    if (!revealData.description) {
      toast({
        title: "Validation Error",
        description: "Description is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await contractService.revealProposal(
        branch.address,
        revealData.description,
        revealData.vendor,
        revealData.investment
      );
      toast({
        title: "Success",
        description: "Proposal revealed successfully",
      });
      setShowReveal(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Reveal Failed",
        description: error.message || "Failed to reveal proposal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: BranchStatus) => {
    const colors = {
      [BranchStatus.CHILD]: 'bg-blue-500',
      [BranchStatus.LOSER]: 'bg-red-500',
      [BranchStatus.WINNER]: 'bg-green-500',
      [BranchStatus.MOTHER]: 'bg-purple-500',
      [BranchStatus.DEAD]: 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const canTrade = branch.status === BranchStatus.WINNER || branch.status === BranchStatus.CHILD;
  const needsReveal = branch.proposal === '' && branch.status === BranchStatus.CHILD;

  return (
    <Card className={`${isMainBranch ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {isMainBranch && <Crown className="h-5 w-5 text-yellow-500" />}
              {branch.name}
              <Badge className={`${getStatusBadgeColor(branch.status as BranchStatus)} text-white`}>
                {getStatusName(branch.status as BranchStatus)}
              </Badge>
            </CardTitle>
            <CardDescription>
              {branch.symbol} • Total Supply: {parseFloat(branch.totalSupply).toFixed(4)} tokens
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* User Token Balance */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">Your Tokens:</span>
            </div>
            <span className="font-bold">{parseFloat(userTokens).toFixed(4)}</span>
          </div>

          {/* Proposal Details */}
          {branch.proposal && (
            <div className="space-y-2">
              <h4 className="font-semibold">Proposal Details</h4>
              <p className="text-sm text-muted-foreground">{branch.proposal}</p>
              {branch.vendor !== '0x0000000000000000000000000000000000000000' && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Vendor:</span>
                    <p className="text-muted-foreground">{branch.vendor.slice(0, 6)}...{branch.vendor.slice(-4)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Investment:</span>
                    <p className="text-muted-foreground">{branch.investment} ETH</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reveal Form */}
          {needsReveal && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-600">Proposal Needs Reveal</h4>
              {!showReveal ? (
                <Button onClick={() => setShowReveal(true)} variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Reveal Proposal
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reveal-description">Description</Label>
                    <Textarea
                      id="reveal-description"
                      value={revealData.description}
                      onChange={(e) => setRevealData({ ...revealData, description: e.target.value })}
                      placeholder="Proposal description..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reveal-vendor">Vendor Address</Label>
                    <Input
                      id="reveal-vendor"
                      value={revealData.vendor}
                      onChange={(e) => setRevealData({ ...revealData, vendor: e.target.value })}
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="reveal-investment">Investment (ETH)</Label>
                    <Input
                      id="reveal-investment"
                      type="number"
                      step="0.01"
                      min="0"
                      value={revealData.investment}
                      onChange={(e) => setRevealData({ ...revealData, investment: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleReveal} disabled={loading} size="sm">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Reveal'}
                    </Button>
                    <Button onClick={() => setShowReveal(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Trading Interface */}
          {canTrade && (
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="claim">Claim</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="buy-tokens">Tokens</Label>
                    <Input
                      id="buy-tokens"
                      type="number"
                      step="0.01"
                      min="0"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buy-value">ETH Value</Label>
                    <Input
                      id="buy-value"
                      type="number"
                      step="0.001"
                      min="0"
                      value={buyValue}
                      onChange={(e) => setBuyValue(e.target.value)}
                      placeholder="0.000"
                    />
                  </div>
                </div>
                <Button onClick={handleBuyTokens} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-4 w-4" />}
                  Buy Tokens
                </Button>
              </TabsContent>
              
              <TabsContent value="sell" className="space-y-3">
                <div>
                  <Label htmlFor="sell-tokens">Tokens to Sell</Label>
                  <Input
                    id="sell-tokens"
                    type="number"
                    step="0.01"
                    min="0"
                    max={userTokens}
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <Button onClick={handleSellTokens} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingDown className="mr-2 h-4 w-4" />}
                  Sell Tokens
                </Button>
              </TabsContent>
              
              <TabsContent value="claim">
                <Button onClick={handleClaim} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Coins className="mr-2 h-4 w-4" />}
                  Claim Tokens
                </Button>
              </TabsContent>
              
              <TabsContent value="withdraw">
                <Button onClick={handleWithdraw} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Withdraw Funds
                </Button>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  );
};