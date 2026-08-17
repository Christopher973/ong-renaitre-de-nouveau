import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  GraduationCap,
  Briefcase,
  HeartPulse,
  Utensils,
  Home,
  HandHeart,
  Heart,
  ArrowRight,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import educationImg from "@/assets/education-children.jpg";
import formationImg from "@/assets/formation-women.jpg";
import healthImg from "@/assets/health-care.jpg";
import foodImg from "@/assets/food-security.jpg";
import volunteersImg from "@/assets/volunteers.jpg";
import { projectsApi, imgUrl } from "@/lib/api";

const Actions = () => {
  const location = useLocation();
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [projectUpdates, setProjectUpdates] = useState<any[]>([]);

  useEffect(() => {
    projectsApi.list().then(setProjectUpdates).catch(() => setProjectUpdates([]));
  }, []);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const actions = [
    {
      id: "education",
      icon: GraduationCap,
      title: "Éducation",
      subtitle: "Ouvrir les portes du savoir",
      description:
        "Notre engagement éducatif vise à soutenir chaque enfant dans son parcours d'apprentissage. De la scolarisation des enfants défavorisés au soutien scolaire pour ceux en difficulté, en passant par l'alphabétisation et la distribution de kits scolaires.",
      image: educationImg,
      points: [
        "Scolarisation des enfants défavorisés",
        "Soutien scolaire personnalisé",
        "Programme d'alphabétisation",
        "Distribution de kits scolaires",
        "Parrainage d'enfants orphelins",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "formation",
      icon: Briefcase,
      title: "Formation & Insertion Professionnelle",
      subtitle: "Les clés de l'indépendance",
      description:
        "Nous formons et insérons professionnellement. Notre objectif : donner les clés de l'indépendance aux jeunes et aux veuves. De la formation artisanale à l'entrepreneuriat, nous façonnons un avenir solide.",
      image: formationImg,
      points: [
        "Formations techniques (couture, menuiserie, informatique)",
        "Programmes d'alphabétisation pour adultes",
        "Certifications professionnelles reconnues",
        "Stages en entreprise",
        "Microcrédit et accompagnement entrepreneurial",
      ],
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "sante",
      icon: HeartPulse,
      title: "Santé",
      subtitle: "Améliorer la sécurité sanitaire",
      description:
        "En 2019, 5,2 millions d'enfants de moins de 5 ans sont morts de maladies évitables. Nos projets dans le domaine de la santé permettent d'améliorer la sécurité sanitaire des plus démunis.",
      image: healthImg,
      points: [
        "Consultations médicales et soins primaires",
        "Soutien psychosocial et counseling",
        "Programmes de sensibilisation santé",
        "Prévention des IST",
        "Don de matériel médical aux centres de santé",
      ],
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "securite",
      icon: Utensils,
      title: "Sécurité Alimentaire",
      subtitle: "Combattre la faim",
      description:
        "Un enfant de moins de 5 ans meurt de faim toutes les 11 secondes. Nous travaillons à créer des conditions où les bénéficiaires peuvent devenir autonomes et subvenir à leurs besoins essentiels.",
      image: foodImg,
      points: [
        "Distribution de colis alimentaires",
        "Jardins communautaires et agriculture urbaine",
        "Éducation nutritionnelle",
        "Fourniture de semences et outils agricoles",
        "Systèmes d'irrigation durables",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "sans-abris",
      icon: Home,
      title: "Accompagnement des Sans-Abris",
      subtitle: "Restaurer la dignité",
      description:
        "Être sans-abri, c'est bien plus qu'une absence de toit. Chez Renaître de Nouveau, nous comprenons que derrière chaque personne sans-abri se cache une histoire, une dignité et un potentiel inexploité.",
      image: volunteersImg,
      points: [
        "Hébergement et relogement",
        "Insertion professionnelle",
        "Rédaction de CV et coaching entretien",
        "Distribution de kits alimentaires et vestimentaires",
        "Accompagnement social personnalisé",
      ],
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "volontariat",
      icon: HandHeart,
      title: "Engagement Solidaire",
      subtitle: "Rejoindre la mission",
      description:
        "Renaître de Nouveau offre des opportunités de volontariat international pour ceux qui souhaitent s'engager dans des missions humanitaires significatives. Le volontariat est fait pour tous !",
      image: volunteersImg,
      points: [
        "Volontariat de solidarité internationale",
        "Missions terrain au Bénin",
        "Mécénat d'entreprise",
        "Développement de compétences pratiques",
        "Contribution aux objectifs de développement durable",
      ],
      color: "from-cobalt to-cobalt-light",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 bg-gradient-to-br from-cobalt via-cobalt to-cobalt-dark text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div
            className={cn(
              "max-w-3xl transition-all duration-700",
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10",
            )}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              6 axes d'intervention
            </span>
            <h1 className="text-white mb-6">Nos Actions & Projets</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Des actions concrètes pour transformer des vies. Chaque projet est
              conçu pour accompagner les bénéficiaires vers l'autonomie et
              l'épanouissement.
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}
      {actions.map((action, index) => (
        <section
          key={action.id}
          id={action.id}
          className={cn(
            "section-padding",
            index % 2 === 0 ? "bg-background" : "bg-warm-white",
          )}
        >
          <div className="container-custom">
            <div
              className={cn(
                "grid lg:grid-cols-2 gap-12 items-center",
                index % 2 === 1 && "lg:flex-row-reverse",
              )}
            >
              {/* Image */}
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden shadow-xl",
                  index % 2 === 1 && "lg:order-2",
                )}
              >
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-80 lg:h-[500px] object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-40",
                    action.color,
                  )}
                />
                <div className="absolute bottom-6 left-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                    <action.icon className="w-8 h-8 text-cobalt" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-cobalt font-medium text-sm uppercase tracking-wider">
                  {action.subtitle}
                </span>
                <h2 className="mt-2 mb-6">{action.title}</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {action.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {action.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cobalt flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <Link to="/donate">
                    <Button className="btn-primary">
                      <Heart className="w-4 h-4 mr-2" />
                      Soutenir ce projet
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full border-2 border-cobalt text-cobalt hover:bg-cobalt hover:text-white"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Avancées de projets */}
      {projectUpdates.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-cobalt font-medium text-sm uppercase tracking-wider">
                Suivi terrain
              </span>
              <h2 className="mt-2">Avancées de nos projets</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {projectUpdates.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="text-left bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] max-w-sm"
                >
                  {p.image && (
                    <img
                      src={imgUrl(p.image)}
                      alt={p.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="text-cobalt font-medium text-xs uppercase tracking-wider">
                      {p.project_name}
                    </span>
                    <h3 className="font-bold text-lg mt-2 mb-3">{p.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-4">{p.content}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-cobalt">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">Prêt à faire la différence ?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Chaque contribution compte. Rejoignez-nous dans notre mission de
            transformation des vies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button
                size="lg"
                className="bg-white text-cobalt hover:bg-white/90 rounded-full px-8"
              >
                <Heart className="w-5 h-5 mr-2" />
                Faire un Don
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button
                size="lg"
                className="bg-white text-cobalt hover:bg-white/90 rounded-full px-8"
              >
                Devenir Bénévole
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modale avancée de projet */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full z-10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              {selectedProject.image && (
                <img
                  src={imgUrl(selectedProject.image)}
                  alt={selectedProject.title}
                  className="w-full max-h-[50vh] object-contain bg-muted"
                />
              )}
            </div>
            <div className="p-8">
              <span className="text-cobalt font-medium text-xs uppercase tracking-wider">
                {selectedProject.project_name}
              </span>
              <h3 className="font-bold text-2xl mt-2 mb-4">{selectedProject.title}</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedProject.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Actions;
