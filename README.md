# Bienvenue sur Notre Projet Académique Cross Native 👋


# Estiam Space

## Description

Ce projet est une application mobile, développée avec React Native (JavaScript), permet aux utilisateurs de partager des publications sous forme d'images et de vidéos. Elle intègre une authentification sécurisée, un système de commentaires et de likes, ainsi qu'une gestion avancée des médias.

## Fonctionnalités Principales

• Authentification : Inscription (Sign Up), connexion (Log In), déconnexion (Log Out) avec Supabase.
<code>app\login.jsx</code>
<code>app\signUp.jsx</code>
<code>contexts\AuthContext.js</code>

• Navigation : Interface fluide et intuitive avec React Navigation.

• Publications : Poster des images et vidéos, aimer et commenter les publications.
<code>services\postService.js</code> 
<code>app\(main)\home.jsx</code> 
<code>app\(main)\newPost.jsx</code> 

• Gestion des publications : Modifier ou supprimer ses propres publications.
• Gestion des commentaires : Supprimer un commentaire (uniquement par son auteur ou le propriétaire du post).
<code>app\(main)\postDetails.jsx</code> 

• Profil utilisateur : Modifier son image, son adresse et son numéro de téléphone.
<code>app\(main)\editProfile.jsx</code> 

• Notifications : Recevoir des notifications sur les interactions.
<code>components\NotificationItem.jsx</code>
<code>app\(main)\notifications.jsx</code>

• Cache : Stocker en cache les données pour une meilleure performance.
<code>lib\supabase.js</code>

• Base de données avec Supabase
<code>lib\supabase.js</code>

## 📦 Installation

1- Cloner le projet

2- npm install

```bash
git clone https://github.com/RifedOthman/EstiamSpace
cd EstiamSpace-main 
npm install
```

## Exécution
Lancez l'application en mode développement :
```sh
npx expo start
```
## APK signé
1 - build APK version
```sh
npm install -g eas-cli 
eas login
eas build:configure
eas build -p android --profile production
```
2- Telecharger L [APK](https://expo.dev/artifacts/eas/khtHjPeYUyXpEz4CGUAjn2.apk) **


## 📸 DEMO 
<img src="GIF1.gif" width="250px" style="margin-right: 20px;">
<img src="2.gif" width="250px">

## Team

- **Rifed Othman**
- **Ghaya Zaabi** 

