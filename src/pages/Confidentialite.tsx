import Layout from '@/components/layout/Layout';

const Confidentialite = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-br from-cobalt via-cobalt to-cobalt-dark text-white">
        <div className="container-custom">
          <h1 className="text-white mb-4">Politique de confidentialité</h1>
          <p className="text-white/80">Dernière mise à jour : août 2026</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl mx-auto prose prose-slate">
          <p>
            L'association ONG Renaître de Nouveau (ci-après « l'association », « nous ») attache
            une grande importance à la protection des données personnelles des visiteurs de son
            site renaitredenouveau.org et de ses donateurs. Cette politique explique quelles
            données nous collectons, pourquoi, et comment vous pouvez exercer vos droits,
            conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            Informatique et Libertés.
          </p>

          <h2>Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est l'association ONG Renaître de Nouveau,
            joignable à l'adresse contact@renaitredenouveau.org.
          </p>

          <h2>Quelles données collectons-nous ?</h2>
          <ul>
            <li>
              <strong>Formulaire de contact</strong> : nom, adresse email, sujet et contenu de
              votre message.
            </li>
            <li>
              <strong>Dons en ligne</strong> : les dons sont traités directement par notre
              partenaire de paiement HelloAsso, qui collecte et traite vos données bancaires et
              d'identification pour son propre compte, en tant que responsable de traitement
              distinct. Nous vous invitons à consulter la{' '}
              <a
                href="https://info.helloasso.com/politique-de-confidentialite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cobalt hover:underline"
              >
                politique de confidentialité de HelloAsso
              </a>
              .
            </li>
            <li>
              <strong>Navigation sur le site</strong> : données techniques de connexion
              (adresse IP, type de navigateur) collectées de façon standard par notre
              hébergeur à des fins de sécurité.
            </li>
          </ul>

          <h2>Pourquoi collectons-nous ces données ?</h2>
          <ul>
            <li>Répondre à vos demandes envoyées via le formulaire de contact ;</li>
            <li>Émettre les reçus fiscaux liés à vos dons ;</li>
            <li>Assurer la sécurité et le bon fonctionnement du site.</li>
          </ul>

          <h2>Base légale</h2>
          <p>
            Le traitement de vos données repose sur votre consentement (formulaire de contact)
            et sur l'exécution d'obligations légales ou contractuelles (émission des reçus
            fiscaux liés aux dons).
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Les données issues du formulaire de contact sont conservées le temps nécessaire au
            traitement de votre demande, puis supprimées. Les données liées aux dons et aux
            reçus fiscaux sont conservées conformément aux obligations légales et comptables en
            vigueur (généralement 6 ans).
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
            d'effacement, de limitation, d'opposition et de portabilité de vos données
            personnelles. Pour exercer ces droits, contactez-nous à l'adresse
            contact@renaitredenouveau.org. Vous disposez également du droit d'introduire une
            réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont
            pas respectés.
          </p>

          <h2>Hébergement et sécurité</h2>
          <p>
            Le site est hébergé par LWS (Ligne Web Services), dont les serveurs sont situés en
            France. Des mesures techniques et organisationnelles sont mises en œuvre pour
            protéger vos données contre tout accès non autorisé, perte ou divulgation.
          </p>

          <h2>Cookies</h2>
          <p>
            Le site peut utiliser des cookies techniques strictement nécessaires à son bon
            fonctionnement. Aucun cookie de suivi publicitaire n'est utilisé par l'association.
          </p>

          <h2>Modifications</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour à tout moment. La date de
            dernière mise à jour figure en haut de cette page.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à cette politique de confidentialité, contactez-nous à
            contact@renaitredenouveau.org ou via notre{' '}
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

export default Confidentialite;
