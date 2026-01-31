import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  GraduationCap,
  Briefcase,
  HeartPulse,
  Utensils,
  Home,
  HandHeart,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import educationImg from "@/assets/education-children.jpg";
import formationImg from "@/assets/formation-women.jpg";
import healthImg from "@/assets/health-care.jpg";
import foodImg from "@/assets/food-security.jpg";
import volunteersImg from "@/assets/volunteers.jpg";

const ActionsSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();

  const actions = [
    {
      id: "education",
      icon: GraduationCap,
      title: "Éducation",
      description:
        "Scolarisation, soutien scolaire, alphabétisation et distribution de kits scolaires pour chaque enfant.",
      image: educationImg,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "formation",
      icon: Briefcase,
      title: "Formation & Insertion",
      description:
        "Formation professionnelle, apprentissage, microcrédit et accompagnement vers l'emploi.",
      image: formationImg,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "sante",
      icon: HeartPulse,
      title: "Santé",
      description:
        "Accès aux soins, prévention, éducation à la santé et soutien psychosocial.",
      image: healthImg,
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "securite",
      icon: Utensils,
      title: "Sécurité Alimentaire",
      description:
        "Distribution alimentaire, jardins communautaires et éducation nutritionnelle.",
      image: foodImg,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "sans-abris",
      icon: Home,
      title: "Sans-abris",
      description:
        "Hébergement, insertion professionnelle et accompagnement social personnalisé.",
      image: volunteersImg,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "volontariat",
      icon: HandHeart,
      title: "Engagement Solidaire",
      description:
        "Volontariat international, missions terrain et mécénat d'entreprise.",
      image: volunteersImg,
      color: "from-cobalt to-cobalt-light",
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10",
          )}
        >
          <span className="badge-primary mb-4">Nos Actions</span>
          <h2 className="mb-6">
            Des actions concrètes pour{" "}
            <span className="text-cobalt">transformer des vies</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Six axes d'intervention pour accompagner les orphelins, les veuves
            et les jeunes vers l'autonomie et l'épanouissement.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <Link
              key={action.id}
              to={`/actions#${action.id}`}
              className={cn(
                "action-card group overflow-hidden transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-60",
                    action.color,
                  )}
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <action.icon className="w-6 h-6 text-cobalt" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-cobalt transition-colors">
                {action.title}
              </h3>
              <p className="text-muted-foreground mb-4">{action.description}</p>
              <span className="inline-flex items-center text-cobalt font-medium group-hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10",
          )}
        >
          <Link to="/actions" className="btn-primary inline-flex">
            Découvrir tous nos projets
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActionsSection;
