import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ArrowRight,
  Globe,
  HandHeart,
  Users,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import volunteersImg from "@/assets/volunteers.jpg";

const Volunteer = () => {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [whyRef, whyVisible] = useScrollAnimation<HTMLElement>();

  const reasons = [
    {
      icon: Heart,
      title: "Donner un sens à sa vie",
      description:
        "Contribuer positivement à la société et ressentir un sentiment de satisfaction.",
    },
    {
      icon: Globe,
      title: "Découvrir de nouvelles cultures",
      description:
        "Vivre une expérience enrichissante à l'international, au Bénin ou en France.",
    },
    {
      icon: HandHeart,
      title: "Développer des compétences",
      description:
        "Acquérir de nouvelles compétences professionnelles et personnelles.",
    },
    {
      icon: Users,
      title: "Faire des rencontres",
      description:
        "Tisser des liens forts avec d'autres bénévoles et les communautés locales.",
    },
  ];

  const missions = [
    "Éducation et soutien scolaire",
    "Santé et prévention",
    "Aide humanitaire",
    "Agriculture et environnement",
    "Action sociale",
    "Communication",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={volunteersImg}
            alt="Bénévoles Renaître de Nouveau"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-storm/90 via-storm/70 to-transparent" />
        </div>
        <div className="container-custom relative z-10 py-32">
          <div
            className={cn(
              "max-w-2xl transition-all duration-700",
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10",
            )}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4" />
              Rejoignez-nous
            </span>
            <h1 className="text-white mb-6">Devenez Bénévole</h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Le volontariat est fait pour tous les bénévoles avec ou sans
              expérience. Mettez vos compétences au service d'une cause noble et
              vivez une expérience unique.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="btn-primary text-lg px-8">
                  Postuler maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/actions#volontariat">
                <Button size="lg" className="btn-primary text-lg px-8">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section ref={whyRef} className="section-padding bg-warm-white">
        <div className="container-custom">
          <div
            className={cn(
              "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
              whyVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10",
            )}
          >
            <span className="badge-primary mb-4">Pourquoi s'engager ?</span>
            <h2 className="mb-6">
              Le volontariat, une expérience{" "}
              <span className="text-cobalt">enrichissante</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Le volontariat offre des avantages variés, allant de l'acquisition
              de compétences professionnelles à l'amélioration du bien-être
              personnel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className={cn(
                  "bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                  whyVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cobalt to-cobalt-light rounded-xl flex items-center justify-center mb-4 shadow-cobalt">
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-primary mb-4">Types de missions</span>
              <h2 className="mb-6">Trouvez votre mission</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Quel que soit votre profil – étudiants, jeunes, professionnels
                ou retraités – vous pourrez trouver une mission humanitaire qui
                vous donnera l'envie de vous engager.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {missions.map((mission, index) => (
                  <div
                    key={mission}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-soft"
                  >
                    <div className="w-8 h-8 bg-cobalt/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-cobalt" />
                    </div>
                    <span className="font-medium text-sm">{mission}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-sm">
                <strong>Condition :</strong> être majeur. Pas de condition de
                nationalité, ni de limite d'âge.
              </p>
            </div>

            <div className="bg-cobalt rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6 text-primary-foreground  ">
                Prêt à vous engager ?
              </h3>
              <p className="text-white/80 mb-8">
                Contactez-nous pour discuter de votre projet de volontariat.
                Nous trouverons ensemble la mission qui correspond le mieux à
                vos compétences et à vos envies.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Accompagnement personnalisé",
                  "Formation avant départ",
                  "Suivi pendant la mission",
                  "Certificat de bénévolat",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-cobalt hover:bg-white/90 rounded-full w-full"
                >
                  Nous contacter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Volunteer;
