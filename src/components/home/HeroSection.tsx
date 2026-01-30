import { Link } from 'react-router-dom';
import { Heart, Users, ArrowDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-humanitarian.jpg';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Action humanitaire Renaître de Nouveau"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-storm/60 via-storm/40 to-storm/80" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-cobalt/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-cobalt/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="container-custom relative z-10 text-center text-white pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in-down">
          <span className="w-2 h-2 bg-cobalt-light rounded-full animate-pulse" />
          <span className="text-sm font-medium">Association humanitaire au Bénin et en France</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 max-w-5xl mx-auto animate-fade-in-up">
          Voir l'espoir{' '}
          <span className="text-cobalt-light">renaître</span>
          {' '}sur le visage de ceux qui pensent que tout est fini
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Accompagner vers l'autonomie les orphelins, les veuves et les jeunes en difficulté. 
          Une prise en charge holistique pour offrir un soutien complet à leurs besoins uniques.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/donate">
            <Button size="lg" className="btn-primary text-lg px-8 py-6 shadow-cobalt">
              <Heart className="w-5 h-5 mr-2" />
              Faire un Don
            </Button>
          </Link>
          <Link to="/volunteer">
            <Button size="lg" className="btn-white text-lg px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Devenir Bénévole
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {[
            { value: '5000+', label: 'Bénéficiaires' },
            { value: '2', label: 'Pays d\'action' },
            { value: '6', label: 'Axes d\'intervention' },
            { value: '50+', label: 'Bénévoles actifs' },
          ].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-cobalt-light mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
