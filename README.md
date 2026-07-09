# GET409 — SAMA CONSULTATION

## Notre projet — GreenSprint Santé

SAMA CONSULTATION est une solution simple qui permet aux patients des quartiers périphériques de Dakar (Pikine, Guédiawaye) de confirmer leurs rendez-vous médicaux par SMS, sans smartphone ni connexion internet. En s'appuyant sur un rappel fiable et une confirmation de disponibilité avant le déplacement, le projet vise à réduire les trajets inutiles et les pertes de revenu journalier pour les familles. Une couche IA (Dify) viendra ensuite enrichir l'expérience avec un pré-triage intelligent des demandes de consultation.

## Notre équipe

| Prénom Nom    | Rôle | GitHub        |
|---------------|---|---------------|
|Faly Sène   | Chef de Produit (PM) | @Faly316      |
| Fatoumata Binta SALL | Master Prompt Engineer | @Fatima-sall1 |
| Mariama SALL  | Dev UI (No-Code) | @Mariam140    |
|  Codou THIAM  | Responsable Impact | @codou81      |
| Mame Yacine Touré | Co-Chef de Produit (support PM) | @samira-06    |
| Tabara Sene   | Co-Responsable Impact | @tabarasene  |

## Notre défi

- **Secteur :** Santé — gestion des rendez-vous médicaux
- **Zone cible :** Quartiers périphériques de Dakar (Pikine, Guédiawaye)
- **Énoncé HMW :** *Comment pourrions-nous permettre aux patients des quartiers périphériques de Dakar de confirmer un rendez-vous médical par SMS, afin d'éviter les déplacements inutiles ?*

## Persona — Aïssatou Diop

34 ans, vendeuse au marché de Pikine, mère de famille. Elle doit régulièrement emmener son enfant en consultation pédiatrique et perd une demi-journée de vente si le médecin est absent ou en retard. Équipée d'un téléphone basique, à l'aise avec les SMS mais pas avec une appli web classique.

*Carte d'empathie complète : voir `carte-empathie.md`*

## Architecture prévue

| Côté | Canal | Rôle |
|---|---|---|
| Patiente (utilisatrice finale) | SMS / USSD | Confirme, annule ou reçoit un rappel de rendez-vous |
| Centre de santé (gestionnaire) | Interface web (MVP Bolt.new) | Tableau de bord des rendez-vous, disponibilités, statuts |
| Couche intelligente | Agent Dify | Fait le lien SMS ↔ interface web, pré-triage des demandes |

## Livrables

- [ ] Fiche équipe soumise
- [x] Carte d'empathie
- [x] Énoncé HMW validé
- [ ] Dépôt GitHub public créé et collaborateurs invités
- [ ] Espace de travail Dify créé
- [ ] MVP web déployé (Séance 6)
- [ ] Agent Dify connecté (Séance 6)

## Prochaines étapes (implémentation)

1. Créer le dépôt public `GET409-SantePikine` sur GitHub, initialiser avec ce README, inviter tous les membres en `Write`
2. Créer l'espace de travail Dify `GET409-SantePikine`
3. Générer une première interface web (MVP) avec Bolt.new : tableau de bord simple listant les rendez-vous (patient, créneau, statut)
4. Construire l'agent Dify qui reçoit un message entrant (simulant un SMS) et met à jour le statut du rendez-vous
5. Relier les deux : l'agent Dify alimente l'interface web en données
