import Navbar from "@/components/nexora/Navbar";
import Hero from "@/components/nexora/Hero";
import TrustBar from "@/components/nexora/TrustBar";
import Services from "@/components/nexora/Services";
import Process from "@/components/nexora/Process";
import Industries from "@/components/nexora/Industries";
import Stats from "@/components/nexora/Stats";
import Contact from "@/components/nexora/Contact";
import FinalCTA from "@/components/nexora/FinalCTA";
import Footer from "@/components/nexora/Footer";

const Index = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <div className="container"><div className="section-divider" /></div>
        <Services />
        <div className="container"><div className="section-divider" /></div>
        <Process />
        <div className="container"><div className="section-divider" /></div>
        <Industries />
        <Stats />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
