
import Header from "./Header";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import OurStory from "./OurStory";
import CTASection from "./CTASection";
import Footer from "./Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <OurStory />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
