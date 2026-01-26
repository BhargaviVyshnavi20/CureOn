import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    "24/7 Doctor Availability",
    "Secure Video Consultations",
    "Digital Prescriptions",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 50,000+ patients
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
              Healthcare at Your
              <span className="gradient-text block">Fingertips</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-200">
              Connect with certified doctors, book appointments, and manage your health records—all from the comfort of your home.
            </p>

            {/* Feature List */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 animate-fade-up delay-300">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up delay-400">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto"
              >
                Book Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative z-10">
              {/* Main Image Container */}
              <div className="relative bg-card rounded-3xl p-2 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Doctor consultation"
                  className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                />
                
                {/* Floating Card 1 */}
                <div className="absolute -left-4 top-1/4 bg-card rounded-2xl p-4 shadow-lg animate-pulse-soft">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Appointment</p>
                      <p className="text-sm text-success">Confirmed</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -right-4 bottom-1/4 bg-card rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Doctor"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">Dr. Sarah</p>
                      <p className="text-sm text-muted-foreground">Online Now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
