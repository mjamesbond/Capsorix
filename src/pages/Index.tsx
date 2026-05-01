import Navbar from "@/components/nexora/Navbar";
import Hero from "@/components/nexora/Hero";
import TrustBar from "@/components/nexora/TrustBar";
import About from "@/components/nexora/About";
import Services from "@/components/nexora/Services";
import Process from "@/components/nexora/Process";
import Industries from "@/components/nexora/Industries";
import CaseStudies from "@/components/nexora/CaseStudies";
import Stats from "@/components/nexora/Stats";
import Testimonials from "@/components/nexora/Testimonials";
import Faq from "@/components/nexora/Faq";
import Contact from "@/components/nexora/Contact";
import FinalCTA from "@/components/nexora/FinalCTA";
import Footer from "@/components/nexora/Footer";

const Index = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden page-enter">
      <Navbar />
      <main>
        <Hero />
        <div className="section-fade"><TrustBar /></div>
        <div className="container"><div className="section-divider" /></div>
        <div className="section-fade"><About /></div>
        <div className="container"><div className="section-divider" /></div>
        <Services />
        <div className="container"><div className="section-divider" /></div>
        <div className="section-fade"><Process /></div>
        <div className="container"><div className="section-divider" /></div>
        <div className="section-fade"><Industries /></div>
        <div className="container"><div className="section-divider" /></div>
        <div className="section-fade"><CaseStudies /></div>
        <div className="section-fade"><Stats /></div>
        <div className="container"><div className="section-divider" /></div>
        <div className="section-fade"><Testimonials /></div>
        <div className="container"><div className="section-divider" /></div>
        <div className="section-fade"><Faq /></div>
        <div className="section-fade"><Contact /></div>
        <div className="section-fade"><FinalCTA /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
