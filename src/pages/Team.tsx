import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Users, MapPin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Team = () => {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [franceRef, franceVisible] = useScrollAnimation<HTMLElement>();
  const [beninRef, beninVisible] = useScrollAnimation<HTMLElement>();

  const teamFrance = [
    {
      name: 'Romuald HOUNYEME',
      role: 'Président de l\'Association',
      description: 'Fondateur et leader visionnaire de Renaître de Nouveau.',
    },
    {
      name: 'Virginie KENEY',
      role: 'Vice présidente & Trésorière',
      description: 'En charge de la gestion financière et du développement stratégique.',
    },
    {
      name: 'Vicencia DAVITO',
      role: 'Responsable Survie et Développement',
      description: 'Chargée de la survie et du développement de l\'enfant, du jeune et de la veuve.',
    },
    {
      name: 'Mariette LOKOTO',
      role: 'Responsable Partenariats',
      description: 'En charge du développement des partenariats et relations institutionnelles.',
    },
  ];

  const teamBenin = [
    {
      name: 'Athanase AKOUEHOU',
      role: 'Vice président',
      description: 'Chargé des affaires administratives et de la coordination terrain.',
    },
  ];

  const teamStage = [
    {
      name: 'Maya ROSSIGNOL',
      role: 'Chargée de Communication',
      description: 'Responsable de la stratégie de communication et des réseaux sociaux.',
    },
  ];

  const TeamCard = ({ member, index }: { member: typeof teamFrance[0]; index: number }) => (
    <div
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-cobalt to-cobalt-light rounded-full flex items-center justify-center mb-4 mx-auto shadow-cobalt">
        <span className="text-white font-bold text-2xl">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
        <p className="text-cobalt font-medium text-sm mb-3">{member.role}</p>
        <p className="text-muted-foreground text-sm">{member.description}</p>
      </div>
    </div>
  );

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
              <Users className="w-4 h-4" />
              Notre équipe
            </span>
            <h1 className="text-white mb-6">
              Les visages de l'espoir
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Des hommes et des femmes dévoués qui travaillent chaque jour pour transformer
              des vies en France et au Bénin.
            </p>
          </div>
        </div>
      </section>

      {/* Équipe France */}
      <section
        ref={franceRef}
        className="section-padding bg-warm-white"
      >
        <div className="container-custom">
          <div className={cn(
            "text-center mb-12 transition-all duration-700",
            franceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="inline-flex items-center gap-2 badge-primary mb-4">
              <MapPin className="w-4 h-4" />
              France - Strasbourg
            </div>
            <h2>Équipe en France</h2>
          </div>

          <div className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700",
            franceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {teamFrance.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Équipe Bénin */}
      <section
        ref={beninRef}
        className="section-padding bg-background"
      >
        <div className="container-custom">
          <div className={cn(
            "text-center mb-12 transition-all duration-700",
            beninVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="inline-flex items-center gap-2 badge-primary mb-4">
              <MapPin className="w-4 h-4" />
              Bénin
            </div>
            <h2>Équipe au Bénin</h2>
          </div>

          <div className={cn(
            "max-w-md mx-auto transition-all duration-700",
            beninVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {teamBenin.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stagiaires */}
      <section className="section-padding bg-warm-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>Équipe Stagiaires</h2>
          </div>

          <div className="max-w-md mx-auto">
            {teamStage.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-cobalt">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            Rejoignez notre équipe
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Vous souhaitez mettre vos compétences au service d'une cause noble ?
            Devenez bénévole ou stagiaire chez Renaître de Nouveau.
          </p>
          <a
            href="/contact"
            className="btn-white inline-flex"
          >
            <Mail className="w-5 h-5 mr-2" />
            Nous contacter
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
