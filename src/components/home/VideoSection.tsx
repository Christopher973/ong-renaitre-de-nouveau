import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const VideoSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-storm text-white overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <span className="inline-flex items-center gap-2 bg-cobalt/20 px-4 py-2 rounded-full text-cobalt-light text-sm font-medium mb-6">
              Découvrez notre action
            </span>
            <h2 className="text-white mb-6">
              Ensemble, nous créons un{' '}
              <span className="text-cobalt-light">impact durable</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Découvrez comment Renaître de Nouveau transforme des vies au Bénin et en France. 
              Nos équipes sur le terrain travaillent chaque jour pour offrir un avenir meilleur 
              aux orphelins, aux veuves et aux jeunes en difficulté.
            </p>

            {/* Impact Points */}
            <div className="space-y-4">
              {[
                'Soutien éducatif pour des centaines d\'enfants',
                'Formation professionnelle pour l\'autonomie',
                'Accès aux soins de santé essentiels',
                'Distribution alimentaire régulière',
              ].map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-cobalt-light rounded-full" />
                  <span className="text-white/80">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className={cn(
            "relative transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-storm-light">
              {isPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/Ld3j1YLSOVc?autoplay=1"
                  title="ONG Renaître de Nouveau"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src="https://img.youtube.com/vi/Ld3j1YLSOVc/maxresdefault.jpg"
                    alt="Vidéo Renaître de Nouveau"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-storm/40 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-cobalt rounded-full flex items-center justify-center shadow-cobalt hover:scale-110 transition-transform duration-300 group"
                    >
                      <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-cobalt/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cobalt/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
