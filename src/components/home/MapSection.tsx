import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { presenceZones, presencePhrase } from '@/config/presence';

const MapSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();

  const locations = presenceZones.map((zone) => ({
    ...zone,
    city: zone.country === 'France' ? 'Strasbourg' : 'Multi-départements',
    description:
      zone.country === 'France'
        ? 'Siège de l\'association et coordination des actions en Europe'
        : `Actions terrain dans 6 départements du ${zone.country}`,
  }));

  const gridColsClass =
    locations.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

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
            Présents{' '}
            <span className="text-cobalt">{presencePhrase()}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Renaître de Nouveau s'engage à transformer des vies à travers le monde en menant 
            des actions concrètes sur deux continents.
          </p>
        </div>

        {/* Locations Grid */}
        <div className={cn("grid gap-8", gridColsClass)}>
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
