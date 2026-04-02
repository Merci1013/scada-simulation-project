# Analyse du problème

## Contexte

Les systèmes SCADA sont utilisés pour superviser des équipements et infrastructures à distance. Ils permettent de recevoir des données en temps réel, détecter des anomalies, envoyer des alertes et prendre des décisions rapidement.

## Problème simulé

Le projet simulera un environnement technique comportant plusieurs équipements :

* capteur de température;
* capteur de fumée;
* détecteur de mouvement;
* ventilation;
* alarme;
* porte ou barrière automatisée.

Le système devra être capable de détecter des situations anormales.

## Exemples d'incidents

* Température trop élevée;
* Détection de fumée;
* Panne de ventilation;
* Accès non autorisé;
* Plusieurs capteurs hors ligne;
* Valeurs incohérentes envoyées par un capteur.

## Comportement attendu

Lorsqu’un incident survient :

1. le capteur envoie une donnée via MQTT;
2. le backend reçoit l’événement;
3. l’événement est enregistré dans MongoDB;
4. une alerte est générée;
5. le tableau de bord affiche l’état du système.

## Capteurs simulés

| Capteur     | Valeur normale | Valeur critique         |
| ----------- | -------------- | ----------------------- |
| Température | 18°C à 30°C    | > 45°C                  |
| Fumée       | 0 à 10         | > 50                    |
| Mouvement   | 0 ou 1         | activité anormale       |
| Ventilation | active         | arrêt                   |
| Porte       | fermée/ouvert  | ouverture non autorisée |

## Architecture logique

Capteurs simulés → MQTT → Backend NestJS → MongoDB → Dashboard Angular
