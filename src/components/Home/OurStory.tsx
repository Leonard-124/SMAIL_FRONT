

//import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
// import kenyanLandscape from "@/assets/kenyan-landscape.jpg";
// import farmProduce from "@/assets/farm-produce.jpg";
import rice from "../../assets/images/rice.jpeg"
import field from "../../assets/images/field.jpeg"

// const stats = [
//   { value: "10+", label: "Years of Excellence" },
//   { value: "5000+", label: "Happy Families" },
// ];

const OurStory = () => {
  return (
    <section id="about" className="bg-muted section-padding overflow-hidden">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Rooted in Kenyan Soil,{" "}
              <span className="text-secondary">Growing for Generations</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
              <p>
                For over a decade, Almo Farm has been cultivating the rich Kenyan soil 
                to bring you the finest produce. Our family-owned farms span across the 
                fertile highlands, where traditional farming wisdom meets modern sustainable 
                practices.
              </p>
              <p>
                Every tomato, every bunch of sukuma wiki, every fresh fruit that leaves 
                our farm carries our promise of quality and care — from our fields to 
                your family's table.
              </p>
            </div>
            <button  className="group flex justify-between gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-secondary text-primary-foreground bg-green-300">
              <ExternalLink className="h-5 w-5 transition-transform group-hover:rotate-12" />
              <p>Learn About Our Farms</p>
            </button>
          </div>

          {/* Image Collage */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={rice}
                  alt="Fresh produce from Almo Farm"
                  className="w-full aspect-4/3 object-cover"
                />
                {/* Stat Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-lg">
                  <span className="block font-serif text-2xl font-bold">10+</span>
                  <span className="text-sm opacity-90">Years of Excellence</span>
                </div>
              </div>

              {/* Secondary Image (offset) */}
              <div className="absolute -bottom-8 -left-8 w-2/3 rounded-xl overflow-hidden shadow-xl border-4 border-background hidden sm:block">
                <img
                  src={field}
                  alt="Kenyan landscape at sunset"
                  className="w-full aspect-video object-cover"
                />
                {/* Stat Badge */}
                <div className="absolute bottom-4 right-4 bg-foreground/80 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-lg">
                  <span className="block font-serif text-xl font-bold">5000+</span>
                  <span className="text-xs opacity-90">Happy Families</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
