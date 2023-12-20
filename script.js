let numbers = [],numbersOut = [], n = 0;

//Génération des 99 possibilité de nombre a afficher ( de 1 a 99)
for (let i = 0; i < 99; i++) {
    numbers[i] = i + 1;
}

// Mélange du tableau avec l'algorithme de Fisher-Yates
for (let i = numbers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
}

/**
 * j'affiche les 99 nombres du tableaux numbers[] dans un paragraphe a chaque appel de fonction
 */
function generateRandomNumber() {

    let i;

    // NumberGen obtient la valeur suivante du tableau
    let NumberGen = numbers[n];
    numbersOut[n] = numbers[n];
    n++;

    // Ajout d'un element paragraph
    let newParagraph = document.createElement("p");

    // Ajout du nombre généré au contenu textuel du nouveau paragraphe
    newParagraph.textContent = NumberGen;

    // Ajout de la class 'StyleGen" au paragraphe généré affin de gérer son css
    newParagraph.className = "StyleGen";

    //Obtient l'element parent par id, cadre ou seront affiché les nombres
    let parentElement = document.getElementById("NumberGen");

    // Attribue et met en enfant l'élément newParagraph
    parentElement.prepend(newParagraph);

    // limite le quantité de nombre affiché simultanément a 8
    while (parentElement.childElementCount > 8) {
        parentElement.removeChild(parentElement.lastChild);
    }
}

// Appel la fonction genrateRandomNumber pour afficher les nombres toute les 3,5sec
setInterval(generateRandomNumber, 3500);

/**
 * Génération de la carte de bingo de l'utilisateur
 */
function GenerateCard () {

    let card = [];
    //generation de 25 nombre different compris entre 1 et 99
    while (card.length < 25) {
        let nombre = Math.floor(Math.random() * 99) + 1;
        if (card.indexOf (nombre) === -1) {
            card.push(nombre);
        }
    }
    // trie par ordre croissant le tableaux "card"
    card.sort(function(a, b) { return a - b; });

    // J'obtient l'element html de la carte et de ses cellules par ID
    let table = document.getElementById('card');
    let cells = table.getElementsByTagName('td');
    
    const rows = 5;
    const cols = 5;

    //créé un element button où sera affiché le nombre de la case
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let button = document.createElement('button');
            /* lors du click du bouton d'une case:
             * Je change la couleur de la case
             * Je verifie si le nombre est sorti
             * Je verifie si la carte est gagnant
            */
            button.onclick = function() { changeColor(this), Verif(this.textContent, i, j), win(); }; 
            button.textContent = card[i * rows + j];
            cells[j * cols + i].innerHTML = '';
            cells[j * cols + i].appendChild(button);
        }
    }
}

// Appel de la fonction GenerateCard qui donne la carte du joueur
GenerateCard();


let switchColor = 0, BackColor;
/**
 * Changement de la couleur de fond de mon button au click
 * @param {HTMLButtonElement} button - Le bouton dont la couleur de fond doit être changée
 */
function changeColor(button) {
    // Je verifie si la couleur de fond a deja été définie
    if (button.switchColor === undefined) {
        button.switchColor = 0;
    }
    
    // Je verifie la couleur de fond actuel avant de changer pour son opposé
    button.switchColor++;
    if (button.switchColor % 2 == 1) {
        BackColor = "#237373";
    } else {
        BackColor = "transparent";
    }

    button.style.backgroundColor = BackColor;
}

//creation d'une matrice de 5x5, representant notre carte
//1 = bon nombre | 0 = mauvais nombre
let VerifCard = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];

/**
 * Vérifie si la valeur du bouton est dans les numéros sortis.
 * Met à jour le tableau VerifCard en conséquence.
 * @param {string|number} buttonValue - La valeur du bouton à vérifier
 * @param {number} a - L'index de la colonne dans le tableau VerifCard
 * @param {number} b - L'index de la ligne dans le tableau VerifCard
 */
function Verif(buttonValue, a, b) {
    let tempVerif = buttonValue;
    for (let i = 0; i < numbersOut.length; i++) {
        if (tempVerif == numbersOut[i]) {
            VerifCard[b][a] = 1;
            return;
        }
    }
    VerifCard[b][a] = 0;
}

/**
 * Vérifie si la carte est gagnate au click d'un bouton
 * Si la carte est gagnant, un ecran de victoire s'affiche
 */
function win () {
    let sommeRow = [0,0,0,0,0], sommeCol = [0,0,0,0,0], sommeDiagonal = [0,0];
    let bingo = document.getElementById("Bingo"); // On recupere par id l'affichage de la victoire
    // On somme les 0 et 1 des lignes / colonnes
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            sommeRow[j] = sommeRow[j] + VerifCard[j][i];
            sommeCol[i] = sommeCol[i] + VerifCard[j][i];
        }
    }
    // On somme les 0 et 1 des diagonales
    for (let i = 0; i < 5; i++) {
        sommeDiagonal[0] = sommeDiagonal[0] + VerifCard[i][i];
        sommeDiagonal[1] = sommeDiagonal[1] + VerifCard[i][4 - i];
    }
    // J'affiche ma carte de verifaction, en console, pour verifier si tout est correcte
    console.log(VerifCard);
    
    // Si une des ligne ou colonnes est gagnante, on affiche l'ecran de victoire et le temps de partie
    for (let i = 0; i < 5; i++) {
        //Pour gagner au Bingo, il faut un ligne, colonne ou diagonale de nombre sortis
        if (sommeCol[i] === 5 || sommeRow[i] === 5) {
            bingo.style.display = "table-column";
            resultat = minute + "min " + seconde + "s";  
            document.getElementById("timer").innerHTML = resultat;
        }
    }
    // Si une des diagonales est gagnante, on affiche l'ecran de victoire et le temps de partie
    if (sommeDiagonal[0] === 5 || sommeDiagonal[1] === 5) {
        bingo.style.display = "table-column";
        resultat = minute + "min " + seconde + "s";  
        document.getElementById("timer").innerHTML = resultat;
    }
}

let minute = 0, seconde = 0, resultat;

/**
 * Augmente le temp du timer de la partie a chaque appel
 */
function Timer() {
    seconde++;
    if (seconde == 60) {
        minute++;
        seconde = 0;
    }
    document.getElementById("chrono").innerHTML = minute + "min " + seconde + "sec";
}

// appel de la fonction Timer toute les secondes
setInterval(Timer, 1000);

