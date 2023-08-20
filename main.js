document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menuItems = document.querySelector(".menu-items");
  const expandBtn = document.querySelectorAll(".expand-btn");

  // humburger toggle
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    menuItems.classList.toggle("open");
  });

  // mobile menu expand
  expandBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
    });
  });
});



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

    lastScrollPosition = currentScrollPosition;
}


document.addEventListener("DOMContentLoaded", function () {
    //includeHeader();
    window.addEventListener('scroll', handleScroll);
});
