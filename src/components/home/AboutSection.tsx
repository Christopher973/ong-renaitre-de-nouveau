import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Target, Eye, Heart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();

  const values = [
    {
      icon: Heart,
      title: 'Solidarité',
      description: 'Unis dans l\'action pour soutenir les plus vulnérables',
    },
    {
      icon: Users,
      title: 'Dignité humaine',
      description: 'Reconnaître la valeur intrinsèque de chaque personne',
    },
    {
      icon: Target,
      title: 'Autonomie',
      description: 'Accompagner vers l\'indépendance et l\'épanouissement',
    },
    {
      icon: Eye,
      title: 'Transparence',
      description: 'Une gestion claire et responsable de nos actions',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-warm-white"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <span className="badge-primary mb-4">À propos de nous</span>
            <h2 className="mb-6">
              Donner la chance aux personnes démunies de{' '}
              <span className="text-cobalt">Renaître de Nouveau</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Nous sommes une association de solidarité qui œuvrons en faveur des personnes 
              démunies à savoir les orphelins, les jeunes en difficultés et les veuves.
            </p>
            <p className="text-muted-foreground mb-8">
              Pourquoi ? Car travailler pour le bien-être de ces personnes démunies est pour nous 
              plus qu'une valeur, c'est une <strong>nécessité absolue</strong>. Nous reconnaissons que 
              chaque personne a sa valeur intrinsèque et son potentiel inépuisable.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-cobalt" />
                </div>
                <h4 className="font-bold text-lg mb-2">Notre Mission</h4>
                <p className="text-muted-foreground text-sm">
                  Accompagner de manière optimale vers l'autonomie en tenant compte de leur situation spécifique.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-cobalt" />
                </div>
                <h4 className="font-bold text-lg mb-2">Notre Vision</h4>
                <p className="text-muted-foreground text-sm">
                  Voir l'espoir renaître sur le visage de ceux qui pensent que tout est fini.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className={cn(
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cobalt to-cobalt-light rounded-xl flex items-center justify-center mb-4 shadow-cobalt">
                    <value.icon className="w-7 h-7 text-white" />
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
  );
};

export default AboutSection;
