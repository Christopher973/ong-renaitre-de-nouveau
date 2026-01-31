import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CTASection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cobalt via-cobalt to-cobalt-dark" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10",
          )}
        >
          {/* Quote */}
          <blockquote className="mb-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed mb-6">
              "Apprenons à faire le bien, Recherchons la justice, Protégeons
              l'opprimé, Faisons droit à l'orphelin, Défendons la veuve"
            </p>
          </blockquote>

          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Ensemble, nous pouvons construire un avenir où chacun peut vivre
            dans la dignité et l'équité. Rejoignez notre mission aujourd'hui.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/donate">
              <Button
                size="lg"
                className="bg-white text-cobalt hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Heart className="w-5 h-5 mr-2" />
                Faire un Don
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-cobalt hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Users className="w-5 h-5 mr-2" />
                Devenir Bénévole
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Association reconnue
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Transparence financière
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Dons déductibles
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
