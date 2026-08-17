import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { zonesApi, Zone } from '@/lib/api';

const MapSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    zonesApi
      .list()
      .then(setZones)
      .catch(() => setZones([]));
  }, []);

  if (zones.length === 0) return null;

  const gridColsClass = zones.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  const presencePhrase = zones.map((z) => z.prepositional_phrase).join(' et ');

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
            <span className="text-cobalt">{presencePhrase}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Renaître de Nouveau s'engage à transformer des vies à travers le monde en menant
            des actions concrètes sur plusieurs continents.
          </p>
        </div>

        {/* Locations Grid */}
        <div className={cn("grid gap-8", gridColsClass)}>
          {zones.map((zone, index) => (
            <div
              key={zone.id}
              className={cn(
                "bg-white rounded-2xl overflow-hidden shadow-soft transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Map */}
              <div className="h-64 bg-muted">
                <iframe
                  src={zone.map_url}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Carte ${zone.country}`}
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
                      <h3 className="text-xl font-bold">{zone.country}</h3>
                      {zone.city && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-cobalt font-medium">{zone.city}</span>
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {zone.address}
                    </p>
                    {zone.description && (
                      <p className="text-muted-foreground">
                        {zone.description}
                      </p>
                    )}
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
