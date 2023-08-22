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

    // Initialisation des blocs
    setupBlocks();

    // Gestion du scroll de l'en-tête
    let lastScrollPosition = 0;

    function handleScroll() {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition) {
            document.querySelector('header').classList.add('hidden');
        } else {
            document.querySelector('header').classList.remove('hidden');
        }

        if (currentScrollPosition === 0) {
            document.querySelector('header').classList.remove('hidden');
        }

        lastScrollPosition = currentScrollPosition;
    }

    window.addEventListener('scroll', handleScroll);

    const fullscreenImages = document.querySelectorAll('.fullscreenImage');
    const containers = document.querySelectorAll('.containerGD');
    let isFullscreen = false;
    
    // Parcourez toutes les images pour ajouter des écouteurs d'événements
    fullscreenImages.forEach((fullscreenImage, index) => {
        fullscreenImage.addEventListener('click', () => {
            if (!isFullscreen) {
                fullscreenImage.classList.add('fullscreen');
                containers[index].classList.add('fullscreen-container');
                isFullscreen = true;
            }
        });
    });
    
    // Ajoutez un écouteur d'événement au document pour capturer les clics sur n'importe quelle partie
    document.addEventListener('click', (event) => {
        if (isFullscreen) {
            fullscreenImages.forEach((fullscreenImage, index) => {
                if (event.target !== fullscreenImage && !fullscreenImage.contains(event.target)) {
                    fullscreenImage.classList.remove('fullscreen');
                    containers[index].classList.remove('fullscreen-container');
                    isFullscreen = false;
                }
            });
        }
    });

});

function toggleAccordion(triggerAccordion) {
  const content = triggerAccordion.nextElementSibling;

  content.classList.toggle('activeAccordion');
  triggerAccordion.querySelector('.triangle').classList.toggle('triangle-down');
}
