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
        <Link to="/" className="flex items-center space-x-3">
          <svg width="7%" height="7%" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3183_111840)"><path fill-rule="evenodd" clip-rule="evenodd" d="M142.327 39.1596L121.957 55.173C121.628 55.4319 121.876 55.9979 122.292 55.9479C125.447 55.5687 129.66 55.571 131.018 55.9549C131.335 56.0445 131.367 56.3696 131.215 56.662C110.621 96.2398 72.7277 126.277 0.221986 134.83C-0.127694 134.871 -0.0931709 135.383 0.258497 135.4C96.9408 140.218 132.631 77.7529 140.562 59.7059C140.684 59.4276 140.896 59.2139 141.2 59.2137C142.843 59.2128 146.177 61.6354 148.817 63.5532C149.033 63.7103 149.245 63.8641 149.45 64.0128C149.756 64.2336 150.161 63.9438 150.055 63.5824L142.955 39.3605C142.876 39.0902 142.548 38.9855 142.327 39.1596ZM120.014 101.502C118.786 102.597 117.995 104.132 117.995 105.776V144.287L117.995 146.867C117.995 148.456 119.284 149.745 120.873 149.745H139.047C140.637 149.745 141.926 148.456 141.926 146.867V81.6782C141.926 79.5523 138.723 78.6886 137.536 80.4526C132.486 87.9607 125.206 96.8681 120.014 101.502Z" fill="#07F2C8"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M80.6118 39.3664L69.4324 48.142C69.1028 48.4007 69.3553 48.9884 69.7728 48.9527C71.3475 48.818 73.1436 48.8269 73.9762 48.9795C74.3009 49.039 74.3559 49.3388 74.2026 49.6311C62.3861 72.1719 40.8971 89.3827 0.311425 94.7713C-0.17138 94.8354 -0.140508 95.5262 0.346335 95.5401C54.6049 97.0933 74.9781 61.9866 79.6932 51.3933C79.8168 51.1156 80.0401 50.8995 80.3403 50.9476C81.3504 51.1096 83.1452 52.4101 84.5887 53.4574C84.8935 53.6785 85.2978 53.3907 85.1917 53.0294L81.2396 39.5674C81.1602 39.2973 80.8333 39.1926 80.6118 39.3664ZM109.592 39.743L94.2731 51.7609C93.9434 52.0196 94.1936 52.5954 94.6104 52.5519C96.9058 52.3124 99.7551 52.3185 100.85 52.5702C101.172 52.6442 101.216 52.9579 101.063 53.2505C85.1926 83.6112 56.0503 106.666 0.418877 113.315C0.104166 113.352 0.135087 113.812 0.451687 113.827C74.5952 117.322 102.098 69.5854 108.292 55.5854C108.415 55.3075 108.632 55.0919 108.936 55.1147C110.238 55.2128 112.726 57.0171 114.708 58.4537L114.987 58.6556C115.292 58.8764 115.697 58.5877 115.591 58.2264L110.22 39.944C110.141 39.6739 109.814 39.5692 109.592 39.743ZM85.8515 128.572C85.8515 126.581 87.0643 124.803 88.8539 123.932C95.0742 120.902 101.789 116.301 105.902 113.306C107.473 112.163 109.782 113.297 109.782 115.24V146.582C109.782 148.341 108.356 149.766 106.598 149.766H89.0363C87.2774 149.766 85.8516 148.341 85.8515 146.582L85.8515 144.309V128.572ZM56.2029 136.958C54.7593 137.312 53.6318 138.574 53.6318 140.06V145.132V146.898C53.6318 148.487 54.9204 149.776 56.51 149.776H74.6843C76.2739 149.776 77.5625 148.487 77.5625 146.898V132.772C77.5625 131.143 75.9216 130.028 74.4057 130.625C69.3028 132.637 61.1479 135.746 56.2029 136.958Z" fill="#0F042C"></path></g></svg>
          <span className="mt-2 font-primary text-xl font-bold text-gradient">
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
            className="gradient-primary text-black font-primary font-medium font-bold hover-lift"
          >
            <Wallet className="mr-2 h-4 w-4 font-primary font-bold" />
            {isWalletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Your Wallet w/ LOVE 💙'}
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
