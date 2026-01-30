import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Heart, Gift, CreditCard, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const Donate = () => {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [impactRef, impactVisible] = useScrollAnimation<HTMLElement>();

  const donationAmounts = [10, 25, 50, 100, 250];

  const impacts = [
    { amount: '10€', impact: 'Fournitures scolaires pour 1 enfant pendant 1 mois' },
    { amount: '25€', impact: 'Repas pour une famille pendant 1 semaine' },
    { amount: '50€', impact: 'Consultation médicale et médicaments' },
    { amount: '100€', impact: 'Parrainage scolaire d\'un enfant pendant 1 mois' },
    { amount: '250€', impact: 'Formation professionnelle complète pour 1 adulte' },
  ];

  const benefits = [
    '66% de votre don déductible des impôts',
    'Reçu fiscal envoyé automatiquement',
    'Suivi transparent de l\'utilisation des fonds',
    'Rapports d\'activité réguliers',
  ];

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
            "max-w-3xl mx-auto text-center transition-all duration-700",
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Soutenez notre action
            </span>
            <h1 className="text-white mb-6">
              Faire un Don
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10">
              Chaque don compte et permet de transformer des vies. Ensemble, offrons un avenir 
              meilleur aux orphelins, veuves et jeunes en difficulté.
            </p>

            {/* Quick Donation Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  className="px-6 py-3 bg-white/10 hover:bg-white hover:text-cobalt rounded-full font-bold transition-all duration-300 border border-white/30"
                >
                  {amount}€
                </button>
              ))}
              <button className="px-6 py-3 bg-white text-cobalt rounded-full font-bold transition-all duration-300 hover:shadow-xl">
                Autre montant
              </button>
            </div>

            <p className="text-white/60 text-sm">
              Paiement 100% sécurisé • Don déductible à 66%
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        ref={impactRef}
        className="section-padding bg-warm-white"
      >
        <div className="container-custom">
          <div className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="badge-primary mb-4">Votre impact</span>
            <h2 className="mb-6">
              Chaque euro compte
            </h2>
            <p className="text-muted-foreground text-lg">
              Découvrez comment votre générosité se transforme en actions concrètes sur le terrain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {impacts.map((item, index) => (
              <div
                key={item.amount}
                className={cn(
                  "bg-white rounded-2xl p-6 shadow-soft text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                  impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-bold text-cobalt mb-3">{item.amount}</div>
                <p className="text-muted-foreground text-sm">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods & Benefits */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Ways to Give */}
            <div>
              <h2 className="mb-8">Plusieurs façons de donner</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-cobalt" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Don en ligne</h3>
                      <p className="text-muted-foreground text-sm">
                        Paiement sécurisé par carte bancaire ou PayPal. Simple, rapide et sécurisé.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-cobalt" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Don en nature</h3>
                      <p className="text-muted-foreground text-sm">
                        Matériel scolaire, vêtements, équipements médicaux... Contactez-nous pour organiser la collecte.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-cobalt" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Parrainage</h3>
                      <p className="text-muted-foreground text-sm">
                        Soutenez un enfant dans la durée et suivez son évolution grâce à des nouvelles régulières.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-cobalt rounded-3xl p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Vos avantages</h3>
              </div>
              <p className="text-white/80 mb-8">
                En soutenant Renaître de Nouveau, vous bénéficiez de nombreux avantages fiscaux 
                et d'une transparence totale sur l'utilisation de vos dons.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cobalt-light flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-cobalt hover:bg-white/90 rounded-full w-full">
                  Faire un don maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-storm text-white">
        <div className="container-custom text-center">
          <p className="text-white/60 text-sm mb-4">
            Association reconnue d'intérêt général
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-white/40 text-sm">
            <span>🔒 Paiements 100% sécurisés</span>
            <span>📄 Reçu fiscal automatique</span>
            <span>👁️ Transparence totale</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
