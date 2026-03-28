# Prompt d'initialisation — Nouveau site depuis 10min-template

Copier-coller ce prompt à Claude Code connecté au nouveau repo (fork de 10min-template).

---

## Le prompt

```
Tu vas initialiser ce site à partir du template 10min.

## Instructions

1. Lis `docs/TEMPLATE-SPEC.md` pour comprendre l'architecture
2. Lis `docs/CMS-SPEC.md` pour comprendre le CMS
3. Pose-moi les questions ci-dessous UNE PAR UNE
4. Remplis `niche.config.ts` avec mes réponses
5. Applique le config à tout le site
6. Rédige le premier article
7. Commit et push

## Questions à poser (dans cet ordre)

### Bloc 1 — Identité
1. Quel est le sujet/niche du site ? (ex: voyage, cartes de crédit, aspirateurs, crypto)
2. Quel nom de domaine ? (ex: 10minutesvoyage.com)
3. Tagline en une phrase ? (ex: "Trouvez votre destination en 10 minutes")

### Bloc 2 — Vocabulaire
Sur base de la niche, propose-moi et demande validation :
- entity / entities (ex: "destination" / "destinations")
- entityVerb (ex: "explorer", "acheter", "souscrire")
- dealWord (ex: "bons plans", "deals", "offres")
- rotatingWords pour le hero (ex: ["vol", "hôtel", "road trip", "croisière"])
- subtitle du hero

### Bloc 3 — Catégories
4. Quelles catégories pour ce site ? (ex: Europe, Asie, Amériques)
   Pour chaque catégorie je proposerai une couleur accent.

### Bloc 4 — Outils
5. Quels outils activer ?
   - Quiz : quelle question principale ? quels critères ?
   - Comparateur : quels critères de comparaison ?
   - Simulateur : quel calcul ?

### Bloc 5 — Auteur
6. Qui rédige ?
   - Prénom
   - Titre/rôle
   - Bio (2 phrases)
   - Ton (3 adjectifs)
   - Formulations récurrentes (ex: "Honnêtement,")
   - No-go (formulations interdites)

### Bloc 6 — DA
7. Ambiance visuelle ? (3 adjectifs, ex: premium, sombre, tech)
   Je proposerai une palette et des fonts adaptées.

### Bloc 7 — Affiliation
8. Tag affilié Amazon ? (ex: monsite-21)
9. Autres boutiques affiliées ? (Fnac, Booking, etc.)

### Bloc 8 — Premier article
10. Quel sujet pour le premier article ? (calibre le template blog)

## Après les réponses

1. Remplir `niche.config.ts` avec toutes les valeurs
2. Appliquer à `app/globals.css` (palette)
3. Appliquer à `app/layout.tsx` (fonts, metadata)
4. Appliquer à tous les composants (home, nav, footer, outils)
5. Appliquer à `cms.config.ts` (catégories, repo)
6. Appliquer à `lib/utils/affiliate.ts` (tag)
7. Créer `docs/AUTHOR-[slug].md`
8. Créer `docs/SEO-GEO-REDACTION.md` adapté à la niche
9. Mettre à jour `CLAUDE.md`
10. Mettre à jour `content/settings.yaml` (nav)
11. Mettre à jour `content/pages/home.yaml`
12. Supprimer les fichiers `_example.*`
13. Rédiger le premier article (800+ mots, 6+ FAQ, composants MDX)
14. `tsc --noEmit` + `next lint`
15. Commit et push
```

---

## Exemple de session

**Claude Code** : Quel est le sujet du site ?
**Toi** : Les meilleures cartes de crédit
**Claude Code** : Quel nom de domaine ?
**Toi** : 10minutescarte.com
**Claude Code** : Tagline ?
**Toi** : Trouvez la meilleure carte en 10 minutes

**Claude Code** : Sur base de "cartes de crédit", je propose :
- entity : "carte" / entities : "cartes"
- entityVerb : "souscrire"
- dealWord : "offres"
- rotatingWords : ["carte Visa", "Mastercard", "Amex", "néobanque", "carte premium"]
- subtitle : "Comparateur indépendant, quiz personnalisé et simulation de frais — tout pour choisir la bonne carte."
Tu valides ou tu modifies ?

**Toi** : Valide

**Claude Code** : Quelles catégories ?
**Toi** : Visa, Mastercard, Amex, Néobanques, Cartes premium

**Claude Code** : Je propose ces couleurs :
- visa → #3D9BFF (bleu)
- mastercard → #FF3D57 (rouge)
- amex → #3DFFC0 (vert)
- neobanques → #7B61FF (violet)
- premium → #FFD23F (or)
Tu valides ?

*(etc.)*

---

## Résultat attendu

Après la session (~15 min de questions + ~30 min de code), le site est :
- Buildable (`next build` passe)
- Déployable sur Vercel
- CMS fonctionnel sur `/admin`
- 1 article publié
- DA appliquée
- Outils configurés (quiz, comparateur, simulateur)
- SEO prêt (sitemap, robots, JSON-LD, auteur)

## Env vars à configurer sur Vercel après déploiement

```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=<PAT GitHub>
BLOB_READ_WRITE_TOKEN=<auto via Vercel Blob>
GITHUB_CMS_CLIENT_ID=<OAuth App>
GITHUB_CMS_CLIENT_SECRET=<OAuth App secret>
BFL_API_KEY=<Flux pour génération images>
```
