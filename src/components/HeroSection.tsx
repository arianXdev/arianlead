import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 24, 30, 0.8), rgba(20, 24, 30, 0.9)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full glow-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full glow-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-accent rounded-full glow-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary-glow rounded-full glow-pulse animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-primary font-bold mb-6 leading-tight">
            <span className="text-gradient">The Decentralized</span><br />
            <span className="text-gradient">Autonomous</span><br />
            <span className="text-gradient">Corporation</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-oxanium">
            Based on
          </p>
          
          {/* Key features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-lg md:text-xl font-oxanium font-medium">
            <span className="text-primary glow-pulse">Bonding Curves</span>
            <span className="text-secondary glow-pulse">Market Prices</span>
            <span className="text-accent glow-pulse">Smart Contracts</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/white-paper">
              <Button className="gradient-primary text-black font-oxanium font-medium text-lg px-8 py-3 hover-lift">
                White Paper
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/governance">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-black transition-cyber font-oxanium font-medium text-lg px-8 py-3"
              >
                Launch dApp
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-gradient-card p-6 rounded-lg border-gradient hover-lift cyber-glow">
              <TrendingUp className="h-8 w-8 text-primary mb-3 mx-auto" />
              <h3 className="font-primary font-semibold text-gradient mb-2">Bonding Curves</h3>
              <p className="text-sm text-muted-foreground font-oxanium">
                Infinite liquidity through mathematical price discovery
              </p>
            </div>
            
            <div className="bg-gradient-card p-6 rounded-lg border-gradient hover-lift cyber-glow">
              <Zap className="h-8 w-8 text-secondary mb-3 mx-auto" />
              <h3 className="font-primary font-semibold text-gradient mb-2">Automated Governance</h3>
              <p className="text-sm text-muted-foreground font-oxanium">
                Market-driven decisions without human intermediaries
              </p>
            </div>
            
            <div className="bg-gradient-card p-6 rounded-lg border-gradient hover-lift cyber-glow">
              <Shield className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="font-primary font-semibold text-gradient mb-2">Trustless Execution</h3>
              <p className="text-sm text-muted-foreground font-oxanium">
                Smart contracts ensure transparent and fair outcomes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};