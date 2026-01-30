import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const MapSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();

  const locations = [
    {
      country: 'France',
      city: 'Strasbourg',
      address: '74 Rue du Lazaret, 67100 Strasbourg',
      description: 'Siège de l\'association et coordination des actions en Europe',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.9777088888886!2d7.7594!3d48.5783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796b14e7c5e5e5b%3A0x3e8f8e8e8e8e8e8e!2s74%20Rue%20du%20Lazaret%2C%2067100%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1234567890',
    },
    {
      country: 'Bénin',
      city: 'Multi-départements',
      address: 'Alibori, Borgou, Atacora, Mono, Couffo, Plateau',
      description: 'Actions terrain dans 6 départements du Bénin',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4069925.25!2d0.9900!3d9.3077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023cd5c7b7e5b7b%3A0x5b5b5b5b5b5b5b5b!2sBenin!5e0!3m2!1sfr!2sfr!4v1234567890',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-warm-white"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="badge-primary mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Zones d'intervention
          </span>
          <h2 className="mb-6">
            Présents en{' '}
            <span className="text-cobalt">France et au Bénin</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Renaître de Nouveau s'engage à transformer des vies à travers le monde en menant 
            des actions concrètes sur deux continents.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div
              key={location.country}
              className={cn(
                "bg-white rounded-2xl overflow-hidden shadow-soft transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Map */}
              <div className="h-64 bg-muted">
                <iframe
                  src={location.mapUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Carte ${location.country}`}
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cobalt" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{location.country}</h3>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-cobalt font-medium">{location.city}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {location.address}
                    </p>
                    <p className="text-muted-foreground">
                      {location.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
