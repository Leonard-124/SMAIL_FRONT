// import Footer from "../Main/Footer"
// import Info from "../Main/Info"
// import Info2 from "../Main/Info2"
// import Newsletter from "../Main/Newsletter"
// import Navbar from "./Navbar"

// const Home = () => {
//   return (
//     < >
//     <Navbar />
//     <Info />
//     <Info2 />
//     <Newsletter />
//     <Footer />
//     </>
//   )
// }

// export default Home



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
