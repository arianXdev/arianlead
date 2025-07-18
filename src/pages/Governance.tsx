import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, TrendingUp, FileText, Vote, Plus } from 'lucide-react';

export default function Governance() {
  const mockProposals = [
    {
      id: 1,
      round: 42,
      type: 'Question',
      title: 'Should ArianLead expand to Polygon network?',
      description: 'Proposal to deploy ArianLead contracts on Polygon for lower transaction fees and faster confirmations.',
      status: 'active',
      timeLeft: '2 days 14 hours',
      price: 0.0125,
      volume: 1250,
      participants: 89,
      endDate: 'Jun 28, 2024'
    },
    {
      id: 2,
      round: 41,
      type: 'Decision',
      title: 'Implement quadratic voting mechanism',
      description: 'Replace current linear voting with quadratic voting to reduce whale influence.',
      status: 'pending',
      timeLeft: '6 hours',
      price: 0.0098,
      volume: 890,
      participants: 67,
      endDate: 'Jun 26, 2024'
    },
    {
      id: 3,
      round: 40,
      type: 'Question',
      title: 'Increase minimum proposal threshold',
      description: 'Raise the minimum token requirement for creating proposals from 100 to 500 tokens.',
      status: 'executed',
      timeLeft: 'Completed',
      price: 0.0156,
      volume: 2100,
      participants: 134,
      endDate: 'Jun 24, 2024'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary text-black';
      case 'pending': return 'bg-secondary text-black';
      case 'executed': return 'bg-accent text-black';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Question' ? FileText : Vote;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-primary font-bold text-gradient mb-4">
                Governance Dashboard
              </h1>
              <p className="text-xl text-muted-foreground font-oxanium">
                Participate in decentralized decision making through parallel markets
              </p>
            </div>
            <Button className="gradient-primary text-black font-oxanium font-medium hover-lift mt-4 lg:mt-0">
              <Plus className="mr-2 h-5 w-5" />
              Create Proposal
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground font-oxanium">Active Rounds</p>
                  <p className="text-2xl font-primary font-bold text-gradient">3</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground font-oxanium">Participants</p>
                  <p className="text-2xl font-primary font-bold text-gradient">290</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground font-oxanium">Total Volume</p>
                  <p className="text-2xl font-primary font-bold text-gradient">4.2k</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary-glow" />
                <div>
                  <p className="text-sm text-muted-foreground font-oxanium">Next Round</p>
                  <p className="text-2xl font-primary font-bold text-gradient">6h</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Current Active Proposal Highlight */}
          <Card className="bg-gradient-card border-gradient p-6 mb-8 cyber-glow border-primary/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getStatusColor('active')}>Round 42 • Active</Badge>
                    <Badge variant="outline" className="text-primary border-primary">Question</Badge>
                  </div>
                  <h2 className="text-xl font-primary font-bold text-gradient">
                    Should ArianLead expand to Polygon network?
                  </h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-oxanium">Current Price</p>
                <p className="text-2xl font-primary font-bold text-gradient">0.0125 ETH</p>
              </div>
            </div>

            <p className="text-foreground mb-6 font-oxanium">
              Proposal to deploy ArianLead contracts on Polygon for lower transaction fees and faster confirmations. This would enable broader participation in governance decisions.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-oxanium text-muted-foreground">Time Remaining</span>
                  <span className="text-sm font-oxanium font-medium">2 days 14 hours</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-oxanium text-muted-foreground">Participants</span>
                  <span className="text-sm font-oxanium font-medium">89 traders</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-oxanium text-muted-foreground">Volume</span>
                  <span className="text-sm font-oxanium font-medium">1,250 tokens</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="gradient-primary text-black font-oxanium font-medium hover-lift">
                Trade on This Proposal
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black font-oxanium">
                View Details
              </Button>
            </div>
          </Card>

          {/* All Proposals */}
          <div>
            <h2 className="text-2xl font-primary font-bold text-gradient mb-6">All Governance Rounds</h2>
            <div className="space-y-4">
              {mockProposals.map((proposal) => {
                const Icon = getTypeIcon(proposal.type);
                return (
                  <Card key={proposal.id} className="bg-gradient-card border-gradient p-6 hover-lift cursor-pointer transition-cyber">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-2 bg-muted/20 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(proposal.status)}>
                              Round {proposal.round} • {proposal.status}
                            </Badge>
                            <Badge variant="outline" className="text-muted-foreground">
                              {proposal.type}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-primary font-semibold text-gradient mb-2">
                            {proposal.title}
                          </h3>
                          <p className="text-muted-foreground font-oxanium text-sm mb-3">
                            {proposal.description}
                          </p>
                          <div className="flex items-center space-x-6 text-sm font-oxanium text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{proposal.timeLeft}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{proposal.participants} participants</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4" />
                              <span>{proposal.volume} volume</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-muted-foreground font-oxanium">Price</p>
                        <p className="text-xl font-primary font-bold text-gradient">
                          {proposal.price} ETH
                        </p>
                        <p className="text-xs text-muted-foreground font-oxanium">
                          {proposal.endDate}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}