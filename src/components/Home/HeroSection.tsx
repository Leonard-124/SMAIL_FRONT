

//import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
//import heroFarm from "@/assets/hero-farm.jpg";
//import almoLogo from "@/assets/almo-logo.jpg";
import rice_field from "../../assets/images/rice_field.jpeg"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={rice_field}
          alt="Kenyan farm fields at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-width section-padding text-center pt-32">
        {/* Logo Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="bg-background/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-left">
                <h2 className="font-serif font-bold text-lg text-foreground">Almo Farm</h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Produce Suppliers</p>
                <p className="text-xs text-primary italic">From our Farms, to your Family</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-2 animate-slide-up">
          Fresh From Our Farms,
        </h1>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          To Your Family
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Kenya's trusted farm produce supplier bringing the freshest vegetables, 
          fruits, and organic produce directly from our fields to your doorstep.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <button  className="group">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            Order Fresh Produce
          </button>
          <button>
            Explore Our Farms
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
