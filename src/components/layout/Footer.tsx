import { Link } from "react-router-dom";
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Accueil", path: "/" },
    { name: "Qui sommes-nous", path: "/about" },
    { name: "Nos Actions", path: "/actions" },
    { name: "Notre Équipe", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  const actionLinks = [
    { name: "Éducation", path: "/actions#education" },
    { name: "Formation", path: "/actions#formation" },
    { name: "Santé", path: "/actions#sante" },
    { name: "Sécurité alimentaire", path: "/actions#securite" },
    { name: "Volontariat", path: "/actions#volontariat" },
  ];

  const engagementOptions = [
    {
      name: "Devenir Partenaire",
      description: "Associez votre marque à une cause noble",
    },
    {
      name: "Devenir Parrain",
      description: "Soutenez un enfant dans la durée",
    },
    {
      name: "Devenir Adhérent",
      description: "Contribuez aux initiatives locales",
    },
    {
      name: "Devenir Bénévole",
      description: "Participez activement à notre mission",
    },
  ];

  return (
    <footer className="bg-storm text-white">
      {/* Engagement Section */}
      <section className="bg-cobalt py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Agir avec nous
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Plusieurs façons de soutenir notre mission et de faire une
              différence
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementOptions.map((option, index) => (
              <div
                key={option.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              >
                <h3 className="font-bold text-lg text-white mb-2 group-hover:translate-x-1 transition-transform">
                  {option.name}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {option.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-white font-medium text-sm hover:gap-2 transition-all"
                >
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Column */}
            <div className="lg:col-span-1">
              <img src={logo} alt="Logo Renaître de Nouveau" className="h-20" />
              <p className="text-white/70 mb-6 leading-relaxed">
                Voir l'espoir renaître sur le visage de ceux et celles qui
                pensent que tout est fini pour eux.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100072441042941"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cobalt transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/renaitredenouveau_/"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cobalt transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Ld3j1YLSOVc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cobalt transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-cobalt-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div>
              <h4 className="font-bold text-lg mb-6">Nos Actions</h4>
              <ul className="space-y-3">
                {actionLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-cobalt-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cobalt-light flex-shrink-0 mt-0.5" />
                  <span className="text-white/70">
                    74 Rue du Lazaret
                    <br />
                    67100 Strasbourg, France
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cobalt-light flex-shrink-0" />
                  <a
                    href="tel:+33755181950"
                    className="text-white/70 hover:text-cobalt-light transition-colors"
                  >
                    +33 7 55 18 19 50
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cobalt-light flex-shrink-0" />
                  <a
                    href="mailto:contact@renaitredenouveau.org"
                    className="text-white/70 hover:text-cobalt-light transition-colors"
                  >
                    contact@renaitredenouveau.org
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="https://www.helloasso.com/associations/ong-renaitre-de-nouveau">
                  <Button className="btn-primary w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Faire un Don
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>
              © {currentYear} Renaître de Nouveau. Créé avec{" "}
              <Heart className="w-4 h-4 inline text-cobalt-light" /> par
              Christopher Marie-Angélique
            </p>
            <div className="flex gap-6">
              <Link
                to="/mentions-legales"
                className="hover:text-white transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                to="/confidentialite"
                className="hover:text-white transition-colors"
              >
                Confidentialité
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-white/30 mt-4">
            Association régie par les articles 21 à 79 III du Code civil local
            maintenu en vigueur dans les départements du Haut-Rhin, du Bas-Rhin
            et de la Moselle.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
