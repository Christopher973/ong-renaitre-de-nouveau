import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { newsApi, imgUrl } from '@/lib/api';

type NewsItem = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
};

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

const NewsPreviewSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>();
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    newsApi
      .list()
      .then((all: NewsItem[]) => setItems(all.slice(0, 3)))
      .catch(() => setItems([]));
  }, []);

  // Rien à afficher tant qu'il n'y a pas d'actualité publiée
  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-padding bg-warm-white">
      <div className="container-custom">
        <div
          className={cn(
            'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <div>
            <span className="badge-primary mb-4">
              <Newspaper className="w-4 h-4 mr-2" />
              Actualités
            </span>
            <h2>Nos dernières nouvelles</h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-cobalt font-medium hover:underline"
          >
            Voir toutes les actualités
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          className={cn(
            'grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to="/news"
              className="text-left bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
            >
              {item.image && (
                <img
                  src={imgUrl(item.image)}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.created_at)}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{item.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPreviewSection;
