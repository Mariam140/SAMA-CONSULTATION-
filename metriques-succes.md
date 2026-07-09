## Métriques de Succès — AlloDoc

### MVP
Interface web de gestion des rendez-vous + rappel SMS avec confirmation par mot-clé

### Métrique Nord
**Indicateur :** Taux de rendez-vous confirmés à l'avance par SMS parmi les rendez-vous programmés
**Valeur cible à 30 jours :** 60% des rendez-vous confirmés via SMS avant la date prévue
**Comment mesurer :** Compter manuellement, dans le tableau de bord web, le nombre de rendez-vous marqués "confirmé" divisé par le nombre total de rendez-vous programmés sur la période

### Métriques de Progression

#### Métrique P1
**Indicateur :** Nombre de patients ayant répondu au SMS de rappel (quelle que soit la réponse)
**Valeur cible à 30 jours :** 70% de taux de réponse au SMS envoyé
**Comment mesurer :** Compter les réponses reçues (OUI/NON) divisées par le nombre de SMS envoyés, directement depuis le journal de messages

#### Métrique P2
**Indicateur :** Nombre de déplacements évités grâce à une annulation communiquée à l'avance
**Valeur cible à 30 jours :** Au moins 10 déplacements évités sur le mois
**Comment mesurer :** Compter les rendez-vous annulés par SMS avant la date, en comparant avec l'historique des annulations tardives sur place avant le lancement du MVP

#### Métrique P3
**Indicateur :** Nombre de centres de santé partenaires utilisant activement le tableau de bord
**Valeur cible à 30 jours :** 1 centre de santé pilote utilisant l'outil quotidiennement
**Comment mesurer :** Observation directe sur le terrain et vérification des connexions/mises à jour dans l'interface web

### Métriques d'Alerte

#### Alerte A1
**Signal :** Taux de réponse aux SMS de rappel très faible
**Seuil :** Moins de 30% de réponses sur une semaine
**Action corrective :** Vérifier la formulation du SMS avec le Master Prompt Engineer et tester un message plus court ou plus clair auprès de quelques patients

#### Alerte A2
**Signal :** Aucune réduction des rendez-vous manqués malgré les rappels envoyés
**Seuil :** Taux de no-show inchangé par rapport à la période avant le MVP après 2 semaines d'utilisation
**Action corrective :** Interroger directement le centre de santé et quelques patients pour identifier la cause (mauvais horaire d'envoi, message peu clair, réseau défaillant)

### Tableau de Bord S6
À la démo S6, nous présenterons ces 3 chiffres :
1. Métrique Nord — taux de rendez-vous confirmés par SMS (valeur réelle vs 60% cible)
2. Métrique P1 — taux de réponse au SMS de rappel (valeur réelle vs 70% cible)
3. Alerte A1 — déclenchée ou non (taux de réponse sous les 30%)
