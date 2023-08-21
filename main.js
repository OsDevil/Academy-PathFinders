document.addEventListener("DOMContentLoaded", () => {
    // Gestion du menu burger
    const menuBtn = document.querySelector(".menu-btn");
    const menuItems = document.querySelector(".menu-items");
    const expandBtn = document.querySelectorAll(".expand-btn");

    // Hamburger toggle
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        menuItems.classList.toggle("open");
    });

    // Mobile menu expand
    expandBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("open");
        });
    });

    // Fonctions de gestion des blocs
    function toggleBlock(block, contentBlock, otherBlock, otherContentBlock, introBlock) {
         if (block.classList.contains("activeBloc")) {
            block.classList.remove("activeBloc");
            contentBlock.classList.remove("activeContentBloc");
        
            if (!otherBlock.classList.contains("activeBloc")) {
              introBlock.classList.remove("activeIntro");
            }
          } else {
            block.classList.add("activeBloc");
            contentBlock.classList.add("activeContentBloc");
        
            if (!otherBlock.classList.contains("activeBloc")) {
              introBlock.classList.add("activeIntro");
            }
        
            if (otherBlock.classList.contains("activeBloc")) {
              otherBlock.classList.remove("activeBloc");
              otherContentBlock.classList.remove("activeContentBloc");
            }
          }
    }

    // Fonctions d'écoute d'événement
    function setupBlocks() {
        const histoireBloc = document.querySelector(".histoireBloc");
        const ressourcesBloc = document.querySelector(".ressourcesBloc");
        const contentHistoire = document.querySelector(".contentHistoire");
        const contentRessources = document.querySelector(".contentRessources");
        const contentIntro = document.querySelector(".contentIntro");

        histoireBloc.addEventListener("click", function () {
            toggleBlock(histoireBloc, contentHistoire, ressourcesBloc, contentRessources, contentIntro);
        });

        ressourcesBloc.addEventListener("click", function () {
            toggleBlock(ressourcesBloc, contentRessources, histoireBloc, contentHistoire, contentIntro);
        });
    }

// Initialisation
(function() {
  setupBlocks();
})();

/* GESTION SCROLL HEADER */

let lastScrollPosition = 0;

function handleScroll() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling vers le bas, masquer l'en-tête
        document.querySelector('header').classList.add('hidden');
    } else {
        // Scrolling vers le haut, afficher l'en-tête
        document.querySelector('header').classList.remove('hidden');
    }

    // Ajouter une condition pour afficher l'en-tête en haut de la page
    if (currentScrollPosition === 0) {
        document.querySelector('header').classList.remove('hidden');
    }

    lastScrollPosition = currentScrollPosition;
}
    window.addEventListener('scroll', handleScroll);
});
