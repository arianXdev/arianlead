import { Header } from '@/components/Header';
import { ContractDashboard } from '@/components/ContractDashboard';
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

          {/* Live Contract Dashboard */}
          <ContractDashboard />
        </div>
      </main>
    </div>
  );
}