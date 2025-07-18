import { HeroSection } from '@/components/HeroSection';
import { AboutArian } from '@/components/AboutArian';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Users, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      
      {/* Why ArianLead Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-primary font-bold text-gradient mb-4">
              Why ArianLead?
            </h2>
            <p className="text-xl text-muted-foreground font-oxanium max-w-3xl mx-auto">
              Revolutionizing corporate governance through decentralized autonomous corporations 
              powered by smart contracts and market-driven decision making.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-primary font-bold text-gradient mb-6">
                ArianLead vs. Traditional Corporations
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-primary font-semibold text-gradient mb-2">
                      Bonding Curves instead of Counter-offers
                    </h4>
                    <p className="text-muted-foreground font-oxanium">
                      Infinite liquidity through primary markets and mathematical price discovery, 
                      eliminating the need for counter-offers and providing instant execution.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-primary font-semibold text-gradient mb-2">
                      Automated Decision Making
                    </h4>
                    <p className="text-muted-foreground font-oxanium">
                      Market-driven governance that eliminates human bias and agency problems 
                      through algorithmic decision execution.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-primary font-semibold text-gradient mb-2">
                      Trustless & Transparent
                    </h4>
                    <p className="text-muted-foreground font-oxanium">
                      Smart contracts ensure all decisions are executed transparently 
                      without the need for boards of directors or intermediaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-card border-gradient p-8 cyber-glow">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-primary font-bold text-gradient mb-2">
                    Current Governance Round
                  </h4>
                  <p className="text-muted-foreground font-oxanium">
                    What is the most important issue to address?
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="font-oxanium">Round 42</span>
                    <span className="text-primary font-medium">Question</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="font-oxanium">Total Outstanding Tokens</span>
                    <span className="text-gradient font-medium">1,000,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="font-oxanium">Token Price</span>
                    <span className="text-gradient font-medium">0.0001 ETH</span>
                  </div>
                </div>
                
                <Link to="/governance">
                  <Button className="w-full gradient-primary text-black font-oxanium font-medium hover-lift">
                    Participate Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-primary font-bold text-gradient mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-muted-foreground font-oxanium max-w-3xl mx-auto">
              Built on Ethereum with cutting-edge smart contracts and decentralized infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-gradient p-8 text-center hover-lift cyber-glow">
              <div className="p-4 bg-primary/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-primary font-bold text-gradient mb-4">
                Bonding Curves
              </h3>
              <p className="text-muted-foreground font-oxanium mb-6">
                Mathematical price discovery that provides infinite liquidity and eliminates 
                the need for order books or market makers.
              </p>
              <Link to="/bonding-curves">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black font-oxanium">
                  Learn More
                </Button>
              </Link>
            </Card>

            <Card className="bg-gradient-card border-gradient p-8 text-center hover-lift cyber-glow">
              <div className="p-4 bg-secondary/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-primary font-bold text-gradient mb-4">
                Parallel Markets
              </h3>
              <p className="text-muted-foreground font-oxanium mb-6">
                Market-driven governance where decisions are made through price discovery 
                rather than traditional voting mechanisms.
              </p>
              <Link to="/governance">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-black font-oxanium">
                  Participate
                </Button>
              </Link>
            </Card>

            <Card className="bg-gradient-card border-gradient p-8 text-center hover-lift cyber-glow">
              <div className="p-4 bg-accent/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-primary font-bold text-gradient mb-4">
                Smart Contracts
              </h3>
              <p className="text-muted-foreground font-oxanium mb-6">
                Ethereum-based smart contracts ensure transparent, immutable, and 
                automated execution of all governance decisions.
              </p>
              <Link to="/white-paper">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black font-oxanium">
                  Read More
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-primary font-bold text-gradient mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-muted-foreground font-oxanium mb-8 max-w-2xl mx-auto">
            Join the decentralized autonomous corporation revolution and participate 
            in truly democratic, market-driven governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/governance">
              <Button className="gradient-primary text-black font-oxanium font-medium text-lg px-8 py-3 hover-lift">
                Launch dApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/white-paper">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-black transition-cyber font-oxanium font-medium text-lg px-8 py-3"
              >
                Read White Paper
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AboutArian />
      <Footer />
    </div>
  );
};

export default Index;
