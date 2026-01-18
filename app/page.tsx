import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { DemoSection } from "@/components/DemoSection";
import { ExperimentalLab } from "@/components/ExperimentalLab";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { TopNavbar } from "@/components/TopNavbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-parchment text-ink selection:bg-robin-green selection:text-ink relative overflow-x-hidden">
      <div className="fixed inset-0 bg-dots pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col">
        <TopNavbar />
        
        <div className="flex flex-col min-h-screen md:h-screen pt-20">
            
            <Hero />
            
            <div className="w-full max-w-[100vw] overflow-hidden shrink-0">
                <Marquee />
            </div>
            
        </div>

        <DemoSection />
        <ExperimentalLab />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}