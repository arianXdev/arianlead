import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import arianleadLogo from '@/assets/arianlead-logo.png';

export const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-gradient cyber-glow">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={arianleadLogo} alt="ArianLead" className="h-8 w-auto" />
              <span className="font-primary text-xl font-bold text-gradient">
                ArianLead
              </span>
            </div>
            <p className="text-muted-foreground font-oxanium mb-4 max-w-md">
              Revolutionizing corporate governance through decentralized autonomous markets and smart contract automation. The future of organizational decision-making is here.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/arianXdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-cyber"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/arianlead"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-cyber"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/arianlead"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-cyber"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@arianlead.org"
                className="text-muted-foreground hover:text-primary transition-cyber"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-primary font-semibold text-gradient mb-4">Platform</h4>
            <ul className="space-y-2 font-oxanium">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-cyber">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/governance" className="text-muted-foreground hover:text-primary transition-cyber">
                  Governance
                </Link>
              </li>
              <li>
                <Link to="/bonding-curves" className="text-muted-foreground hover:text-primary transition-cyber">
                  Bonding Curves
                </Link>
              </li>
              <li>
                <Link to="/white-paper" className="text-muted-foreground hover:text-primary transition-cyber">
                  White Paper
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-primary font-semibold text-gradient mb-4">Resources</h4>
            <ul className="space-y-2 font-oxanium">
              <li>
                <a
                  href="https://docs.arianlead.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-cyber flex items-center"
                >
                  Documentation <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arianlead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-cyber flex items-center"
                >
                  GitHub <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://blog.arianlead.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-cyber flex items-center"
                >
                  Blog <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/arianlead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-cyber flex items-center"
                >
                  Community <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Our Ecosystem */}
          <div>
            <h4 className="font-primary font-semibold text-gradient mb-4">Our Ecosystem</h4>
            <ul className="space-y-2 font-oxanium">
              <li>
                <a
                  href="https://blockcenter.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-cyber flex items-center"
                >
                  Blockcenter <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Blockchain Development House
                </p>
              </li>
              <li>
                <a
                  href="https://paperscore.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-cyber flex items-center"
                >
                  PaperScore <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Decentralized Academic Journal
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground font-oxanium text-sm">
            © 2024 ArianLead - A Blockcenter Product. All rights reserved. Powered by blockchain technology.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-cyber text-sm font-oxanium"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-cyber text-sm font-oxanium"
            >
              Terms of Service
            </a>
            <a
              href="/security"
              className="text-muted-foreground hover:text-primary transition-cyber text-sm font-oxanium"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
