# ProjetReactJS

## Afin de lancer le projet, il faut suivre les étapes suivantes :
- Côté back-end :
  - Se rendre dans le dossier `back-end` (`cd back`) et lancer la commande `npm install`
  - Exécuter la commande `npm start` pour lancer le serveur sur le port 3001
- Côté front-end :
  - Se rendre dans le dossier `front-end` (`cd front`) et lancer la commande `npm install`
  - Exécuter la commande `npm start` pour lancer le serveur sur le port 3000
- Pour vous connecter :
  - identifiants : admin
  - mot de passe : admin
    
## Fonctionnalités :
- Home page qui contient la liste des pixelboards, le nombre de pixelboards crées en tout.
- En cliquant sur un pixelboard, on est redirigé vers une page qui contient le pixelboard en question.
- Depuis le pixelboard, on peut :
  - Ajouter un pixel en cliquant sur une case vide
  - remplacer un pixel en cliquant sur un pixel déjà existant
  - Il y a un délai de 5 secondes entre chaque ajout de pixel, sinon l'api renvoie une erreur.

- En cliquant sur le bouton **admin** de la home page, on est redirigé vers une page qui contient des fonctionnalités admin telles que le fait de créer un pixelboard.
- Depuis la home page on peut se rendre sur la page de profil de l'utilisateur, qui nous indique le nombre de pixels posés en tout et le nombre de boards auquel il a participé.
- Un utilisateur peut créer un compte, se connecter et se déconnecter. Un JWT est utilisé pour gérer les sessions.
- Un thème sombre est disponible pour les utilisateurs.

## Le travail a été réalisé par :
- **Alexis MALATTIA** : Création des pixelboards, des utilisateurs, gestion de l'authentification, création des modèles de données, toutes les actions associées au pixelboard, et aux users. Consitution de la logique de création et optimisation des pixelboards (séparation en chunks pour optimiser l'accès aux données), avec SYLVAIN
- **Michael GODART** : Création des interfaces côté client pour la page admin, la page profil, la homepage complète, et la page de création d'un pixelboard.
- **Sylvain ROME** : Création du thème sombre, gestion des interfaces graphiques, tentative de mise en place des web sockets, aide à la consitution de la logique de création et optimisation des pixelboards.
- **Elodie BANTOS**: Tentative de mise en place d'une homepage, non implémentée dans la version finale (revue complètement par Michael GODART). Absente sur une grande partie du projet.

## Les difficultés rencontrées :
- Mise en place des websockets : nous n'avons pas réussi à les mettre en place, nous avons donc décidé de ne pas les implémenter dans la version finale.
- Manque de travail d'une membre de l'équipe (participation faible, à voir si cela est dû à des problèmes personnels ou non).

## La vidéo :
- [Lien de la vidéo](https://youtu.be/gOSvewpFbWA)
