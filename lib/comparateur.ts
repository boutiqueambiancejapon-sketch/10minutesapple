/**
 * lib/comparateur.ts — données statiques de tous les comparateurs produit.
 * amazonUrl: '' = lien à venir (fourni par l'utilisateur).
 * Toujours passer amazonUrl via AffiliateLink / addAffiliateTag().
 */

export type ModeleComparateur = {
  nom: string
  prix: number
  nouveaute?: boolean
  amazonUrl: string  // '' = à venir
  specs: Record<string, string>
}

export type ProduitComparateur = {
  id: string
  label: string
  description: string
  specsLabels: Record<string, string>
  modeles: ModeleComparateur[]
}

export const COMPARATEURS: Record<string, ProduitComparateur> = {
  iphone: {
    id: 'iphone',
    label: 'iPhone',
    description: 'Compare tous les iPhone côte à côte : puce, caméra, écran, autonomie et prix.',
    specsLabels: {
      puce: 'Puce',
      ecran: 'Écran',
      photo: 'Photo principale',
      batterie: 'Autonomie vidéo',
      stockage: 'Stockage min.',
    },
    modeles: [
      {
        nom: 'iPhone 15',
        prix: 769,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'A16 Bionic',
          ecran: '6,1" OLED 60Hz',
          photo: '48 MP Fusion',
          batterie: '20h',
          stockage: '128 Go',
        },
      },
      {
        nom: 'iPhone 15 Plus',
        prix: 869,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'A16 Bionic',
          ecran: '6,7" OLED 60Hz',
          photo: '48 MP Fusion',
          batterie: '26h',
          stockage: '128 Go',
        },
      },
      {
        nom: 'iPhone 16',
        prix: 869,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'A18',
          ecran: '6,1" OLED 60Hz',
          photo: '48 MP Fusion + 12 MP Ultra',
          batterie: '22h',
          stockage: '128 Go',
        },
      },
      {
        nom: 'iPhone 16 Plus',
        prix: 969,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'A18',
          ecran: '6,7" OLED 60Hz',
          photo: '48 MP Fusion + 12 MP Ultra',
          batterie: '27h',
          stockage: '128 Go',
        },
      },
      {
        nom: 'iPhone 16 Pro',
        prix: 1229,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'A18 Pro',
          ecran: '6,3" ProMotion 120Hz',
          photo: '48+12+12 MP ProRAW',
          batterie: '27h',
          stockage: '128 Go',
        },
      },
      {
        nom: 'iPhone 16 Pro Max',
        prix: 1479,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'A18 Pro',
          ecran: '6,9" ProMotion 120Hz',
          photo: '48+12+12 MP ProRAW',
          batterie: '33h',
          stockage: '256 Go',
        },
      },
    ],
  },

  mac: {
    id: 'mac',
    label: 'Mac',
    description: 'MacBook Air, MacBook Pro, Mac mini, iMac — tous les Mac comparés par prix et performance.',
    specsLabels: {
      puce: 'Puce',
      ram: 'RAM',
      stockage: 'Stockage min.',
      ecran: 'Écran',
      autonomie: 'Autonomie',
      poids: 'Poids',
    },
    modeles: [
      {
        nom: 'Mac mini M4',
        prix: 699,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'M4',
          ram: '16 Go',
          stockage: '256 Go',
          ecran: 'Externe requis',
          autonomie: '—',
          poids: '0,67 kg',
        },
      },
      {
        nom: 'MacBook Air 13" M3',
        prix: 1299,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'M3',
          ram: '8 Go',
          stockage: '256 Go',
          ecran: '13,6" Liquid Retina',
          autonomie: '18h',
          poids: '1,24 kg',
        },
      },
      {
        nom: 'MacBook Air 15" M3',
        prix: 1599,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'M3',
          ram: '8 Go',
          stockage: '256 Go',
          ecran: '15,3" Liquid Retina',
          autonomie: '18h',
          poids: '1,51 kg',
        },
      },
      {
        nom: 'iMac 24" M4',
        prix: 1699,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'M4',
          ram: '16 Go',
          stockage: '256 Go',
          ecran: '24" 4,5K Retina',
          autonomie: '—',
          poids: '4,46 kg',
        },
      },
      {
        nom: 'MacBook Pro 14" M4',
        prix: 2099,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'M4',
          ram: '16 Go',
          stockage: '512 Go',
          ecran: '14,2" Liquid Retina XDR',
          autonomie: '24h',
          poids: '1,61 kg',
        },
      },
      {
        nom: 'MacBook Pro 16" M4 Pro',
        prix: 2999,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'M4 Pro',
          ram: '24 Go',
          stockage: '512 Go',
          ecran: '16,2" Liquid Retina XDR',
          autonomie: '24h',
          poids: '2,14 kg',
        },
      },
    ],
  },

  ipad: {
    id: 'ipad',
    label: 'iPad',
    description: 'iPad, iPad mini, iPad Air, iPad Pro — le bon iPad selon ton usage et ton budget.',
    specsLabels: {
      puce: 'Puce',
      ecran: 'Écran',
      stockage: 'Stockage min.',
      stylet: 'Apple Pencil',
      connectique: 'Connectique',
      poids: 'Poids (Wi-Fi)',
    },
    modeles: [
      {
        nom: 'iPad 10e génération',
        prix: 399,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'A14 Bionic',
          ecran: '10,9" Liquid Retina',
          stockage: '64 Go',
          stylet: 'Apple Pencil 1 (USB-C)',
          connectique: 'USB-C',
          poids: '477 g',
        },
      },
      {
        nom: 'iPad mini 7',
        prix: 599,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'A17 Pro',
          ecran: '8,3" Liquid Retina',
          stockage: '128 Go',
          stylet: 'Apple Pencil Pro',
          connectique: 'USB-C',
          poids: '293 g',
        },
      },
      {
        nom: 'iPad Air 11" M2',
        prix: 799,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'M2',
          ecran: '11" Liquid Retina',
          stockage: '128 Go',
          stylet: 'Apple Pencil Pro',
          connectique: 'USB-C',
          poids: '462 g',
        },
      },
      {
        nom: 'iPad Air 13" M2',
        prix: 1099,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          puce: 'M2',
          ecran: '13" Liquid Retina',
          stockage: '128 Go',
          stylet: 'Apple Pencil Pro',
          connectique: 'USB-C',
          poids: '617 g',
        },
      },
      {
        nom: 'iPad Pro 11" M4',
        prix: 1199,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'M4',
          ecran: '11" Ultra Retina XDR OLED',
          stockage: '256 Go',
          stylet: 'Apple Pencil Pro',
          connectique: 'Thunderbolt / USB 4',
          poids: '444 g',
        },
      },
      {
        nom: 'iPad Pro 13" M4',
        prix: 1599,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          puce: 'M4',
          ecran: '13" Ultra Retina XDR OLED',
          stockage: '256 Go',
          stylet: 'Apple Pencil Pro',
          connectique: 'Thunderbolt / USB 4',
          poids: '579 g',
        },
      },
    ],
  },

  watch: {
    id: 'watch',
    label: 'Apple Watch',
    description: 'Watch SE, Series 10, Ultra 2 — le bon modèle selon ton budget et ton usage sport.',
    specsLabels: {
      ecran: 'Écran',
      autonomie: 'Autonomie',
      waterproof: 'Résistance à l\'eau',
      sante: 'Santé',
      specifique: 'Spécificité',
    },
    modeles: [
      {
        nom: 'Apple Watch SE 2',
        prix: 279,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          ecran: '40 / 44 mm LTPO OLED',
          autonomie: '18h',
          waterproof: '50 m',
          sante: 'Cardio · chute · crash',
          specifique: 'Pas d\'always-on',
        },
      },
      {
        nom: 'Apple Watch Series 10',
        prix: 449,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          ecran: '42 / 46 mm Always-On',
          autonomie: '18h (36h mode éco)',
          waterproof: 'Plongée 100 m',
          sante: 'Cardio · ECG · SpO2 · apnée',
          specifique: 'La plus fine jamais produite',
        },
      },
      {
        nom: 'Apple Watch Ultra 2',
        prix: 899,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          ecran: '49 mm Always-On Micro-LED',
          autonomie: '60h (36h course)',
          waterproof: 'Plongée 100 m + EN 13319',
          sante: 'Cardio · ECG · SpO2 · température',
          specifique: 'GPS de précision double fréquence',
        },
      },
    ],
  },

  airpods: {
    id: 'airpods',
    label: 'AirPods',
    description: 'AirPods 4, AirPods Pro 2, AirPods Max — les bons écouteurs Apple selon ton usage.',
    specsLabels: {
      anc: 'Réduction de bruit',
      autonomie: 'Autonomie (ANC actif)',
      etanche: 'Résistance',
      spatial: 'Spatial Audio',
      format: 'Format',
    },
    modeles: [
      {
        nom: 'AirPods 4',
        prix: 149,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          anc: 'Non',
          autonomie: '5h (30h boîtier)',
          etanche: 'IPX4',
          spatial: 'Oui (head tracking)',
          format: 'Intra sans embout',
        },
      },
      {
        nom: 'AirPods 4 ANC',
        prix: 179,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          anc: 'Oui (actif)',
          autonomie: '4h (24h boîtier)',
          etanche: 'IPX4',
          spatial: 'Oui (head tracking)',
          format: 'Intra sans embout',
        },
      },
      {
        nom: 'AirPods Pro 2',
        prix: 249,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          anc: 'Oui — meilleur ANC Apple',
          autonomie: '5,5h (30h boîtier)',
          etanche: 'IP54',
          spatial: 'Oui (Personalized)',
          format: 'Intra avec embouts',
        },
      },
      {
        nom: 'AirPods Max USB-C',
        prix: 599,
        nouveaute: false,
        amazonUrl: '',
        specs: {
          anc: 'Oui — référence ANC circumaural',
          autonomie: '20h',
          etanche: 'Non',
          spatial: 'Oui (Personalized)',
          format: 'Circumaural (over-ear)',
        },
      },
    ],
  },
}

export const PRODUIT_SLUGS = Object.keys(COMPARATEURS)

export function getProduit(slug: string): ProduitComparateur | undefined {
  return COMPARATEURS[slug]
}
