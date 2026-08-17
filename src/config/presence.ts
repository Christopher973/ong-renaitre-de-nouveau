// Zones géographiques d'intervention de l'association.
//
// Pour ajouter un nouveau pays (ex. Togo) : ajouter un objet ici avec
// country, prepositionalPhrase (ex. 'au Togo'), address et mapUrl.
// Les pages qui utilisent ce fichier (MapSection, About, Hero, etc.)
// s'adaptent automatiquement au nombre de zones — aucune autre
// modification de code n'est nécessaire pour un simple ajout de pays.

export interface PresenceZone {
  country: string;
  // Formulation grammaticale correcte pour ce pays, ex. 'en France', 'au Bénin', 'au Togo'
  prepositionalPhrase: string;
  address: string;
  // URL d'intégration Google Maps (Google Maps Embed, sans clé API nécessaire
  // pour ce format simple basé sur une recherche d'adresse)
  mapUrl: string;
}

export const presenceZones: PresenceZone[] = [
  {
    country: 'France',
    prepositionalPhrase: 'en France',
    address: '24 rue de la Niederbourg, 67400 Illkirch-Graffenstaden',
    mapUrl:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('24 rue de la Niederbourg, 67400 Illkirch-Graffenstaden') +
      '&output=embed',
  },
  {
    country: 'Bénin',
    prepositionalPhrase: 'au Bénin',
    address: 'Alibori, Borgou, Atacora, Mono, Couffo, Plateau',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4069925.25!2d0.9900!3d9.3077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023cd5c7b7e5b7b%3A0x5b5b5b5b5b5b5b5b!2sBenin!5e0!3m2!1sfr!2sfr!4v1234567890',
  },
  // Ajouter le Togo (ou un autre pays) ici quand l'association y sera implantée.
];

// Phrase du type "en France et au Bénin", utilisée dans les titres et intros.
export const presencePhrase = (): string =>
  presenceZones.map((z) => z.prepositionalPhrase).join(' et ');
