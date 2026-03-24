/**
 * Contenu éditorial structuré pour les pages /choisir/[produit].
 * Chaque produit = TL;DR + sections H2/H3 + FAQ ≥ 6.
 * Le contenu est pur texte ; le rendu JSX est dans ChoisirEditorial.
 */

export type ChoisirTable = {
  headers: string[]
  rows: string[][]
}

export type ChoisirSection = {
  id: string
  title: string
  intro: string
  paragraphs?: string[]
  table?: ChoisirTable
  tip?: string
  internalLink?: { text: string; href: string }
}

export type ChoisirFAQ = { q: string; a: string }

export type ChoisirProductContent = {
  tldr: string[]
  sections: ChoisirSection[]
  faq: ChoisirFAQ[]
}

// ---------------------------------------------------------------------------
// iPhone
// ---------------------------------------------------------------------------
function iphoneContent(year: number): ChoisirProductContent {
  return {
    tldr: [
      `L'iPhone 17 est le meilleur choix global en ${year} — écran 120 Hz, puce A19, excellent rapport qualité-prix à 999 €.`,
      `Pour la photo, les iPhone 17 Pro et Pro Max partagent le même triple capteur 48 MP avec zoom 5× — le Pro suffit sauf besoin d'écran géant.`,
      `Budget serré ? L'iPhone 16e à 699 € embarque la puce A18, Face ID et un design moderne.`,
    ],
    sections: [
      {
        id: 'quel-iphone-acheter',
        title: `Quel iPhone acheter selon ton profil ?`,
        intro: `En ${year}, Apple vend 10 modèles neufs en parallèle. Le bon choix dépend de ton budget et de ce que tu fais vraiment avec ton téléphone — pas du dernier keynote.`,
        table: {
          headers: ['Profil', 'Modèle', 'Prix', 'Verdict'],
          rows: [
            ['Usage quotidien', 'iPhone 17', '999 €', 'Le nouveau standard — 120 Hz enfin sur le modèle de base'],
            ['Photo & vidéo', 'iPhone 17 Pro', '1 229 €', 'Triple capteur 48 MP, zoom 5×, ProRes'],
            ['Grand écran', 'iPhone 17 Pro Max', '1 479 €', 'Même caméra que le Pro, écran 6,9\" et 37h d\'autonomie'],
            ['Ultra fin', 'iPhone 17 Air', '899 €', '5,5 mm d\'épaisseur — le plus fin jamais fait'],
            ['Petit budget neuf', 'iPhone 16e', '699 €', 'Puce A18, Apple Intelligence, Face ID'],
            ['Petit budget reconditionné', 'iPhone 15', '~500 €', 'USB-C, Dynamic Island, encore 4 ans de mises à jour'],
          ],
        },
        internalLink: { text: 'Comparer tous les iPhone côte à côte', href: '/comparer/iphone' },
      },
      {
        id: 'iphone-17-vs-pro-vs-air',
        title: `iPhone 17 vs 17 Pro vs 17 Air — les vraies différences`,
        intro: `Honnêtement, la différence entre l'iPhone 17 et le 17 Pro n'a jamais été aussi faible. Les deux tournent sur la puce A19, les deux ont un écran OLED 120 Hz. Ce qui change vraiment : la caméra et les matériaux.`,
        paragraphs: [
          `Le 17 Pro ajoute un téléobjectif 5× et un châssis titane. Si tu ne zoomes jamais, tu paies 230 € de plus pour du titane — à toi de voir.`,
          `L'iPhone 17 Air, c'est un pari design : 5,5 mm d'épaisseur, un seul capteur arrière, pas de prise en main. Il vise ceux qui veulent un objet beau et léger avant tout. En clair : c'est un iPhone pour les fans de MacBook Air.`,
          `Le vrai tip : si tu hésites entre le 17 et le 17 Pro, pose-toi une seule question — est-ce que tu zoomes souvent en photo ? Si non, le 17 standard est le bon choix.`,
        ],
      },
      {
        id: 'iphone-reconditionne',
        title: `Faut-il acheter un iPhone reconditionné ?`,
        intro: `Oui, sans hésiter — à condition de viser les bons modèles. En ${year}, l'iPhone 15 reconditionné autour de 500 € est le sweet spot : USB-C, Dynamic Island, puce A16 encore véloce, et au moins 4 ans de mises à jour iOS devant lui.`,
        paragraphs: [
          `En dessous de l'iPhone 14, tu risques de perdre le support iOS d'ici 2 ans. L'iPhone 13 reste utilisable, mais c'est un achat court terme.`,
        ],
        tip: `Vérifie toujours le pourcentage de batterie avant d'acheter en reconditionné. En dessous de 85 %, prévois 50-80 € de remplacement.`,
      },
      {
        id: 'quand-acheter-iphone',
        title: `Quand acheter son iPhone au meilleur prix ?`,
        intro: `Apple baisse le prix de l'ancien modèle standard de 100 € à chaque keynote de septembre. Les meilleurs deals apparaissent en novembre (Black Friday) et janvier (soldes d'hiver).`,
        paragraphs: [
          `Si tu vises un iPhone 17, attends novembre — les premières promos Amazon arrivent généralement 6 à 8 semaines après la sortie.`,
        ],
        internalLink: { text: 'Voir le simulateur de prix Apple', href: '/simulateur' },
      },
    ],
    faq: [
      {
        q: `Quel est le meilleur iPhone en ${year} ?`,
        a: `L'iPhone 17 offre le meilleur rapport qualité-prix en ${year} avec son écran 120 Hz, la puce A19 et un prix de 999 €. Pour la photo pro, l'iPhone 17 Pro à 1 229 € est le choix le plus pertinent.`,
      },
      {
        q: `Quelle est la différence entre iPhone 17 et iPhone 17 Pro ?`,
        a: `La principale différence est le téléobjectif 5× du Pro, le châssis titane et 2 Go de RAM supplémentaires. L'écran, la puce A19 et le capteur principal 48 MP sont identiques sur les deux modèles.`,
      },
      {
        q: `L'iPhone 17 Air vaut-il le coup ?`,
        a: `L'iPhone 17 Air (899 €) est le plus fin du marché à 5,5 mm. Il sacrifie le téléobjectif et une partie de l'autonomie. Il convient aux utilisateurs qui privilégient le design et la légèreté avant tout.`,
      },
      {
        q: `Quel iPhone choisir avec un petit budget ?`,
        a: `L'iPhone 16e à 699 € est le meilleur choix neuf en entrée de gamme : puce A18, Face ID, OLED 6,1\", compatible Apple Intelligence. En reconditionné, l'iPhone 15 autour de 500 € reste excellent.`,
      },
      {
        q: `Faut-il attendre l'iPhone 18 ?`,
        a: `L'iPhone 18 est attendu pour septembre ${year}. Si tu peux attendre 6 mois, tu auras le choix entre le nouveau modèle et l'iPhone 17 en promo. Si ton téléphone actuel fonctionne encore, patienter est toujours la meilleure stratégie.`,
      },
      {
        q: `L'iPhone 16e est-il compatible Apple Intelligence ?`,
        a: `Oui. L'iPhone 16e embarque la puce A18 qui est le minimum requis pour Apple Intelligence. Toutes les fonctions IA d'Apple sont disponibles sur ce modèle.`,
      },
      {
        q: `Combien de temps un iPhone est-il mis à jour ?`,
        a: `Apple assure en moyenne 6 à 7 ans de mises à jour iOS. Un iPhone 15 acheté en ${year} recevra des mises à jour au moins jusqu'en 2030.`,
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Mac
// ---------------------------------------------------------------------------
function macContent(year: number): ChoisirProductContent {
  return {
    tldr: [
      `Le MacBook Air M5 à 1 299 € est le Mac parfait pour 90 % des gens — silencieux, léger, 18h d'autonomie.`,
      `Le MacBook Pro M5 ne se justifie que pour le montage vidéo 4K, le dev lourd ou le machine learning — sinon, c'est du budget gaspillé.`,
      `Le Mac mini M4 à 699 € est la meilleure affaire de la gamme si tu as déjà un écran.`,
    ],
    sections: [
      {
        id: 'quel-mac-choisir',
        title: `Quel Mac choisir selon ton usage ?`,
        intro: `En ${year}, Apple vend 6 Mac différents avec des puces M4 et M5. Le bon choix dépend de ton usage réel — pas du benchmark Geekbench.`,
        table: {
          headers: ['Usage', 'Modèle', 'Prix', 'Verdict'],
          rows: [
            ['Quotidien / études', 'MacBook Air 13\" M5', '1 299 €', 'Le choix évident — silencieux, léger, excellent clavier'],
            ['Grand écran portable', 'MacBook Air 15\" M5', '1 599 €', 'Même puissance, 15,3\" pour le confort visuel'],
            ['Montage / dev pro', 'MacBook Pro 14\" M5', '1 999 €', 'Écran XDR, 24h d\'autonomie, ventilation active'],
            ['Station de travail', 'MacBook Pro 16\" M5 Pro', '2 999 €', 'Pour ceux qui poussent les limites — 24 Go RAM, puce M5 Pro'],
            ['Bureau petit budget', 'Mac mini M4', '699 €', 'Le Mac le moins cher — compact et véloce'],
            ['Tout-en-un bureau', 'iMac 24\" M4', '1 699 €', 'Écran 4,5K intégré, design soigné, zéro câble'],
          ],
        },
        internalLink: { text: 'Comparer tous les Mac côte à côte', href: '/comparer/mac' },
      },
      {
        id: 'macbook-air-vs-pro',
        title: `MacBook Air vs MacBook Pro — le vrai choix`,
        intro: `Honnêtement, 90 % des acheteurs de MacBook Pro auraient dû prendre un Air. Le MacBook Air M5 gère sans broncher : navigation, bureautique, retouche photo, développement web, même du montage vidéo léger en 1080p.`,
        paragraphs: [
          `Le MacBook Pro se justifie dans 3 cas précis : montage vidéo 4K en continu, compilation de projets lourds (Xcode, Docker), ou travail en machine learning. Pour tout le reste, le Air est plus léger, plus silencieux (zéro ventilateur), et coûte 700 € de moins.`,
          `Le vrai tip : si tu hésites, prends le Air avec 16 Go de RAM. Tu économises la différence et tu investis dans un bon écran externe.`,
        ],
      },
      {
        id: 'mac-bureau',
        title: `Mac de bureau : Mac mini, iMac ou Mac Studio ?`,
        intro: `Le Mac mini M4 à 699 € est objectivement la meilleure affaire Apple en ${year}. Il fait tourner tout ce qu'un MacBook Air fait, sans l'écran ni la batterie — d'où le prix.`,
        paragraphs: [
          `L'iMac 24\" M4 (1 699 €) convient si tu veux un setup bureau propre sans câbles. Son écran 4,5K Retina est superbe, mais tu paies 1 000 € de plus qu'un mini pour la commodité.`,
          `En clair : si tu as déjà un écran, le Mac mini est le bon choix. Si tu veux tout intégré et que le budget le permet, l'iMac est une valeur sûre.`,
        ],
      },
      {
        id: 'faut-il-attendre-prochain-mac',
        title: `Faut-il attendre le prochain Mac ?`,
        intro: `Les MacBook Air et Pro ont reçu la puce M5 début ${year}. L'iMac et le Mac mini sont encore sur M4. Apple devrait passer l'iMac en M5 courant ${year}.`,
        paragraphs: [
          `Si tu vises un MacBook, achète maintenant — les M5 viennent de sortir. Si tu vises un iMac, patienter quelques mois pour la version M5 peut valoir le coup.`,
        ],
        tip: `Le Mac mini M4 restera pertinent encore 2-3 ans minimum. Pas besoin d'attendre un M5 mini si ton budget est serré.`,
        internalLink: { text: 'Voir le simulateur de prix Apple', href: '/simulateur' },
      },
    ],
    faq: [
      {
        q: `Quel est le meilleur Mac en ${year} ?`,
        a: `Le MacBook Air 13\" M5 à 1 299 € est le meilleur Mac pour la majorité des utilisateurs. Silencieux, léger (1,24 kg), avec 18h d'autonomie et la puissance de la puce M5.`,
      },
      {
        q: `MacBook Air ou MacBook Pro pour un étudiant ?`,
        a: `Le MacBook Air M5 dans presque tous les cas. Il est plus léger, moins cher et silencieux. Le Pro ne se justifie que pour les étudiants en école d'ingénieur ou en audiovisuel avec des besoins de montage 4K.`,
      },
      {
        q: `Le Mac mini M4 peut-il remplacer un iMac ?`,
        a: `Oui. Le Mac mini M4 (699 €) offre les mêmes performances que l'iMac M4 (1 699 €). Il suffit d'ajouter un écran externe. C'est le choix le plus économique si tu as déjà un moniteur.`,
      },
      {
        q: `Quelle RAM choisir pour son Mac en ${year} ?`,
        a: `16 Go suffisent pour 95 % des usages : bureautique, dev web, retouche photo, montage léger. Passe à 24 Go si tu travailles avec des machines virtuelles, Docker, ou du montage vidéo 4K régulier.`,
      },
      {
        q: `Quel Mac pour la programmation ?`,
        a: `Le MacBook Air M5 16 Go gère très bien le développement web (VS Code, Node, Python). Pour la compilation Xcode, les conteneurs Docker ou le machine learning, le MacBook Pro M5 avec 24 Go est plus adapté.`,
      },
      {
        q: `L'iMac M4 vaut-il encore le coup en ${year} ?`,
        a: `Oui, l'iMac M4 reste excellent. La puce M4 est largement suffisante pour un usage bureau. Si tu veux le dernier modèle, Apple devrait sortir un iMac M5 courant ${year}.`,
      },
      {
        q: `256 Go ou 512 Go de stockage ?`,
        a: `256 Go convient si tu utilises le cloud (iCloud, Google Drive). Pour stocker des projets, des photos ou du montage vidéo en local, 512 Go est le minimum confortable. Le surcoût est souvent de 200-230 €.`,
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
const CONTENT_REGISTRY: Record<string, (year: number) => ChoisirProductContent> = {
  iphone: iphoneContent,
  mac: macContent,
}

export function getChoisirContent(
  produit: string,
  year: number,
): ChoisirProductContent | null {
  const factory = CONTENT_REGISTRY[produit]
  return factory ? factory(year) : null
}
