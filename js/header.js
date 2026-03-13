function initHeader() {

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {

    let open = false;

    searchBtn.addEventListener("click", () => {

      open = !open;

      if (open) {
        searchInput.classList.remove("w-0","opacity-0");
        searchInput.classList.add("w-56","opacity-100");
        searchInput.focus();
      } else {
        searchInput.classList.add("w-0","opacity-0");
        searchInput.classList.remove("w-56","opacity-100");
      }

    });

  }

  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileBtn && mobileMenu) {

    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

  }

}

setTimeout(initHeader,200);