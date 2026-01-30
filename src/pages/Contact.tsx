import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est requis').max(100, 'Le nom est trop long'),
  email: z.string().trim().email('Email invalide').max(255, 'Email trop long'),
  subject: z.string().trim().min(1, 'Le sujet est requis').max(200, 'Le sujet est trop long'),
  message: z.string().trim().min(10, 'Le message doit contenir au moins 10 caractères').max(2000, 'Le message est trop long'),
});

const Contact = () => {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message envoyé !',
      description: 'Nous vous répondrons dans les plus brefs délais.',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: '74 Rue du Lazaret\n67100 Strasbourg, France',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+33 (0)0 00 00 00 00',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@renaitredenouveau.org',
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Lun - Ven : 9h - 18h',
    },
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
            "max-w-3xl transition-all duration-700",
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              Contactez-nous
            </span>
            <h1 className="text-white mb-6">
              Restons en contact
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              N'hésitez pas à nous contacter pour toute question, suggestion ou collaboration.
              Notre équipe est là pour vous aider.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nom complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className={cn(
                          'input-modern',
                          errors.name && 'border-destructive focus:ring-destructive'
                        )}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className={cn(
                          'input-modern',
                          errors.email && 'border-destructive focus:ring-destructive'
                        )}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Sujet de votre message"
                      className={cn(
                        'input-modern',
                        errors.subject && 'border-destructive focus:ring-destructive'
                      )}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      className={cn(
                        'input-modern resize-none',
                        errors.message && 'border-destructive focus:ring-destructive'
                      )}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-white rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-cobalt" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{info.title}</h3>
                      <p className="text-muted-foreground text-sm whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Volunteer CTA */}
              <div className="bg-cobalt rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8" />
                  <h3 className="font-bold text-lg">Devenir Bénévole</h3>
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  Rejoignez notre équipe de bénévoles et participez activement à notre mission.
                </p>
                <a href="/volunteer" className="btn-white text-sm w-full justify-center">
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.9!2d7.759!3d48.578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDM0JzQxLjAiTiA3wrA0NSczMy4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
          className="w-full h-full border-0"
          loading="lazy"
          title="Localisation Renaître de Nouveau"
        />
      </section>
    </Layout>
  );
};

export default Contact;
