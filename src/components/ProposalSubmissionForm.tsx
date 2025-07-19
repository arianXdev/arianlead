import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  contractService, 
  ProposalType, 
  getProposalTypeName,
  createProposalHash 
} from '@/lib/contracts';

interface ProposalSubmissionFormProps {
  onSubmit: () => void;
  currentRound: number;
}

export const ProposalSubmissionForm: React.FC<ProposalSubmissionFormProps> = ({
  onSubmit,
  currentRound
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: ProposalType.BASIC,
    vendor: '',
    investment: '0'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const isDecisionRound = currentRound % 2 === 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    if (formData.title.length > 32) {
      toast({
        title: "Validation Error", 
        description: "Title must be 32 characters or less",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // For question rounds, set vendor to zero address and investment to 0
      const vendor = isDecisionRound ? formData.vendor : '0x0000000000000000000000000000000000000000';
      const investment = isDecisionRound ? formData.investment : '0';

      // Create proposal hash
      const hash = createProposalHash(formData.description, vendor, investment);

      // Submit proposal
      const childAddress = await contractService.submitProposal(
        formData.type,
        formData.title,
        hash
      );

      toast({
        title: "Proposal Submitted",
        description: `Proposal created at ${childAddress.slice(0, 6)}...${childAddress.slice(-4)}`,
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        type: ProposalType.BASIC,
        vendor: '',
        investment: '0'
      });

      onSubmit();
    } catch (error: any) {
      console.error('Error submitting proposal:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit proposal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Proposal</CardTitle>
        <CardDescription>
          {isDecisionRound 
            ? "Decision Round: Include vendor and investment details"
            : "Question Round: Focus on the proposal concept"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title (max 32 characters)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief proposal title..."
              maxLength={32}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/32 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Proposal Type</Label>
            <Select
              value={formData.type.toString()}
              onValueChange={(value) => setFormData({ ...formData, type: parseInt(value) as ProposalType })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProposalType)
                  .filter(value => typeof value === 'number')
                  .map((type) => (
                    <SelectItem key={type} value={type.toString()}>
                      {getProposalTypeName(type as ProposalType)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed proposal description..."
              rows={4}
              required
            />
          </div>

          {isDecisionRound && (
            <>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor Address</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="0x..."
                  pattern="^0x[a-fA-F0-9]{40}$"
                />
                <p className="text-xs text-muted-foreground">
                  Ethereum address for the vendor/recipient
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment">Investment Amount (ETH)</Label>
                <Input
                  id="investment"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.investment}
                  onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground">
                  Amount in ETH for this proposal
                </p>
              </div>
            </>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Proposal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};