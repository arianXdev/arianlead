import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ExternalLink, Code2, Brain, Rocket } from 'lucide-react';

export const AboutArian = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-primary font-bold text-gradient mb-4">
            Meet the Visionary
          </h2>
          <p className="text-xl text-muted-foreground font-oxanium max-w-2xl mx-auto">
            Learn about Arian Hosseini, the blockchain developer and computer science enthusiast behind ArianLead
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Profile Content */}
          <Card className="bg-gradient-card border-gradient p-8 cyber-glow">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-primary font-bold text-gradient mb-2">
                  Arian Hosseini
                </h3>
                <p className="text-lg text-secondary font-oxanium font-medium">
                  Software Developer | Blockchain Developer | Computer Science Enthusiast
                </p>
                <p className="text-muted-foreground font-oxanium">
                  Iran | 500+ Connections
                </p>
              </div>

              <p className="text-foreground leading-7 font-oxanium">
                As a forward-thinking Blockchain Developer, Arian is driven by a relentless passion for innovation 
                and a commitment to ongoing self-improvement. With a keen eye for emerging technologies, he thrives 
                on pushing boundaries and exploring new horizons within the realm of software development.
              </p>

              <p className="text-foreground leading-7 font-oxanium">
                His dedication extends beyond conventional projects as he actively seeks opportunities to 
                contribute to cutting-edge initiatives that have the potential to reshape industries and 
                improve lives. Through ArianLead, he's revolutionizing corporate governance using decentralized 
                autonomous markets and smart contract automation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="font-oxanium hover-lift"
                >
                  <a
                    href="https://github.com/arianXdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Profile
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="font-oxanium hover-lift"
                >
                  <a
                    href="https://ir.linkedin.com/in/arianh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Skills & Expertise */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-gradient p-6 cyber-glow">
              <div className="flex items-center space-x-3 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-primary font-semibold text-gradient">
                  Technical Expertise
                </h4>
              </div>
              <ul className="space-y-2 font-oxanium text-foreground">
                <li>• Blockchain Development (Ethereum, Solidity)</li>
                <li>• Smart Contract Architecture</li>
                <li>• DeFi Protocol Design</li>
                <li>• React & TypeScript Development</li>
                <li>• Decentralized Governance Systems</li>
              </ul>
            </Card>

            <Card className="bg-gradient-card border-gradient p-6 cyber-glow">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-secondary" />
                <h4 className="text-lg font-primary font-semibold text-gradient">
                  Research Focus
                </h4>
              </div>
              <ul className="space-y-2 font-oxanium text-foreground">
                <li>• Automated Corporate Governance</li>
                <li>• Bonding Curve Mechanisms</li>
                <li>• Parallel Market Systems</li>
                <li>• Decentralized Decision Making</li>
                <li>• Blockchain-based Voting Systems</li>
              </ul>
            </Card>

            <Card className="bg-gradient-card border-gradient p-6 cyber-glow">
              <div className="flex items-center space-x-3 mb-4">
                <Rocket className="h-6 w-6 text-accent" />
                <h4 className="text-lg font-primary font-semibold text-gradient">
                  Vision & Mission
                </h4>
              </div>
              <p className="font-oxanium text-foreground">
                To democratize corporate governance through innovative blockchain technologies, 
                eliminating traditional hierarchies and empowering stakeholders through 
                transparent, automated decision-making systems.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};