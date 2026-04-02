# Architecture du système

## Vue d’ensemble

Le projet repose sur une architecture distribuée simple dans laquelle plusieurs capteurs simulés envoient des messages à un broker MQTT. Le backend reçoit ces messages, applique la logique métier, enregistre les événements dans une base de données et fournit les données au tableau de bord.

## Composants principaux

### 1. Capteurs simulés

Les capteurs simulés représentent des équipements ou sources de données. Ils publient des messages MQTT à intervalles réguliers ou lors d’événements particuliers.

Exemples :

* capteur de température;
* capteur de fumée;
* détecteur de mouvement;
* capteur de porte;
* système de ventilation.

### 2. Broker MQTT

Le broker MQTT agit comme intermédiaire de communication entre les capteurs simulés et le backend. Il reçoit les messages publiés sur différents topics et les transmet aux composants abonnés.

### 3. Backend

Le backend reçoit les messages MQTT, les analyse, vérifie si des seuils critiques sont atteints, détermine si une alerte doit être créée, puis enregistre les événements dans la base de données.

Le backend fournit aussi des API pour permettre au tableau de bord de consulter :

* l’état actuel des équipements;
* l’historique des événements;
* les alertes;
* les incidents détectés.

### 4. Base de données

La base de données conserve les événements reçus, les alertes générées et l’état des composants du système.

### 5. Tableau de bord

Le tableau de bord permet de visualiser l’état du système en temps réel, les alertes actives et l’historique des événements.

## Flux principal

1. un capteur simulé produit une donnée;
2. la donnée est publiée sur un topic MQTT;
3. le backend reçoit le message;
4. le backend valide et traite la donnée;
5. l’événement est enregistré dans la base de données;
6. une alerte est générée si nécessaire;
7. le tableau de bord affiche l’information.

## Exemple de chaîne de traitement

Capteur de fumée → MQTT Broker → Backend → MongoDB → Dashboard → Alerte

## Choix d’architecture

Cette architecture permet :

* une séparation claire des responsabilités;
* une communication asynchrone;
* une bonne extensibilité;
* la simulation d’un environnement proche d’un système SCADA réel;
* l’ajout futur de nouveaux capteurs ou composants.

## Technologies visées

* MQTT / Mosquitto
* NestJS
* MongoDB
* Angular
* Docker
