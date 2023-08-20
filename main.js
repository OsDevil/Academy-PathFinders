/* INCLUSION HEADER + FOOTER */
function includeHeader() {
    document.body.classList.add('loading');
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");
    fetch("header-base.html")
        .then(response => response.text())
        .then(content => {
            headerPlaceholder.innerHTML = content;
            document.body.classList.remove('loading');
        });
    fetch("footer-base.html")
        .then(response => response.text())
        .then(content => {
            footerPlaceholder.innerHTML = content;
        });
}

document.addEventListener("DOMContentLoaded", includeHeader);

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

