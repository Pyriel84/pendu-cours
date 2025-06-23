// JavaScript pendu Gamer

// Mots à deviner
const mots = ["Gamer", "Jouer", "Console", "Manette", "Écran", "Clavier", "Souris",
    "Casque", "Micro", "Stream", "Twitch", "YouTube", "Discord", "Chat",
    "Équipe", "Clan", "Guilde", "Partie", "Match", "Tournament", "Compétition",
    "Victoire", "Défaite", "Score", "Niveau", "Expérience", "Boss", "Mission",
    "Quête", "Objectif", "Héros", "Personnage", "Avatar", "Skin", "Cosmétique",
    "Arme", "Équipement", "Armure", "Potion", "Magie", "Sort", "Compétence",
    "Talent", "Build", "Stratégie", "Tactique", "Combat", "Bataille", "Guerre",
    "Survie", "Exploration", "Aventure", "Histoire", "Scénario", "Monde",
    "Univers", "Carte", "Zone", "Donjon", "Raid", "Instance", "Serveur",
    "Lag", "Ping", "FPS", "Graphics", "Qualité", "Résolution", "Texture",
    "Shader", "RTX", "HDR", "VSync", "Optimisation",
    "Bug", "Glitch", "Patch", "Update", "DLC", "Expansion", "Mod", "Cheat",
    "Speedrun", "Farming", "Grinding", "Camping", "Rushing", "Ganking",
    "Respawn", "Spawn", "Checkpoint", "Sauvegarde", "Loading", "Menu",
    "Settings", "Options", "Contrôles", "Mapping", "Macro", "Hotkey",
    "Interface", "HUD", "Minimap", "Inventaire", "Shop", "Craft", "Trade",
    "Économie", "Monnaie", "Gold", "Credits", "Points", "Tokens", "Gems",
    "Lootbox", "Gacha", "RNG", "Drop", "Rare", "Épique", "Légendaire",
    "Noob", "Pro", "Tryhard", "Casual", "Hardcore", "Élite", "Master",
    "Rank", "Ranking", "Ladder", "Leaderboard", "Elo", "MMR", "Tier",
    "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Champion", "Grandmaster",
    "Streamer", "Viewer", "Follower", "Subscriber", "Donation", "Bits",
    "Emote", "Meme", "Clip", "Highlight", "Montage", "Compilation",
    "Esport", "Pro-player", "Coach", "Analyst", "Caster", "Commentator",
    "Sponsor", "Organisation", "Team", "Roster", "Transfer", "Draft",
    "PC", "PlayStation", "Xbox", "Nintendo", "Switch", "Steam", "Epic",
    "Origin", "Uplay", "GOG", "Mobile", "Android", "iOS", "Cloud",
    "RPG", "FPS", "RTS", "MOBA", "MMO", "Battle-Royale", "Sandbox",
    "Platformer", "Racing", "Fighting", "Puzzle", "Horror", "Indie",
    "AAA", "Studio", "Publisher", "Developer", "Early-Access", "Beta",
    "Alpha", "Demo", "Trailer", "Teaser", "Reveal", "Announcement",
    "Review", "Rating", "Metacritic", "Steam-Reviews", "Recommendation",
    "Wishlist", "Preorder", "Release", "Launch", "Day-One", "Season-Pass"];

// Variables du jeu
let motChoisi = "";
let lettresDevinees = [];
let nombreErreurs = 0;

// Éléments DOM
const elementMot = document.getElementById("word");
const elementMessage = document.getElementById("message");
const saisieLettre = document.getElementById("letterInput");
const boutonDeviner = document.getElementById("guessButton");
const boutonReset = document.getElementById("resetButton");
const imagePendu = document.getElementById("penduImage");
const boutonCommencer = document.getElementById("startButton");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Images du pendu
const imagesPendu = [
    // pendu0.png - juste la potence
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPC9zdmc+",
    // pendu1.png - + tête
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPGNpcmNsZSBjeD0iMTM1IiBjeT0iODAiIHI9IjE1IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K",
    // pendu2.png - + corps
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPGNpcmNsZSBjeD0iMTM1IiBjeT0iODAiIHI9IjE1IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8bGluZSB4MT0iMTM1IiB5MT0iOTUiIHgyPSIxMzUiIHkyPSIxNTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==",
    // pendu3.png - + bras gauche
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPGNpcmNsZSBjeD0iMTM1IiBjeT0iODAiIHI9IjE1IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8bGluZSB4MT0iMTM1IiB5MT0iOTUiIHgyPSIxMzUiIHkyPSIxNTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSIxMTAiIHgyPSIxMTAiIHkyPSIxMzAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==",
    // pendu4.png - + bras droit
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPGNpcmNsZSBjeD0iMTM1IiBjeT0iODAiIHI9IjE1IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8bGluZSB4MT0iMTM1IiB5MT0iOTUiIHgyPSIxMzUiIHkyPSIxNTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSIxMTAiIHgyPSIxMTAiIHkyPSIxMzAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSIxMTAiIHgyPSIxNjAiIHkyPSIxMzAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==",
    // pendu5.png - + jambe gauche
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPGNpcmNsZSBjeD0iMTM1IiBjeT0iODAiIHI9IjE1IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8bGluZSB4MT0iMTM1IiB5MT0iOTUiIHgyPSIxMzUiIHkyPSIxNTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSIxMTAiIHgyPSIxMTAiIHkyPSIxMzAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSIxMTAiIHgyPSIxNjAiIHkyPSIxMzAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSIxNTAiIHgyPSIxMTAiIHkyPSIxODAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==",
    // pendu6.png - + jambe droite (complet - game over)
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjhmOGY4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM4QjQ1MTMiLz4KPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTcwIiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8cmVjdCB4PSIxMzAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPGNpcmNsZSBjeD0iMTM1IiBjeT0iODAiIHI9IjE1IiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgo8bGluZSB4MT0iMTI4IiB5MT0iNzMiIHgyPSIxNDIiIHkyPSI4NyIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjE0MiIgeTE9IjczIiB4Mj0iMTI4IiB5Mj0iODciIHN0cm9rZT0iI0ZGMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMzUiIHkxPSI5NSIgeDI9IjEzNSIgeTI9IjE1MCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjEzNSIgeTE9IjExMCIgeDI9IjExMCIgeTI9IjEzMCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjEzNSIgeTE9IjExMCIgeDI9IjE2MCIgeTI9IjEzMCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjEzNSIgeTE9IjE1MCIgeDI9IjExMCIgeTI9IjE4MCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjEzNSIgeTE9IjE1MCIgeDI9IjE2MCIgeTI9IjE4MCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPHRleHQgeD0iMTAwIiB5PSIyMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGMDAwMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkdhbWUgT3ZlciE8L3RleHQ+Cjwvc3ZnPgo="
];

