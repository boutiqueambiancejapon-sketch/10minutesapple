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
// iPad
// ---------------------------------------------------------------------------
function ipadContent(year: number): ChoisirProductContent {
  return {
    tldr: [
      `L'iPad Air 11" M3 à 799 € est le meilleur iPad pour la majorité des usages en ${year} — puissant, polyvalent, compatible Apple Pencil Pro.`,
      `L'iPad 11e génération à 369 € est le point d'entrée idéal pour Netflix, les cours et la navigation — inutile de payer plus pour un usage basique.`,
      `L'iPad Pro M5 ne se justifie que pour les créatifs pro : illustration, montage 4K, remplacement de Mac portable.`,
    ],
    sections: [
      {
        id: 'quel-ipad-acheter',
        title: `Quel iPad acheter selon ton usage ?`,
        intro: `En ${year}, Apple vend 6 iPad différents. Le bon choix dépend de ce que tu fais avec — pas de la puce. Un iPad à 369 € fait tourner Netflix exactement pareil qu'un Pro à 1 599 €.`,
        table: {
          headers: ['Usage', 'Modèle', 'Prix', 'Verdict'],
          rows: [
            ['Loisirs / Netflix / cours', 'iPad 11e génération', '369 €', 'Le strict nécessaire — bien fait, pas cher'],
            ['Lecture / déplacement', 'iPad mini 7', '599 €', 'Format 8,3" unique, puce A17 Pro, ultra portable'],
            ['Études / travail', 'iPad Air 11" M3', '799 €', 'Le meilleur compromis puissance-prix du moment'],
            ['Grand écran portable', 'iPad Air 13" M3', '1 099 €', 'Même puce, écran 13" pour le confort visuel'],
            ['Création / illustration', 'iPad Pro 11" M5', '1 199 €', 'Écran OLED XDR, Thunderbolt, Apple Pencil Pro'],
            ['Station créative', 'iPad Pro 13" M5', '1 599 €', 'Le remplaçant de Mac pour les workflows lourds'],
          ],
        },
        internalLink: { text: 'Comparer tous les iPad côte à côte', href: '/comparer/ipad' },
      },
      {
        id: 'ipad-air-vs-pro',
        title: `iPad Air M3 vs iPad Pro M5 — lequel choisir ?`,
        intro: `Honnêtement, 80 % des acheteurs d'iPad Pro auraient dû prendre un Air. L'iPad Air M3 gère la retouche photo, les présentations, la prise de notes avec Apple Pencil Pro et même du montage vidéo léger.`,
        paragraphs: [
          `Le Pro M5 se démarque sur 3 points : l'écran OLED Ultra Retina XDR (contraste et couleurs supérieurs), le port Thunderbolt (transferts rapides vers un disque externe), et la puissance brute de la puce M5 pour le rendu 3D ou le montage multicam.`,
          `Le vrai tip : si tu ne dessines pas avec Procreate ou tu ne montes pas de vidéo 4K, l'Air M3 fait le même travail pour 400 € de moins.`,
        ],
      },
      {
        id: 'ipad-mini-pour-qui',
        title: `L'iPad mini 7 — pour qui ?`,
        intro: `L'iPad mini est le seul iPad qui tient dans une poche de veste. Son écran 8,3" et ses 293 g en font le compagnon idéal pour la lecture, les notes rapides et les déplacements fréquents.`,
        paragraphs: [
          `Sa puce A17 Pro (la même que l'iPhone 15 Pro) lui donne assez de puissance pour le multitâche et les jeux. En clair : ce n'est pas un outil de production, mais c'est le meilleur terminal mobile Apple.`,
        ],
        tip: `L'iPad mini est compatible Apple Pencil Pro — parfait pour les annotations PDF en déplacement ou les croquis rapides.`,
      },
      {
        id: 'ipad-reconditionne',
        title: `Faut-il acheter un iPad reconditionné ?`,
        intro: `L'iPad Air M1 ou M2 reconditionné autour de 450-550 € reste une excellente affaire en ${year}. La puce M1 est encore largement suffisante pour un usage quotidien et sera supportée encore 4-5 ans minimum.`,
        paragraphs: [
          `En dessous de l'iPad Air 5 (M1), tu risques de perdre le support iPadOS rapidement. L'iPad 9e génération en Lightning est à éviter — USB-C uniquement.`,
        ],
        internalLink: { text: 'Voir le simulateur de prix Apple', href: '/simulateur' },
      },
    ],
    faq: [
      {
        q: `Quel est le meilleur iPad en ${year} ?`,
        a: `L'iPad Air 11" M3 à 799 € est le meilleur choix pour la majorité des utilisateurs. Il combine la puce M3, la compatibilité Apple Pencil Pro et un écran Liquid Retina dans un format léger (462 g).`,
      },
      {
        q: `Quel iPad pour un étudiant ?`,
        a: `L'iPad Air 11" M3 est idéal pour un étudiant : prise de notes avec Apple Pencil Pro, multitâche Split View, et assez de puissance pour tenir toute la scolarité. Budget serré ? L'iPad 11e génération à 369 € convient pour les cours et la recherche.`,
      },
      {
        q: `L'iPad mini 7 vaut-il le coup ?`,
        a: `Oui, si tu cherches la portabilité avant tout. L'iPad mini 7 (599 €) est le seul iPad qui tient dans une main. Il excelle pour la lecture, les annotations et les déplacements. Il est moins adapté à la productivité bureau avec son écran 8,3".`,
      },
      {
        q: `Quelle différence entre iPad Air et iPad Pro ?`,
        a: `L'iPad Air M3 a un écran Liquid Retina LCD, l'iPad Pro M5 a un écran OLED Ultra Retina XDR avec un contraste supérieur. Le Pro ajoute Thunderbolt, Face ID avec TrueDepth, et la puce M5 plus puissante. Pour la plupart des usages, la différence ne justifie pas les 400 € d'écart.`,
      },
      {
        q: `Quel iPad pour dessiner avec Procreate ?`,
        a: `L'iPad Pro 11" M5 est le meilleur choix pour le dessin : écran OLED 120 Hz avec ProMotion, Apple Pencil Pro avec retour haptique, et puissance M5 pour les toiles très détaillées. L'iPad Air M3 convient aussi pour le dessin amateur.`,
      },
      {
        q: `L'iPad peut-il remplacer un ordinateur ?`,
        a: `En partie. Avec iPadOS, Stage Manager et un Magic Keyboard, l'iPad Air ou Pro peut gérer email, navigation, documents et retouche photo. Il reste limité pour le développement, les logiciels pro desktop et le multitâche intensif par rapport à un Mac.`,
      },
      {
        q: `128 Go ou 256 Go de stockage pour un iPad ?`,
        a: `128 Go suffisent pour un usage courant (apps, streaming, documents). Si tu stockes des photos, des vidéos ou des fichiers Procreate en local, passe à 256 Go. L'iPad Pro démarre directement à 256 Go.`,
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Apple Watch
// ---------------------------------------------------------------------------
function watchContent(year: number): ChoisirProductContent {
  return {
    tldr: [
      `L'Apple Watch Series 11 à 449 € est le meilleur choix global — capteurs santé dernière génération, écran always-on, charge rapide.`,
      `L'Apple Watch SE 2 à 279 € couvre 80 % des fonctionnalités pour la moitié du prix — le choix malin si tu débutes.`,
      `L'Ultra 2 ne se justifie que pour le sport d'endurance et la plongée — 899 € pour 60h d'autonomie et un GPS double fréquence.`,
    ],
    sections: [
      {
        id: 'quelle-apple-watch-acheter',
        title: `Quelle Apple Watch acheter selon ton profil ?`,
        intro: `En ${year}, Apple vend 3 gammes de montres. Le choix se résume à une question simple : quel est ton usage principal — santé au quotidien, sport sérieux, ou juste les notifications ?`,
        table: {
          headers: ['Profil', 'Modèle', 'Prix', 'Verdict'],
          rows: [
            ['Notifications / début', 'Apple Watch SE 2', '279 €', 'L\'essentiel sans superflu — suivi cardio, chute, crash'],
            ['Quotidien / santé', 'Apple Watch Series 11', '449 €', 'Capteurs complets : ECG, SpO2, apnée, température'],
            ['Fitness / running', 'Apple Watch Series 11', '449 €', 'GPS précis, suivi workout, charge en 30 min'],
            ['Sport extrême / trail', 'Apple Watch Ultra 2', '899 €', '60h d\'autonomie, GPS double fréquence, plongée 100 m'],
          ],
        },
        internalLink: { text: 'Comparer toutes les Apple Watch côte à côte', href: '/comparer/watch' },
      },
      {
        id: 'series-11-vs-se',
        title: `Apple Watch Series 11 vs SE 2 — les vraies différences`,
        intro: `Honnêtement, la Watch SE 2 est une montre connectée très complète pour 279 €. Elle fait le suivi cardio, la détection de chute et de crash, les notifications, et les appels.`,
        paragraphs: [
          `Ce qui manque à la SE : l'écran always-on (tu dois lever le poignet), l'ECG, la détection d'apnée du sommeil, le capteur de température et le SpO2. Si ces fonctions santé comptent pour toi, la Series 11 vaut les 170 € de plus.`,
          `Le vrai tip : si tu veux juste les notifications, le suivi d'activité et la détection de chute, la SE suffit largement. C'est le meilleur rapport qualité-prix de la gamme Watch.`,
        ],
      },
      {
        id: 'apple-watch-ultra-pour-qui',
        title: `L'Apple Watch Ultra 2 — pour qui exactement ?`,
        intro: `L'Ultra 2 à 899 € est un outil de sport, pas un accessoire de mode. Elle se justifie dans 3 cas : trail et ultra-running (60h d'autonomie GPS), plongée (certifiée EN 13319 à 100 m), et randonnée en montagne (GPS double fréquence, sirène d'urgence).`,
        paragraphs: [
          `Pour la course en ville, le fitness en salle ou le suivi santé au quotidien, la Series 11 fait exactement le même travail. En clair : si tu ne fais pas de sport extrême, tu paies 450 € de plus pour un boîtier en titane et un bouton Action.`,
        ],
        tip: `Le bouton Action de l'Ultra permet de lancer un workout, un chrono ou une lampe torche d'un geste. Si tu l'utilises en randonnée ou en course, c'est un vrai plus. Sinon, c'est gadget.`,
      },
      {
        id: 'faut-il-attendre-prochaine-watch',
        title: `Faut-il attendre la prochaine Apple Watch ?`,
        intro: `La Series 11 vient de sortir début ${year} avec des capteurs santé de nouvelle génération. Apple lancera probablement une Series 12 à l'automne ${year}, mais les améliorations devraient être mineures.`,
        paragraphs: [
          `Si tu as une Series 9 ou 10, l'upgrade n'est pas indispensable. Si tu as une Series 7 ou plus ancienne, la Series 11 est un bond en avant significatif. Si tu as une SE 1, passer à la SE 2 ou la Series 11 vaut clairement le coup.`,
        ],
        internalLink: { text: 'Voir le simulateur de prix Apple', href: '/simulateur' },
      },
    ],
    faq: [
      {
        q: `Quelle est la meilleure Apple Watch en ${year} ?`,
        a: `L'Apple Watch Series 11 à 449 € est le meilleur choix global. Elle intègre tous les capteurs santé (ECG, SpO2, température, apnée du sommeil), un écran always-on et la charge rapide en 30 minutes.`,
      },
      {
        q: `Apple Watch SE ou Series 11 ?`,
        a: `La SE 2 (279 €) suffit pour les notifications, le suivi d'activité et la détection de chute. La Series 11 (449 €) ajoute l'écran always-on, l'ECG, le SpO2, la détection d'apnée et le capteur de température. Si ta priorité est la santé, prends la Series 11.`,
      },
      {
        q: `L'Apple Watch Ultra 2 vaut-elle son prix ?`,
        a: `Seulement si tu fais du sport d'endurance (trail, plongée, randonnée longue). Son autonomie de 60h et son GPS double fréquence sont ses vrais atouts. Pour un usage quotidien, la Series 11 fait le même travail pour 450 € de moins.`,
      },
      {
        q: `Quelle taille d'Apple Watch choisir ?`,
        a: `La Series 11 existe en 42 mm et 46 mm. Pour les poignets fins (moins de 16 cm), le 42 mm est plus confortable. Pour les poignets larges ou si tu veux un écran plus lisible, le 46 mm est préférable. L'Ultra 2 n'existe qu'en 49 mm.`,
      },
      {
        q: `Faut-il prendre la version Cellular ?`,
        a: `La version Cellular (+ 100 €) permet de passer des appels et recevoir des messages sans iPhone à proximité. Utile pour le running en solo ou si tu veux laisser ton iPhone à la maison. Sinon, la version GPS suffit.`,
      },
      {
        q: `Combien de temps Apple met-elle à jour l'Apple Watch ?`,
        a: `Apple supporte ses montres environ 5 à 6 ans. Une Apple Watch Series 11 achetée en ${year} recevra des mises à jour watchOS au moins jusqu'en 2031.`,
      },
      {
        q: `L'Apple Watch fonctionne-t-elle avec un téléphone Android ?`,
        a: `Non. L'Apple Watch nécessite un iPhone (8 ou plus récent) pour la configuration et la synchronisation. Si tu es sur Android, regarde du côté de la Samsung Galaxy Watch ou de la Google Pixel Watch.`,
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// AirPods
// ---------------------------------------------------------------------------
function airpodsContent(year: number): ChoisirProductContent {
  return {
    tldr: [
      `Les AirPods Pro 2 à 249 € sont le meilleur choix en ${year} — meilleure ANC Apple, audio spatial personnalisé, IP54.`,
      `Les AirPods 4 ANC à 179 € sont parfaits si tu n'aimes pas les embouts intra — ANC active dans un format ouvert.`,
      `Les AirPods Max à 599 € ne se justifient que pour une écoute audio premium ou un usage bureau intensif en open space.`,
    ],
    sections: [
      {
        id: 'quels-airpods-acheter',
        title: `Quels AirPods acheter selon ton usage ?`,
        intro: `En ${year}, Apple vend 4 modèles d'AirPods. Le bon choix dépend de deux choses : est-ce que tu supportes les embouts intra, et est-ce que tu as besoin de réduction de bruit ?`,
        table: {
          headers: ['Usage', 'Modèle', 'Prix', 'Verdict'],
          rows: [
            ['Quotidien / appels', 'AirPods 4', '149 €', 'Format ouvert, confortable, pas d\'ANC — l\'essentiel'],
            ['Trajets / bureau', 'AirPods 4 ANC', '179 €', 'ANC sans embouts intra — le compromis malin'],
            ['Sport / isolation', 'AirPods Pro 2', '249 €', 'Meilleure ANC, IP54, audio spatial — le top'],
            ['Audio premium', 'AirPods Max', '599 €', 'Over-ear, 20h d\'autonomie, ANC de référence'],
          ],
        },
        internalLink: { text: 'Comparer tous les AirPods côte à côte', href: '/comparer/airpods' },
      },
      {
        id: 'airpods-pro-vs-airpods-4',
        title: `AirPods Pro 2 vs AirPods 4 ANC — lequel choisir ?`,
        intro: `Honnêtement, les deux ont l'ANC. La vraie question c'est : embouts intra ou pas ? Les Pro 2 s'insèrent dans le conduit auditif avec des embouts en silicone. Les AirPods 4 ANC se posent à l'entrée de l'oreille, sans rien insérer.`,
        paragraphs: [
          `Les Pro 2 ont une meilleure isolation passive (embouts) donc une meilleure ANC, une meilleure étanchéité (IP54 vs IPX4) et 1,5h d'autonomie en plus. Si tu fais du sport, les Pro 2 tiennent mieux en place grâce aux embouts.`,
          `Le vrai tip : si les écouteurs intra te gênent après 1h, les AirPods 4 ANC sont le bon choix. Si l'isolation sonore est ta priorité, les Pro 2 sont nettement supérieurs.`,
        ],
      },
      {
        id: 'airpods-max-pour-qui',
        title: `Les AirPods Max — pour qui exactement ?`,
        intro: `Les AirPods Max à 599 € sont un casque over-ear premium, pas des écouteurs. Ils visent un usage sédentaire : bureau en open space, trajets longs, écoute musicale exigeante.`,
        paragraphs: [
          `L'ANC circumaurale des Max est objectivement la meilleure d'Apple — coussins en mousse + ANC active = isolation quasi totale. L'audio spatial avec suivi de la tête est aussi plus convaincant sur un casque que sur des écouteurs.`,
          `En clair : si tu travailles en open space ou tu voyages beaucoup en avion, les Max valent leur prix. Si tu veux des écouteurs polyvalents pour le sport et le quotidien, les Pro 2 sont le meilleur choix pour 350 € de moins.`,
        ],
        tip: `Les AirPods Max ne sont pas étanches. Pour le sport, reste sur les Pro 2 (IP54) ou les AirPods 4 (IPX4).`,
      },
      {
        id: 'airpods-entretien',
        title: `Combien de temps durent les AirPods ?`,
        intro: `La batterie d'un AirPod perd environ 20 % de capacité après 2 ans d'usage quotidien. Après 3-4 ans, l'autonomie chute significativement. C'est le principal défaut des écouteurs true wireless.`,
        paragraphs: [
          `Apple propose un remplacement de batterie à 89 € par écouteur (Pro) ou 79 € (AirPods 4). Autant acheter une nouvelle paire à ce prix. C'est un produit consommable — prévois un renouvellement tous les 3 ans.`,
        ],
        internalLink: { text: 'Voir le simulateur de prix Apple', href: '/simulateur' },
      },
    ],
    faq: [
      {
        q: `Quels sont les meilleurs AirPods en ${year} ?`,
        a: `Les AirPods Pro 2 à 249 € sont le meilleur choix global : meilleure ANC d'Apple en format intra, audio spatial personnalisé, IP54, et 5,5h d'autonomie. Ils conviennent à la majorité des usages.`,
      },
      {
        q: `AirPods 4 ou AirPods Pro 2 ?`,
        a: `Les AirPods 4 ANC (179 €) conviennent si tu n'aimes pas les embouts intra-auriculaires. Les Pro 2 (249 €) offrent une meilleure isolation, une meilleure étanchéité (IP54) et plus d'autonomie. Pour le sport, les Pro 2 sont clairement supérieurs.`,
      },
      {
        q: `Les AirPods Max valent-ils 599 € ?`,
        a: `Seulement pour un usage sédentaire premium : bureau en open space, longs trajets, ou écoute musicale exigeante. L'ANC over-ear est la meilleure d'Apple. Pour un usage polyvalent, les Pro 2 à 249 € sont un bien meilleur investissement.`,
      },
      {
        q: `Quel modèle d'AirPods pour le sport ?`,
        a: `Les AirPods Pro 2 (IP54) pour la course et le fitness en salle. Ils tiennent bien en place grâce aux embouts silicone. Les AirPods 4 (IPX4) conviennent pour du sport léger mais tiennent moins bien dans l'oreille.`,
      },
      {
        q: `Les AirPods sont-ils compatibles avec Android ?`,
        a: `Oui, tous les AirPods fonctionnent en Bluetooth avec un téléphone Android. Mais tu perds l'appairage automatique, l'audio spatial avec suivi de la tête, et Siri. L'ANC fonctionne normalement.`,
      },
      {
        q: `Quelle est l'autonomie des AirPods ?`,
        a: `AirPods 4 : 5h (30h avec boîtier). AirPods 4 ANC : 4h (24h avec boîtier). AirPods Pro 2 : 5,5h (30h avec boîtier). AirPods Max : 20h. Tous se rechargent en USB-C.`,
      },
      {
        q: `Faut-il attendre les AirPods Pro 3 ?`,
        a: `Les AirPods Pro 3 sont attendus courant ${year}. Si tes écouteurs actuels fonctionnent encore, patienter peut valoir le coup. Sinon, les Pro 2 restent un excellent achat — Apple les supportera encore plusieurs années.`,
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
  ipad: ipadContent,
  watch: watchContent,
  airpods: airpodsContent,
}

export function getChoisirContent(
  produit: string,
  year: number,
): ChoisirProductContent | null {
  const factory = CONTENT_REGISTRY[produit]
  return factory ? factory(year) : null
}
