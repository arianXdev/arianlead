import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Plus, Minus, TrendingUp, DollarSign, Coins } from 'lucide-react';

export const BondingCurveChart = () => {
  const [tokenAmount, setTokenAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  // Mock data for demonstration
  const currentPrice = 0.0001;
  const totalSupply = 1000000;
  const totalFund = 100;
  const userTokens = 500;

  const calculatePrice = (supply: number) => {
    // Simple bonding curve: price = 0.0001 * (supply / 1000)^2
    return 0.0001 * Math.pow(supply / 1000, 2);
  };

  const generateCurveData = () => {
    const data = [];
    // Generate more comprehensive test data with realistic price progression
    for (let i = 0; i <= 500; i += 25) {
      const supply = i * 1000;
      const price = calculatePrice(supply);
      data.push({ supply, price });
    }
    return data;
  };

  // Generate random test transaction data
  const generateTestTransactions = () => {
    const types = ['Buy', 'Sell'];
    const times = ['2 min ago', '5 min ago', '10 min ago', '15 min ago', '23 min ago', '35 min ago', '1 hr ago', '2 hr ago'];
    const transactions = [];
    
    for (let i = 0; i < 8; i++) {
      const isBuy = Math.random() > 0.5;
      const tokens = Math.floor(Math.random() * 500) + 10;
      const price = 0.0001 + (Math.random() * 0.0003);
      const ethAmount = (tokens * price).toFixed(4);
      
      transactions.push({
        time: times[i],
        type: isBuy ? 'Buy' : 'Sell',
        tokens: isBuy ? `+${tokens}` : `-${tokens}`,
        ethAmount,
        price: price.toFixed(6),
        isBuy
      });
    }
    return transactions;
  };

  const testTransactions = generateTestTransactions();

  const curveData = generateCurveData();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground font-oxanium">Total Supply</p>
              <p className="text-lg font-primary font-bold text-gradient">{totalSupply.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-secondary" />
            <div>
              <p className="text-sm text-muted-foreground font-oxanium">Current Price</p>
              <p className="text-lg font-primary font-bold text-gradient">{currentPrice} ETH</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground font-oxanium">Total Fund</p>
              <p className="text-lg font-primary font-bold text-gradient">{totalFund} ETH</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-primary-glow" />
            <div>
              <p className="text-sm text-muted-foreground font-oxanium">Your Tokens</p>
              <p className="text-lg font-primary font-bold text-gradient">{userTokens}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bonding Curve Visualization */}
        <Card className="bg-gradient-card border-gradient p-6 cyber-glow">
          <h3 className="text-xl font-primary font-bold text-gradient mb-4">Bonding Curve</h3>
          
          {/* SVG Chart */}
          <div className="h-64 w-full bg-muted/20 rounded-lg p-4 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Bonding curve */}
              <path
                d={`M 20 180 ${curveData.map((point, i) => {
                  const x = 20 + (i * 18);
                  const y = 180 - (point.price * 1000000);
                  return `L ${x} ${y}`;
                }).join(' ')}`}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              
              {/* Gradient definition for curve */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
              
              {/* Current position indicator */}
              <circle 
                cx={20 + (totalSupply / 1000 * 18 / 10)} 
                cy={180 - (currentPrice * 1000000)} 
                r="4" 
                fill="hsl(var(--accent))" 
                className="drop-shadow-lg"
              />
            </svg>
            
            <div className="absolute bottom-2 left-4 text-xs text-muted-foreground font-oxanium">
              Supply
            </div>
            <div className="absolute top-2 left-2 text-xs text-muted-foreground font-oxanium transform -rotate-90">
              Price
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
            <p className="text-sm font-oxanium text-muted-foreground">
              <span className="font-primary font-medium text-gradient">Price Function:</span> Price = 0.0001 × (Supply / 1000)²
            </p>
          </div>
        </Card>

        {/* Trading Interface */}
        <Card className="bg-gradient-card border-gradient p-6 cyber-glow">
          <h3 className="text-xl font-primary font-bold text-gradient mb-4">Trade Tokens</h3>
          
          {/* Buy/Sell Tabs */}
          <div className="flex mb-6 bg-muted/20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 py-2 px-4 rounded-md font-oxanium font-medium transition-cyber ${
                activeTab === 'buy' 
                  ? 'bg-primary text-black' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`flex-1 py-2 px-4 rounded-md font-oxanium font-medium transition-cyber ${
                activeTab === 'sell' 
                  ? 'bg-secondary text-black' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sell
            </button>
          </div>

          <div className="space-y-4">
            {/* Token Amount Input */}
            <div>
              <label className="block text-sm font-oxanium text-muted-foreground mb-2">
                Number of Tokens <span className="text-xs text-muted-foreground/70">(ARIAN)</span>
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTokenAmount(String(Math.max(0, parseInt(tokenAmount) - 10)))}
                  className="p-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="0"
                  className="flex-1 text-center font-oxanium"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTokenAmount(String(parseInt(tokenAmount || '0') + 10))}
                  className="p-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setTokenAmount(activeTab === 'sell' ? String(userTokens) : '100')}
                  className="font-oxanium"
                >
                  Max
                </Button>
              </div>
            </div>

            {/* ETH Amount Input */}
            <div>
              <label className="block text-sm font-oxanium text-muted-foreground mb-2">
                ETH Amount <span className="text-xs text-muted-foreground/70">(WEI: {ethAmount ? (parseFloat(ethAmount) * 1e18).toLocaleString() : '0'})</span>
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEthAmount(String(Math.max(0, parseFloat(ethAmount) - 0.1).toFixed(4)))}
                  className="p-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  placeholder="0.0000"
                  step="0.0001"
                  className="flex-1 text-center font-oxanium"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEthAmount(String((parseFloat(ethAmount || '0') + 0.1).toFixed(4)))}
                  className="p-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Average Price Display */}
            <div className="p-3 bg-muted/20 rounded-lg">
              <p className="text-sm font-oxanium text-muted-foreground">
                Average Token Price: <span className="text-gradient font-medium">0.0001 ETH</span>
              </p>
            </div>

            {/* Trade Button */}
            <Button 
              className={`w-full font-oxanium font-medium text-lg py-3 hover-lift ${
                activeTab === 'buy' ? 'gradient-primary text-black' : 'bg-secondary hover:bg-secondary/80 text-black'
              }`}
            >
              {activeTab === 'buy' ? 'Buy Tokens' : 'Sell Tokens'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-gradient-card border-gradient p-6 cyber-glow">
        <h3 className="text-xl font-primary font-bold text-gradient mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-oxanium">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground">Time</th>
                <th className="text-left py-3 text-muted-foreground">Type</th>
                <th className="text-left py-3 text-muted-foreground">Tokens</th>
                <th className="text-left py-3 text-muted-foreground">ETH</th>
                <th className="text-left py-3 text-muted-foreground">Price</th>
              </tr>
            </thead>
            <tbody>
              {testTransactions.map((tx, index) => (
                <tr key={index} className={index < testTransactions.length - 1 ? "border-b border-border/50" : ""}>
                  <td className="py-3 text-muted-foreground">{tx.time}</td>
                  <td className="py-3">
                    <span className={`font-medium ${tx.isBuy ? 'text-primary' : 'text-secondary'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3">{tx.tokens}</td>
                  <td className="py-3">{tx.ethAmount} ETH</td>
                  <td className="py-3">{tx.price} ETH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};