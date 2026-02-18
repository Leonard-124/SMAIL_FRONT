

//import { Button } from "@/components/ui/button";
import { Phone, ShoppingBag } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-primary section-padding">
      <div className="container-width text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Taste the Difference?
        </h2>
        <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-10">
          Join thousands of Kenyan families who trust Almo Farm for their daily 
          fresh produce needs. Order today and experience farm-fresh quality 
          delivered to your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button  className="group flex justify-between gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-orange-300 text-primary-foreground">
            <ShoppingBag className="h-5 w-5" />
            <p>Start Your Order</p>
          </button>
          <button 
            // variant="ctaOutline" 
            // size="xl"
            className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-orange-300 flex justify-between gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Phone className="h-5 w-5" />
            <p>Contact Us</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
