// ==UserScript==
// @name         Advanced Text Editor for 2Sucres
// @namespace    https://tabbygarf.club
// @version      1
// @description  Ajoute des boutons à la zone de message pour insérer du texte et des liens avec le formatage correct en fonction de la sélection de texte actuelle
// @match        https://2sucres.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // récupère la zone de message
    const textarea = document.getElementById("FormMessage");
    function addButtons(){
        // identifie le bouton et la barre pour barrer
        const icons = document.getElementsByTagName("i");
        let spoilButton = null;
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].classList.contains("material-icons") && icons[i].textContent === "visibility_off") {
                spoilButton = icons[i].parentNode;
                break;
            }
        }
        const toolbar = spoilButton.parentNode;
        // crée les boutons pour le formatage et le lien
        const linkButton = createButton("add_link", "insérer un lien", null, insertLink);
        //const underlineButton = createButton("format_underlined", "sousligner", "__", null);
        const codeButton = createButton("code", "code", "`", null);
        const lineButton = createButton("horizontal_split", "Séparateur Horizontal", null, insertLine);
        const hButton = createButton("title", "Titre", null, insertHeader);

        //

        toolbar.insertBefore(linkButton, spoilButton.nextSibling);
        toolbar.insertBefore(document.createTextNode(' '), spoilButton.nextSibling);
        toolbar.insertBefore(codeButton, spoilButton.nextSibling);
        toolbar.insertBefore(document.createTextNode(' '), spoilButton.nextSibling);
        toolbar.insertBefore(hButton, spoilButton.nextSibling);
        toolbar.insertBefore(document.createTextNode(' '), spoilButton.nextSibling);
        toolbar.insertBefore(lineButton, spoilButton.nextSibling);
        toolbar.insertBefore(document.createTextNode(' '), spoilButton.nextSibling);


    }
    setTimeout(() => {
        addButtons()
    }, 1000);
    window.addEventListener('popstate', () => {
        addButtons();
    });
    // fonction pour créer des boutons avec des icônes Materialize
    function createButton(icon, tooltip, format, onclick) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-small", "jaune");
        button.innerHTML = `<i class="material-icons">${icon}</i>`;
        button.setAttribute("title", tooltip);
        if (format !== null) {
            button.addEventListener("click", () => insertFormat(format));
        }
        if (onclick !== null) {
            button.addEventListener("click", onclick);
        }
        return button;
    }
    // fonction pour insérer un titre
    function insertHeader() {
        const message = document.getElementById("FormMessage");
        const start = message.selectionStart;
        const end = message.selectionEnd;
        const selectedText = message.value.substring(start, end);
        const beforeText = message.value.substring(0, start);
        const afterText = message.value.substring(end, message.value.length);
        let formatText = "";
        let hSize = "";
        let hText= "";
        if (selectedText !== "") {
            formatText = selectedText
        } else {
           formatText = prompt("Texte à formater");
        }
        hSize = parseInt(prompt("Taille du titre (1 [plus grand] - 6 [plus petit])"),10);
        if (hSize <= 0 || hSize >= 7 || isNaN(hSize) == true) {
            hText = "#"
        } else {
            for (let i = 0; i < hSize; i++) {
                hText += "#";
            }
        }
        let newText = beforeText + hText + " " + formatText + afterText;
        message.value = newText;
    }
    // fonction pour insérer une separation horizontale
    function insertLine() {
        const message = document.getElementById("FormMessage");
        const beforeText = message.value.substring(0, message.selectionStart);
        const afterText = message.value.substring(message.selectionEnd, message.value.length);
        const newText = beforeText + String.fromCharCode(13) + "____" + String.fromCharCode(13) + afterText;
        message.value = newText;
    }
    // fonction pour insérer le texte markdown dans la zone de message
    function insertFormat(format) {
        const message = document.getElementById("FormMessage");
        const start = message.selectionStart;
        const end = message.selectionEnd;
        const selectedText = message.value.substring(start, end);
        const beforeText = message.value.substring(0, start);
        const afterText = message.value.substring(end, message.value.length);
        let formatText = "";
        if (selectedText !== "") {
            formatText = selectedText
        } else {
           formatText = prompt("Texte à formater");
        }
        let newText = beforeText + format + formatText + format + afterText;
        message.value = newText;
    }

    // Fonction pour insérer un lien avec l'option d'ajouter un texte alt.
    function insertLink() {
        const message = document.getElementById("FormMessage");
        const start = message.selectionStart;
        const end = message.selectionEnd;
        const selectedText = message.value.substring(start, end);
        const beforeText = message.value.substring(0, start);
        const afterText = message.value.substring(end, message.value.length);
        let link = "";
        if (selectedText !== "") {
            link = selectedText;
        } else {
            link = prompt("Adresse du lien :");
        }
        const altText = prompt("Texte alternatif pour le lien");
        let newText = beforeText + "[" + altText + "](" + link + ")" + afterText;
        message.value = newText;
    }

}

)();
