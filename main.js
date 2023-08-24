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

    // Gestion de l'affichage plein écran des images
    const fullscreenImages = document.querySelectorAll('.fullscreenImage');
    const imgBackDiv = document.querySelector('.imgback');
    
    fullscreenImages.forEach((fullscreenImage, index) => {
        fullscreenImage.addEventListener('click', (event) => {
            event.stopPropagation();
    
            if (!fullscreenImage.classList.contains('fullscreen')) {
                closeFullscreenImages();
                imgBackDiv.classList.add('activeimgback');
                fullscreenImage.classList.add('fullscreen');
            } else if (event.target.closest('.fullscreenImage')) {
                fullscreenImage.classList.remove('fullscreen');
                imgBackDiv.classList.remove('activeimgback');
            }
        });
    });
    
    document.addEventListener('click', () => {
        closeFullscreenImages();
    });
    
    function closeFullscreenImages() {
        fullscreenImages.forEach((fullscreenImage) => {
            if (fullscreenImage.classList.contains('fullscreen')) {
                fullscreenImage.classList.remove('fullscreen');
                imgBackDiv.classList.remove('activeimgback');
            }
        });
    }

    //Gestion du wrapper footer - mobile
    if (window.innerWidth < 970) {

        const footerColumns = document.querySelectorAll(".colFoot1, .colFoot2, .colFoot3, .colFoot4");
    
        footerColumns.forEach(column => {
            const title = column.querySelector("h3");
            const list = column.querySelector("ul");
    
            title.addEventListener("click", function() {
                if (column.classList.contains("activeFoot")) {
                    list.style.height = "0";
                    column.classList.remove("activeFoot");
                } else {
                    list.style.height = list.scrollHeight + "px";
                    column.classList.add("activeFoot");
                }
            });
        });
    }

});

function toggleAccordion(triggerAccordion) {
  const content = triggerAccordion.nextElementSibling;
  const currentMaxHeight = content.style.maxHeight;

  if (currentMaxHeight === "0px" || currentMaxHeight === "") {
    content.style.maxHeight = "20000px";
  } else {
    content.style.maxHeight = "0px";
  }

  content.classList.toggle('activeAccordion');
  triggerAccordion.querySelector('.triangle').classList.toggle('triangle-down');
}

