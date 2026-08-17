import Layout from '@/components/layout/Layout';
import { presenceZones } from '@/config/presence';

const franceZone = presenceZones.find((z) => z.country === 'France');

const MentionsLegales = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-br from-cobalt via-cobalt to-cobalt-dark text-white">
        <div className="container-custom">
          <h1 className="text-white mb-4">Mentions légales</h1>
          <p className="text-white/80">Dernière mise à jour : août 2026</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl mx-auto prose prose-slate">
          <h2>Éditeur du site</h2>
          <p>
            Le site renaitredenouveau.org est édité par l'association <strong>ONG Renaître de
            Nouveau</strong>, association régie par les articles 21 à 79-III du Code civil local
            maintenu en vigueur dans les départements du Haut-Rhin, du Bas-Rhin et de la
            Moselle, ainsi que par ses statuts et son règlement intérieur.
          </p>
          <ul>
            <li>Siège social : {franceZone?.address}</li>
            <li>SIREN : 904 813 987</li>
            <li>Numéro de TVA intracommunautaire : FR84 904813987</li>
            <li>Téléphone : +33 7 55 18 19 50</li>
            <li>Email : contact@renaitredenouveau.org</li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le représentant légal de l'association ONG
            Renaître de Nouveau.
          </p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            LWS (Ligne Web Services) — SAS au capital de 500 000 €<br />
            10 Rue Penthièvre, 75008 Paris, France<br />
            RCS Paris B 851 993 683 — SIRET 851 993 683 00024<br />
            Site web : www.lws.fr
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos,
            graphismes) est la propriété exclusive de l'association ONG Renaître de Nouveau,
            sauf mention contraire. Toute reproduction, représentation, modification ou
            adaptation, totale ou partielle, sans autorisation écrite préalable, est interdite.
          </p>

          <h2>Responsabilité</h2>
          <p>
            L'association ONG Renaître de Nouveau s'efforce d'assurer l'exactitude et la mise à
            jour des informations diffusées sur ce site, mais ne peut garantir l'exhaustivité ou
            l'absence d'erreur. L'utilisation des informations et contenus disponibles sur
            l'ensemble du site se fait sous l'entière responsabilité de l'utilisateur.
          </p>

          <h2>Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers d'autres sites (dont la plateforme de don en
            ligne HelloAsso). L'association ONG Renaître de Nouveau n'exerce aucun contrôle sur
            ces sites tiers et décline toute responsabilité quant à leur contenu.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige,
            les tribunaux français seront seuls compétents.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, vous pouvez nous
            contacter à l'adresse contact@renaitredenouveau.org ou via notre{' '}
            <a href="/contact" className="text-cobalt hover:underline">
              page de contact
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
