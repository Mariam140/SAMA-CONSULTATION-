## Contraintes MVP — AlloDoc

### Persona
Aïssatou Diop, 34 ans, vendeuse au marché, quartiers périphériques de Dakar (Pikine, Guédiawaye), téléphone basique

### Contraintes Non Négociables

#### Contrainte 1
**Critère :** Le MVP DOIT permettre l'envoi et la réception de confirmations de rendez-vous via SMS, sans nécessiter de smartphone ni de connexion internet côté patient
**Origine :** Chapeau Blanc
**Élimine :** Toute interface mobile (appli à télécharger), notification push, ou fonctionnalité reposant sur une connexion data côté patient

#### Contrainte 2
**Critère :** Le MVP NE DOIT PAS dépendre d'une action complexe côté patient pour confirmer ou annuler un rendez-vous
**Origine :** Chapeau Noir
**Élimine :** Tout système de confirmation à plusieurs étapes, menu USSD compliqué, ou nécessité de composer un code ; seule une réponse simple par mot-clé ("OUI" / "NON") est acceptable

#### Contrainte 3
**Critère :** Le MVP DOIT limiter le volume de SMS envoyés au strict nécessaire (un rappel, une confirmation)
**Origine :** Chapeau Noir
**Élimine :** Les relances multiples automatiques, les SMS promotionnels ou informatifs non essentiels, qui alourdiraient le coût pour la structure de santé

### Fonctionnalités Éliminées
- Application mobile téléchargeable → éliminée parce que le persona n'a pas de smartphone ni de connexion data stable (Contrainte 1)
- Confirmation via QR code ou lien web → éliminée parce qu'elle suppose un accès internet que le persona n'a pas (Contrainte 1)
- Système de notifications multiples/push → éliminé parce qu'il alourdit le coût SMS sans bénéfice proportionnel pour l'utilisateur (Contrainte 3)
- Pré-triage IA avancé dès le MVP → éliminé car non prioritaire face au risque de dépendance réseau et pour rester focalisé sur le cœur du HMW (cohérence avec la Synthèse Chapeau Bleu)

### Critère de Validation Final
Le MVP est valide si et seulement si : une patiente équipée d'un simple téléphone basique peut recevoir un rappel SMS avant son rendez-vous et y répondre par un mot-clé unique pour confirmer ou annuler, sans aucune autre action requise.
