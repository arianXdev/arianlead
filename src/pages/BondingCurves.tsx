import { Header } from '@/components/Header';
import { BondingCurveChart } from '@/components/BondingCurveChart';

export default function BondingCurves() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-primary font-bold text-gradient mb-4">
              Bonding Curves
            </h1>
            <p className="text-xl text-muted-foreground font-oxanium max-w-3xl">
              Experience infinite liquidity through mathematical price discovery. Trade tokens instantly 
              with our automated bonding curve mechanism that eliminates the need for counterparties.
            </p>
          </div>

          <BondingCurveChart />
        </div>
      </main>
    </div>
  );
}