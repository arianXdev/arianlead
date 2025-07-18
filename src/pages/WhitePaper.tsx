import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Coins, Shield, Code, Users, TrendingUp, Zap } from 'lucide-react';

export default function WhitePaper() {
  const [activeSection, setActiveSection] = useState('abstract');

  const sections = [
    { id: 'abstract', title: 'Abstract', icon: BookOpen },
    { id: 'introduction', title: 'Introduction', icon: Users },
    { id: 'bonding-curves', title: 'Bonding Curves', icon: TrendingUp },
    { id: 'smart-contracts', title: 'Smart Contracts', icon: Code },
    { id: 'governance', title: 'Governance Model', icon: Shield },
    { id: 'tokenomics', title: 'Tokenomics', icon: Coins },
    { id: 'security', title: 'Security & Audits', icon: Shield },
    { id: 'roadmap', title: 'Roadmap', icon: Zap },
    { id: 'conclusion', title: 'Conclusion', icon: BookOpen },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <Card className="bg-gradient-card border-gradient p-4 cyber-glow">
                  <h3 className="font-primary font-semibold text-gradient mb-4">Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <Button
                          key={section.id}
                          variant={activeSection === section.id ? "default" : "ghost"}
                          className={`w-full justify-start font-oxanium text-sm ${
                            activeSection === section.id 
                              ? 'bg-primary text-black' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          onClick={() => scrollToSection(section.id)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {section.title}
                          <ChevronRight className="ml-auto h-3 w-3" />
                        </Button>
                      );
                    })}
                  </nav>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-primary font-bold text-gradient mb-4">
                  ArianLead White Paper
                </h1>
                <p className="text-xl text-muted-foreground font-oxanium">
                  Corporate Governance Free from Corporate Governors
                </p>
                <p className="text-sm text-muted-foreground font-oxanium mt-2">
                  Version 2.0 | December 2024 | 15 minute read
                </p>
              </div>

              <Card className="bg-gradient-card border-gradient p-8 md:p-12 cyber-glow">
                <div className="prose prose-invert max-w-none font-oxanium">
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-primary font-bold text-gradient mb-2">
                  Corporate Governance Free from Corporate Governors
                </h2>
                <p className="text-muted-foreground">
                  Dr. Arian Nexus, PhD | <a href="mailto:research@arianlead.org" className="text-primary hover:text-primary-glow">research@arianlead.org</a>
                </p>
              </div>

              <Separator className="mb-8" />

              <section id="abstract" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">Abstract</h3>
                <p className="text-foreground leading-7 mb-4">
                  Most corporations are governed through voting and election of agents like the Board of Directors. However, such mechanisms are prone to agency problems such as moral hazard and free-riding. This paper introduces Parallel Markets as an alternative governance mechanism that does not require voting or Board of Directors. Rather, it derives the optimal decisions from market equilibrium prices.
                </p>
                <p className="text-foreground leading-7 mb-4">
                  For any decision, first, the current shareholders generate the set of decision choices (decision initiatives). Then the mechanism replicates the shares of the company for each choice. These shares are conditional on whether the choice is selected. Speculators can buy and sell these conditional shares, resulting in an equilibrium price for the conditional shares under each choice. Then the choice with the highest price is selected and ratified as the effective decision. The other choices and their conditional shares are voided, and their transactions refunded. Therefore, the mechanism autonomously selects and ratifies the choice that maximizes the market capitalization of the company.
                </p>
                <p className="text-foreground leading-7">
                  As a proof of concept, this mechanism is implemented in a web application and its functionality is demonstrated via online experimentation. The results are close to optimal despite the small group size, thin markets, small incentives, and short periods to reach equilibrium.
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Keywords:</strong> Prediction Markets, Corporate Governance, Financial Technology, Blockchain, Smart Contracts, Decentralized Autonomous Organizations, Decentralized Autonomous Corporations.
                  </p>
                </div>
              </section>

              <Separator className="mb-8" />

              <section id="introduction" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">1. Introduction</h3>
                <p className="text-foreground leading-7 mb-4">
                  The corporation can be an efficient way of organizing business enterprises by serving as a nexus of contracts that simplifies the contracting problem. Each stakeholder can contract directly with the corporation, rather than with each of the other stakeholders. Corporations allow for the separation of ownership (residual risk-bearing) and control (decision-making) so that investors and managers can specialize. Moreover, residual claimants can reach the unity of decision by delegating the decision-making authority to one decision-maker (or a few).
                </p>

                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">1.1 Motivation</h4>
                <p className="text-foreground leading-7 mb-4">
                  While the delegation of the decision-making authority has benefits, it is also costly. Central authorities are susceptible to the moral hazard problem and the single point of failure (SPOF). They do not necessarily have the same objectives as the investors or owners do. When the decision-makers are not the owners or residual claimants and are not considerably affected by their decisions, they may deviate from the interests of the owners due to agency conflicts, that are costly to control.
                </p>
                <p className="text-foreground leading-7 mb-4">
                  The costs arising from differences in shareholder incentives and between shareholders' and directors' incentives could be reduced if we could directly implement shareholders' preferences without the Board of Directors. One might suggest letting the owners and shareholders make decisions directly through voting where the voting power is proportional to the number of shares. However, this poses a number of problems.
                </p>

                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">1.2 Solution</h4>
                <p className="text-foreground leading-7 mb-4">
                  Information technologies have made new forms of governance possible as they have opened new ways for "idea generation" (suggestion) and "idea selection". Given the limitations of the existing governance methods, this study introduces the Automated Governance methods which enable participants (e.g. shareholders) to propose (suggest) the initiative decisions or choices (initiation). Then the best decision choice is selected and ratified based on market equilibrium prices (Parallel Markets).
                </p>
                <p className="text-foreground leading-7">
                  Essentially, the automated governance methods crowdsource the governance of an organization. The crowdsourcing paradigm not only challenges the traditional hierarchical structures for decision making, but also blurs the organizational "boundaries" that separate the contributors "inside" an organization from the "outsiders".
                </p>

                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">1.3 Parallel Markets</h4>
                <p className="text-foreground leading-7 mb-4">
                  The Parallel Markets mechanism uses stock price as a criterion to estimate the expected value of the company under each choice, and autonomously selects the choice that results in the highest market capitalization. This mechanism replaces votes with transactions. Price is a collective decision that is resistant to attacks, free riding, tyranny of the majority, and many manipulations possible under voting.
                </p>
                <p className="text-foreground leading-7">
                  Price is the most efficient aggregation of dispersed information and is a sufficient statistic that summarizes individual valuations into a collective valuation. Such a collective valuation can yield a group utility function that unshackles us from the impossibility theorems.
                </p>
              </section>

              <Separator className="mb-8" />

              <section id="bonding-curves" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">2. Bonding Curves Implementation</h3>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead implements bonding curves as a revolutionary approach to price discovery and liquidity provision. Unlike traditional secondary markets that rely on counter-offers, our bonding curve mechanism provides infinite liquidity by automatically calculating prices based on mathematical formulas.
                </p>
                <p className="text-foreground leading-7 mb-4">
                  The bonding curve formula determines token prices based on current supply, ensuring that early adopters receive tokens at lower prices while later participants pay premium rates. This creates natural incentives for early governance participation and ensures fair price discovery without the need for external oracles.
                </p>
                <div className="bg-card p-6 rounded-lg border border-border my-6">
                  <h5 className="font-primary font-medium text-gradient mb-3">Price Function</h5>
                  <code className="text-primary font-mono">Price = (a × Supply²) + (b × Supply) + c</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Where: a, b, c are configurable parameters that define the curve steepness and initial price
                  </p>
                </div>
              </section>

              <Separator className="mb-8" />

              <section id="smart-contracts" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">3. Smart Contract Architecture</h3>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead's governance mechanism is built on Ethereum smart contracts that ensure transparency, immutability, and decentralized execution. The system consists of three main contract types:
                </p>
                <ul className="list-disc list-inside text-foreground space-y-2 mb-4">
                  <li>Governance Contract: Manages proposal creation, voting periods, and decision execution</li>
                  <li>Bonding Curve Contract: Handles token minting, burning, and price calculations</li>
                  <li>Treasury Contract: Manages funds collected from token purchases and proposal outcomes</li>
                </ul>
                <p className="text-foreground leading-7">
                  This architecture ensures that all governance decisions are executed automatically based on market outcomes, eliminating the need for human intermediaries and reducing the potential for corruption or manipulation.
                </p>
              </section>

              <Separator className="mb-8" />

              <section id="governance" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">4. Governance Model</h3>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead's governance model represents a paradigm shift from traditional corporate structures. Rather than relying on boards of directors or centralized decision-making, our system leverages market mechanisms to achieve optimal outcomes for all stakeholders.
                </p>
                
                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">4.1 Proposal Mechanism</h4>
                <p className="text-foreground leading-7 mb-4">
                  Any token holder can submit governance proposals to the ArianLead ecosystem. Proposals undergo a structured lifecycle:
                </p>
                <ul className="list-disc list-inside text-foreground space-y-2 mb-4">
                  <li><strong>Ideation Phase:</strong> Initial proposal submission with basic parameters</li>
                  <li><strong>Discussion Period:</strong> Community review and feedback (7 days)</li>
                  <li><strong>Parallel Market Creation:</strong> Conditional tokens are minted for each proposal option</li>
                  <li><strong>Market Trading:</strong> Stakeholders trade conditional tokens based on their preferences</li>
                  <li><strong>Resolution:</strong> The proposal with highest market valuation is automatically executed</li>
                </ul>

                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">4.2 Voting Power Distribution</h4>
                <p className="text-foreground leading-7 mb-4">
                  Unlike traditional one-person-one-vote systems, ArianLead's voting power is proportional to economic stake and risk exposure. This ensures that those most affected by decisions have the greatest influence over outcomes.
                </p>

                <div className="bg-card p-6 rounded-lg border border-border my-6">
                  <h5 className="font-primary font-medium text-gradient mb-3">Voting Weight Formula</h5>
                  <code className="text-primary font-mono">Voting Power = (Token Holdings × Time Locked) + (Market Position × Risk Factor)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    This formula ensures long-term stakeholders and active market participants have appropriate influence
                  </p>
                </div>
              </section>

              <section id="tokenomics" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">5. Tokenomics</h3>
                
                <h4 className="text-lg font-primary font-medium text-gradient mb-3">5.1 Token Distribution</h4>
                <p className="text-foreground leading-7 mb-4">
                  The ARIAN token serves as the native currency of the ArianLead ecosystem. Total supply is dynamically managed through the bonding curve mechanism, ensuring sustainable growth and fair price discovery.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h5 className="font-primary font-medium text-gradient mb-2">Initial Distribution</h5>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Public Bonding Curve: 70%</li>
                      <li>• Development Fund: 15%</li>
                      <li>• Community Rewards: 10%</li>
                      <li>• Team & Advisors: 5%</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h5 className="font-primary font-medium text-gradient mb-2">Utility Functions</h5>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Governance Voting Rights</li>
                      <li>• Protocol Fee Payments</li>
                      <li>• Staking Rewards</li>
                      <li>• Market Making Incentives</li>
                    </ul>
                  </div>
                </div>

                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">5.2 Economic Model</h4>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead employs a deflationary economic model where protocol fees are used to buy back and burn tokens, creating long-term value for holders. This mechanism aligns incentives between users and token holders.
                </p>
              </section>

              <section id="security" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">6. Security & Audits</h3>
                
                <h4 className="text-lg font-primary font-medium text-gradient mb-3">6.1 Smart Contract Security</h4>
                <p className="text-foreground leading-7 mb-4">
                  Security is paramount in the ArianLead ecosystem. All smart contracts undergo rigorous testing and formal verification before deployment to mainnet.
                </p>

                <div className="bg-card p-6 rounded-lg border border-border my-6">
                  <h5 className="font-primary font-medium text-gradient mb-3">Security Measures</h5>
                  <ul className="text-foreground space-y-2">
                    <li>• Multi-signature wallet controls for critical functions</li>
                    <li>• Time-locked upgrades with community review periods</li>
                    <li>• Circuit breakers for emergency situations</li>
                    <li>• Regular third-party security audits</li>
                    <li>• Bug bounty program for continuous improvement</li>
                  </ul>
                </div>

                <h4 className="text-lg font-primary font-medium text-gradient mb-3 mt-6">6.2 Audit History</h4>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead has been audited by leading blockchain security firms to ensure the highest standards of safety and reliability.
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="font-oxanium">CertiK Audit</span>
                    <span className="text-primary">Completed - No Critical Issues</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="font-oxanium">OpenZeppelin Review</span>
                    <span className="text-primary">Completed - All Issues Resolved</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="font-oxanium">ConsenSys Diligence</span>
                    <span className="text-secondary">In Progress</span>
                  </div>
                </div>
              </section>

              <section id="roadmap" className="mb-12">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">7. Roadmap</h3>
                
                <div className="space-y-8">
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <h4 className="text-lg font-primary font-medium text-gradient">Q1 2024 - Foundation (Completed)</h4>
                    </div>
                    <div className="ml-7 space-y-2 text-foreground">
                      <p>✓ Smart contract development and testing</p>
                      <p>✓ Initial bonding curve implementation</p>
                      <p>✓ Web application frontend development</p>
                      <p>✓ Security audits and bug fixes</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-secondary rounded-full mr-4"></div>
                      <h4 className="text-lg font-primary font-medium text-gradient">Q2 2024 - Beta Launch</h4>
                    </div>
                    <div className="ml-7 space-y-2 text-foreground">
                      <p>🔄 Testnet deployment and community testing</p>
                      <p>🔄 Governance mechanism integration</p>
                      <p>✓ Community building and partnerships</p>
                      <p>✓ Documentation and developer resources</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-accent rounded-full mr-4"></div>
                      <h4 className="text-lg font-primary font-medium text-gradient">Q3 2024 - Mainnet Launch</h4>
                    </div>
                    <div className="ml-7 space-y-2 text-foreground">
                      <p>⏳ Mainnet deployment</p>
                      <p>⏳ Token generation event</p>
                      <p>⏳ Initial governance proposals</p>
                      <p>⏳ Exchange listings and liquidity provision</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-muted rounded-full mr-4"></div>
                      <h4 className="text-lg font-primary font-medium text-gradient">Q4 2024 - Expansion</h4>
                    </div>
                    <div className="ml-7 space-y-2 text-foreground">
                      <p>⏳ Cross-chain integration</p>
                      <p>⏳ Enterprise partnerships</p>
                      <p>⏳ Advanced governance features</p>
                      <p>⏳ Mobile application development</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="conclusion">
                <h3 className="text-2xl font-primary font-semibold text-gradient mb-6">8. Conclusion</h3>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead represents a paradigm shift in corporate governance, moving from traditional voting-based systems to market-driven decision making. By leveraging bonding curves, parallel markets, and smart contract automation, we create a more efficient, transparent, and fair governance mechanism that eliminates the need for centralized authorities.
                </p>
                <p className="text-foreground leading-7 mb-4">
                  Our research demonstrates that market-based governance can outperform traditional voting systems in terms of efficiency, fairness, and resistance to manipulation. The combination of economic incentives and cryptographic security creates a robust foundation for the future of organizational decision-making.
                </p>
                <p className="text-foreground leading-7 mb-6">
                  The future of corporate governance lies not in the hands of boards and directors, but in the collective wisdom of market participants and the mathematical precision of smart contracts. ArianLead is building that future today, one governance decision at a time.
                </p>

                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-lg border border-gradient">
                  <h5 className="font-primary font-medium text-gradient mb-3">Join the Revolution</h5>
                  <p className="text-foreground mb-4">
                    ArianLead is more than a protocol—it's a movement towards truly decentralized, fair, and efficient organizational governance. Join us in reshaping the future of corporate decision-making.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="gradient-primary text-black font-oxanium">
                      Get Started
                    </Button>
                    <Button variant="outline" className="font-oxanium">
                      Read Documentation
                    </Button>
                  </div>
                </div>
              </section>

                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}