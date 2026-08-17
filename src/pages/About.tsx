import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Target, Eye, Heart, Users, Shield, BookOpen, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { presenceZones } from '@/config/presence';

const About = () => {
  const location = useLocation();
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [missionRef, missionVisible] = useScrollAnimation<HTMLElement>();
  const [charteRef, charteVisible] = useScrollAnimation<HTMLElement>();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const values = [
    {
      icon: Heart,
      title: 'Solidarité',
      description: 'Unis dans l\'action pour soutenir les plus vulnérables à travers le monde.',
    },
    {
      icon: Users,
      title: 'Dignité humaine',
      description: 'Reconnaître la valeur intrinsèque et le potentiel de chaque personne.',
    },
    {
      icon: Target,
      title: 'Autonomie',
      description: 'Accompagner vers l\'indépendance économique et l\'épanouissement personnel.',
    },
    {
      icon: Eye,
      title: 'Transparence',
      description: 'Une gestion claire, responsable et ouverte de toutes nos actions.',
    },
  ];

  const chartePoints = [
    'Apprenons à faire le bien',
    'Recherchons la justice',
    'Protégeons l\'opprimé, l\'indigent',
    'Faisons droit à l\'orphelin',
    'Défendons la veuve',
  ];

  // Zones d'intervention : les données géographiques (pays, adresse, carte) viennent
  // de src/config/presence.ts, source unique partagée avec la page d'accueil.
  // Pour ajouter un nouveau pays, modifier uniquement ce fichier de config.
  const zones = presenceZones.map((zone) => ({
    ...zone,
    title:
      zone.country === 'France'
        ? 'France - Strasbourg'
        : `${zone.country} - Multi-départements`,
    description:
      zone.country === 'France'
        ? 'Siège de l\'association et coordination des actions humanitaires en Europe.'
        : `Actions terrain dans 6 départements pour soutenir les communautés locales.`,
  }));

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
          <div className={cn(
            "max-w-3xl transition-all duration-700",
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Depuis 2018
            </span>
            <h1 className="text-white mb-6">
              Qui sommes-nous ?
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Donner la chance aux personnes démunies de Renaître de Nouveau sur tous les plans. 
              Nous sommes une association de solidarité qui œuvrons en faveur des personnes 
              démunies à savoir les orphelins, les jeunes en difficultés et les veuves.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section
        id="missions"
        ref={missionRef}
        className="section-padding bg-warm-white"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Mission & Vision */}
            <div className={cn(
              "transition-all duration-700",
              missionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              <span className="badge-primary mb-4">Notre raison d'être</span>
              <h2 className="mb-8">Missions & Valeurs</h2>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-7 h-7 text-cobalt" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">Notre Mission</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Accompagner de manière optimale vers l'autonomie les orphelins, 
                        les veuves et les jeunes de la rue en tenant compte de leur situation 
                        spécifique. Une prise en charge holistique, c'est-à-dire en considérant 
                        toutes les dimensions de la personne, afin de leur offrir un soutien 
                        complet à leurs besoins uniques.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="w-7 h-7 text-cobalt" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">Notre Vision</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Voir l'espoir renaître sur le visage de ceux et celles qui pensent 
                        que tout est fini pour eux/elles. Nous reconnaissons que chaque personne 
                        a sa valeur intrinsèque et son potentiel inépuisable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Values Grid */}
            <div className={cn(
              "transition-all duration-700 delay-200",
              missionVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}>
              <h3 className="text-2xl font-bold mb-6">Nos Valeurs</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cobalt to-cobalt-light rounded-xl flex items-center justify-center mb-4 shadow-cobalt">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charte */}
      <section
        id="charte"
        ref={charteRef}
        className="section-padding bg-storm text-white"
      >
        <div className="container-custom">
          <div className={cn(
            "max-w-4xl mx-auto transition-all duration-700",
            charteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-cobalt/20 px-4 py-2 rounded-full text-cobalt-light text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Nos engagements
              </span>
              <h2 className="text-white mb-6">Notre Charte</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Ensemble pour un Monde Juste et Bienveillant. Nous nous engageons à cultiver 
                une culture du bien, de la justice et de la protection des plus vulnérables.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Chez Renaître de Nouveau, nous croyons fermement qu'il est de notre devoir de 
                faire droit aux orphelins et de défendre les veuves, tout en recherchant 
                activement la justice pour tous. Nous nous tenons aux côtés des opprimés, 
                offrant un refuge sûr et un soutien inconditionnel à ceux qui en ont le plus besoin.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {chartePoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-4"
                  >
                    <CheckCircle className="w-5 h-5 text-cobalt-light flex-shrink-0" />
                    <span className="text-white/90">{point}</span>
                  </div>
                ))}
              </div>

              <p className="text-white/60 text-center mt-8 text-sm">
                En travaillant ensemble, nous pouvons construire un avenir où chacun peut vivre 
                dans la dignité et l'équité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section id="zones" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Présence internationale</span>
            <h2 className="mb-6">Zones d'intervention</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Renaître de Nouveau s'engage à transformer des vies en menant des actions
              concrètes {zones.map((z) => z.prepositionalPhrase).join(' et ')}.
            </p>
          </div>

          <div className={cn('grid gap-8', zones.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2')}>
            {zones.map((zone) => (
              <div key={zone.country} className="bg-white rounded-2xl overflow-hidden shadow-soft">
                <div className="h-64 bg-muted">
                  <iframe
                    src={zone.mapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    title={`Carte ${zone.country}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{zone.title}</h3>
                  <p className="text-muted-foreground mb-2">{zone.address}</p>
                  <p className="text-muted-foreground text-sm">{zone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