// Fonction pour choisir un mot aléatoire
function choisirMot() {
    const indexAleatoire = Math.floor(Math.random() * mots.length);
    motChoisi = mots[indexAleatoire].toUpperCase();
    lettresDevinees = [];
    nombreErreurs = 0;
    afficherMot();
    elementMessage.textContent = "Devinez le mot !";
}

// Fonction pour afficher le mot avec les lettres devinées
function afficherMot() {
    const motAffiche = motChoisi.split('').map(lettre => {
        return lettresDevinees.includes(lettre) ? lettre : '_';
    }).join(' ');
    elementMot.textContent = motAffiche;
}

// Fonction pour afficher les lettres devinées
function mettreAJourLettresDevinees() {
    const texteLettresDevinees = lettresDevinees.length > 0 ? lettresDevinees.join(', ') : "Aucune";
    document.getElementById("guessedLetters").textContent = `Lettres devinées : ${texteLettresDevinees}`;
}

// Fonction pour vérifier la lettre saisie
function verifierLettre() {
    const lettre = saisieLettre.value.toUpperCase();
    saisieLettre.value = '';

    if (lettre.length !== 1 || !alphabet.includes(lettre) || lettresDevinees.includes(lettre)) {
        elementMessage.textContent = lettresDevinees.includes(lettre)
            ? "Vous avez déjà deviné cette lettre."
            : "Veuillez entrer une lettre de l'alphabet.";
        return;
    }

    lettresDevinees.push(lettre);
    mettreAJourLettresDevinees();

    // Vérifier si la lettre est dans le mot choisi
    if (motChoisi.includes(lettre)) {
        afficherMot();
        if (!elementMot.textContent.includes('_')) {
            elementMessage.textContent = "Félicitations, vous avez deviné le mot !";
            boutonDeviner.disabled = true;
            saisieLettre.disabled = true;
        } else {
            elementMessage.textContent = "Bonne lettre !";
        }
    } else {
        nombreErreurs++;
        imagePendu.src = imagesPendu[nombreErreurs];
        if (nombreErreurs >= 6) {
            elementMessage.textContent = `Vous avez perdu ! Le mot était : ${motChoisi}`;
            boutonDeviner.disabled = true;
            saisieLettre.disabled = true;
        } else {
            elementMessage.textContent = "Mauvaise lettre, essayez encore !";
        }
    }
}

// Fonction pour réinitialiser le jeu
function reinitialiserJeu() {
    lettresDevinees = [];
    nombreErreurs = 0;
    imagePendu.src = imagesPendu[0];
    boutonDeviner.disabled = false;
    saisieLettre.disabled = false;
    elementMessage.textContent = "Devinez le mot !";
    afficherMot();
    mettreAJourLettresDevinees();
}

// Fonction pour démarrer le jeu
function commencerJeu() {
    choisirMot();
    reinitialiserJeu();
    elementMessage.textContent = "Le jeu a commencé ! Devinez le mot !";
}

// Fonction d'initialisation
function initialiserJeu() {
    saisieLettre.disabled = true;
    boutonDeviner.disabled = true;
    imagePendu.src = imagesPendu[0];
    elementMot.textContent = '';
    elementMessage.textContent = 'Cliquez sur "Commencer" pour jouer !';
    document.getElementById("guessedLetters").textContent = "Lettres devinées : Aucune";
}

// Gestionnaires d'événements
boutonDeviner.addEventListener("click", verifierLettre);
boutonReset.addEventListener("click", reinitialiserJeu);
boutonCommencer.addEventListener("click", commencerJeu);

// Permettre d'appuyer sur Entrée pour deviner
saisieLettre.addEventListener("keypress", function(evenement) {
    if (evenement.key === "Enter" && !boutonDeviner.disabled) {
        verifierLettre();
    }
});

// Initialisation du jeu au chargement de la page
initialiserJeu();