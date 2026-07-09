## Hypothèses de Validation — AlloDoc

### HMW Définitif
"Comment pourrions-nous permettre aux patients des quartiers périphériques de Dakar de confirmer ou annuler un rendez-vous médical par SMS, afin de réduire les déplacements inutiles et sécuriser leur revenu journalier ?"

### Hypothèses CRITIQUES
*(Si fausse → le MVP ne fonctionne pas)*

#### Hypothèse C1
**Affirmation :** Nous croyons que les patients des quartiers périphériques de Dakar répondront à un SMS de rappel pour confirmer ou annuler leur rendez-vous.
**Indicateur :** Nous le saurons si au moins 60% des patients contactés répondent au SMS dans les 24h suivant son envoi.
**Méthode :** Test terrain — envoyer des SMS de rappel à un échantillon réel de patients d'un centre de santé partenaire et suivre le taux de réponse
**Qui valide :** Responsable Impact, avec le centre de santé pilote
**Délai S3 :** Semaine 1

#### Hypothèse C2
**Affirmation :** Nous croyons que le réseau télécom local est suffisamment fiable dans les zones ciblées pour garantir la réception des SMS.
**Indicateur :** Nous le saurons si moins de 10% des SMS envoyés échouent ou n'atteignent pas le destinataire.
**Méthode :** Test terrain — envoyer une série de SMS test à des numéros réels de patients dans plusieurs quartiers (Pikine, Guédiawaye) et vérifier les accusés de réception
**Qui valide :** Dev UI (No-Code), avec l'API SMS utilisée
**Délai S3 :** Semaine 1

### Hypothèses IMPORTANTES
*(Si fausse → expérience dégradée mais MVP utilisable)*

#### Hypothèse I1
**Affirmation :** Nous croyons que le centre de santé est prêt à assumer le coût récurrent des SMS pour ce service.
**Indicateur :** Nous le saurons si le centre de santé partenaire confirme un budget mensuel dédié, même minime, pour l'envoi des SMS.
**Méthode :** Entretien direct avec le responsable administratif du centre de santé pilote
**Qui valide :** Chef de Produit (PM)
**Délai S3 :** Semaine 1

#### Hypothèse I2
**Affirmation :** Nous croyons qu'un message simple avec réponse par mot-clé ("OUI" / "NON") est compréhensible sans explication préalable pour la majorité des patients.
**Indicateur :** Nous le saurons si au moins 70% des patients testés répondent correctement au format attendu sans aide extérieure.
**Méthode :** Observation terrain — soumettre le message test à un petit groupe de patients réels et observer leur réponse
**Qui valide :** Master Prompt Engineer, avec Responsable Impact
**Délai S3 :** Semaine 2

### Hypothèses SECONDAIRES
*(À valider après le MVP)*

#### Hypothèse S1
**Affirmation :** Nous croyons qu'un système de liste d'attente automatique (notification au patient suivant en cas d'annulation) apporterait une valeur ajoutée perçue par les centres de santé.
**Indicateur :** Nous le saurons si le centre de santé pilote exprime un intérêt explicite pour cette fonctionnalité lors d'un retour d'expérience après la démo S6.
**Méthode :** Entretien de retour d'expérience post-démo
**Qui valide :** Chef de Produit (PM)
**Délai S3 :** Après la démo S6

### Priorité de Validation S3
La première chose à tester en S3 : Envoyer un SMS de rappel test à un petit groupe réel de patients pour valider simultanément le taux de réponse (C1) et la fiabilité du réseau (C2), les deux hypothèses qui conditionnent la viabilité même du MVP.
