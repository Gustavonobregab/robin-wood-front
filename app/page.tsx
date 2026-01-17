import { TopNavbar } from "@/components/TopNavbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { DemoSection } from "@/components/DemoSection";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-parchment text-ink selection:bg-robin-green selection:text-ink relative overflow-x-hidden">
      
      {/* Logo Flutuante */}
      <TopNavbar />
      
      {/* Background Pontilhado (CSS class do globals.css) */}
      <div className="fixed inset-0 bg-dots pointer-events-none z-0" />
      
      {/* Conteúdo da Página */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <Marquee />
        <DemoSection />
        <Features />
        <Pricing />
        <Footer />
      </div>
      
    </main>
  );
}