import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function WhitePaper() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-primary font-bold text-gradient mb-4">
              White Paper
            </h1>
            <p className="text-xl text-muted-foreground font-oxanium">
              Corporate Governance Free from Corporate Governors
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

              <section className="mb-8">
                <h3 className="text-xl font-primary font-semibold text-gradient mb-4">Abstract</h3>
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

              <section className="mb-8">
                <h3 className="text-xl font-primary font-semibold text-gradient mb-4">1. Introduction</h3>
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

              <section className="mb-8">
                <h3 className="text-xl font-primary font-semibold text-gradient mb-4">2. Bonding Curves Implementation</h3>
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

              <section className="mb-8">
                <h3 className="text-xl font-primary font-semibold text-gradient mb-4">3. Smart Contract Architecture</h3>
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

              <section>
                <h3 className="text-xl font-primary font-semibold text-gradient mb-4">4. Conclusion</h3>
                <p className="text-foreground leading-7 mb-4">
                  ArianLead represents a paradigm shift in corporate governance, moving from traditional voting-based systems to market-driven decision making. By leveraging bonding curves, parallel markets, and smart contract automation, we create a more efficient, transparent, and fair governance mechanism.
                </p>
                <p className="text-foreground leading-7">
                  The future of corporate governance lies not in the hands of boards and directors, but in the collective wisdom of market participants and the mathematical precision of smart contracts. ArianLead is building that future today.
                </p>
              </section>

            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}