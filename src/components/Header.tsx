import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Wallet, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import arianleadLogo from '@/assets/arianlead-logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const connectWallet = async () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress('');
      toast({
        title: "Wallet Disconnected",
        description: "MetaMask wallet has been disconnected.",
      });
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      } catch (error: any) {
        console.error('Error connecting wallet:', error);
        toast({
          title: "Connection Failed",
          description: error.message || "Failed to connect to MetaMask.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask browser extension.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border cyber-glow">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover-lift">
          <img src={arianleadLogo} alt="ArianLead" className="h-8 w-auto" />
          <span className="font-primary text-xl font-bold text-gradient">
            ArianLead
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-cyber font-oxanium"
          >
            Home
          </Link>
          <Link 
            to="/governance" 
            className="text-foreground hover:text-primary transition-cyber font-oxanium"
          >
            Governance
          </Link>
          <Link 
            to="/bonding-curves" 
            className="text-foreground hover:text-primary transition-cyber font-oxanium"
          >
            Bonding Curves
          </Link>
          <Link 
            to="/white-paper" 
            className="text-foreground hover:text-primary transition-cyber font-oxanium"
          >
            White Paper
          </Link>
        </nav>

        {/* Wallet Connect & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={connectWallet}
            className="gradient-primary text-black font-oxanium font-medium hover-lift"
          >
            <Wallet className="mr-2 h-4 w-4 font-primary font-bold" />
            {isWalletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Your Wallet with LOVE 💙'}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-cyber"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-foreground hover:text-primary transition-cyber font-oxanium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/governance" 
              className="block text-foreground hover:text-primary transition-cyber font-oxanium"
              onClick={() => setIsMenuOpen(false)}
            >
              Governance
            </Link>
            <Link 
              to="/bonding-curves" 
              className="block text-foreground hover:text-primary transition-cyber font-oxanium"
              onClick={() => setIsMenuOpen(false)}
            >
              Bonding Curves
            </Link>
            <Link 
              to="/white-paper" 
              className="block text-foreground hover:text-primary transition-cyber font-oxanium"
              onClick={() => setIsMenuOpen(false)}
            >
              White Paper
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
