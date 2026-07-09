## Backlog S3 — AlloDoc

### HMW Définitif
"Comment pourrions-nous permettre aux patients des quartiers périphériques de Dakar de confirmer ou annuler un rendez-vous médical par SMS, afin de réduire les déplacements inutiles et sécuriser leur revenu journalier ?"

### User Stories MUST
*(À construire obligatoirement en S3)*

#### US-01
**Story :** En tant qu'Aïssatou, je veux recevoir un SMS de rappel 24h avant mon rendez-vous afin de savoir à l'avance qu'il est bien maintenu
**Priorité :** MUST
**Outil :** SMS API
**Effort :** moyen
**Adresse :** Pain Reliever — rappel SMS 24h avant + confirmation par mot-clé
**Critère d'acceptation :** Un SMS de rappel est envoyé automatiquement 24h avant chaque rendez-vous enregistré dans le système

#### US-02
**Story :** En tant qu'Aïssatou, je veux pouvoir confirmer ou annuler mon rendez-vous en répondant simplement "OUI" ou "NON" afin de ne pas avoir à faire une démarche compliquée
**Priorité :** MUST
**Outil :** SMS API
**Effort :** moyen
**Adresse :** Pain Reliever — envoi du rappel suffisamment en amont pour laisser une marge de réaction
**Critère d'acceptation :** La réponse du patient met à jour automatiquement le statut du rendez-vous (confirmé / annulé) visible dans le tableau de bord

#### US-03
**Story :** En tant que centre de santé, je veux consulter un tableau de bord web listant tous les rendez-vous et leur statut afin de gérer mon planning sans dépendre du papier
**Priorité :** MUST
**Outil :** Bolt.new
**Effort :** moyen
**Adresse :** Contrainte MVP — interface web de gestion des rendez-vous (obligatoire selon contraintes-mvp.md)
**Critère d'acceptation :** L'interface affiche la liste des rendez-vous avec patient, créneau, et statut (en attente / confirmé / annulé), mise à jour en temps réel après chaque réponse SMS

### User Stories SHOULD
*(À construire si le temps le permet)*

#### US-04
**Story :** En tant que centre de santé, je veux qu'un patient en liste d'attente soit notifié automatiquement si un créneau se libère afin de ne pas perdre ce rendez-vous
**Priorité :** SHOULD
**Outil :** Dify
**Effort :** élevé
**Adresse :** Gain Creator — liste d'attente automatique en cas d'annulation
**Critère d'acceptation :** Dès qu'un rendez-vous passe au statut "annulé", un SMS est envoyé automatiquement au patient suivant en liste d'attente

#### US-05
**Story :** En tant qu'Aïssatou, je veux disposer d'une ligne dédiée pour signaler une urgence afin d'obtenir un créneau prioritaire
**Priorité :** SHOULD
**Outil :** SMS API
**Effort :** moyen
**Adresse :** Fonctionnalité issue du Chapeau Vert, non reliée à un Pain Reliever tracé — à valider en interview S3 (cf. vpc-connections.md)
**Critère d'acceptation :** Un mot-clé spécifique ("URGENT") déclenche une alerte visible en priorité dans le tableau de bord du centre de santé

### User Stories COULD
*(Roadmap post-MVP)*

#### US-06
**Story :** En tant que centre de santé, je veux qu'un agent IA pré-trie les demandes de consultation afin de mieux orienter les patients avant leur rendez-vous
**Priorité :** COULD
**Outil :** Dify
**Effort :** élevé
**Adresse :** Évolution prévue en Séance 3 selon la Synthèse Chapeau Bleu, non prioritaire pour le MVP initial
**Critère d'acceptation :** L'agent Dify propose une catégorisation basique (urgent / standard) à partir des réponses du patient, sans encore l'intégrer au flux SMS principal

### Sprint S3
**Semaine 1 :** US-01, US-02, US-03 — cœur du MVP (rappel SMS, confirmation par mot-clé, tableau de bord)

**Semaine 2 :** US-04 et US-05 si le temps le permet, en priorisant US-04 (liste d'attente) qui a un Gain Creator tracé, avant US-05 dont le Pain Reliever reste à valider

**Démo S6 :** US-01, US-02, US-03 — le parcours complet doit être démontrable en live : envoi d'un SMS de rappel, réponse du patient, mise à jour visible dans le tableau de bord
