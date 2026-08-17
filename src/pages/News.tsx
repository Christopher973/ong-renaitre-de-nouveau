import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Newspaper, Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { newsApi, imgUrl } from '@/lib/api';

type NewsItem = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  images?: string[];
  created_at: string;
};

const News = () => {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [contentRef, contentVisible] = useScrollAnimation<HTMLElement>();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    newsApi
      .list()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

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
              'max-w-3xl transition-all duration-700',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4" />
              Actualités
            </span>
            <h1 className="text-white mb-6">Nos dernières nouvelles</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Suivez l'actualité de l'association : avancées de nos projets, événements,
              et moments forts vécus aux côtés des personnes que nous accompagnons.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des actualités */}
      <section ref={contentRef} className="section-padding bg-warm-white">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Aucune actualité pour le moment. Revenez bientôt !
            </p>
          ) : (
            <div
              className={cn(
                'grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700',
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
            >
              {items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="text-left bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {item.image && (
                    <img
                      src={imgUrl(item.image)}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.created_at)}
                    </div>
                    <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-4">{item.content}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modale actualité */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full z-10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              {selectedItem.images && selectedItem.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[50vh] overflow-y-auto">
                  {selectedItem.images.map((img, i) => (
                    <img
                      key={i}
                      src={imgUrl(img)}
                      alt={`${selectedItem.title} - photo ${i + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  ))}
                </div>
              ) : (
                selectedItem.image && (
                  <img
                    src={imgUrl(selectedItem.image)}
                    alt={selectedItem.title}
                    className="w-full max-h-[50vh] object-contain bg-muted"
                  />
                )
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedItem.created_at)}
              </div>
              <h3 className="font-bold text-2xl mb-4">{selectedItem.title}</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedItem.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default News;
