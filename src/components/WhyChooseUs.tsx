

import { Leaf, Truck, Heart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Farm Fresh",
    description: "Harvested daily from our organic Kenyan farms for maximum freshness.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Truck,
    title: "Swift Delivery",
    description: "From farm to your doorstep within 24 hours of harvest.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Family Values",
    description: "We treat your family's health as our own priority.",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Rigorous quality checks ensure only the best reaches you.",
    color: "bg-secondary/10 text-secondary",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="bg-background section-padding">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Almo Farm?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're more than suppliers — we're your partners in providing wholesome 
            nourishment for your family.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-5`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
