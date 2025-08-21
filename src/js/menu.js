export const getMenu = () => {
  const menuBtn = document.querySelector(".menuBtn");
  const menuModal = document.querySelector(".menu-modal-background");
  const menuCloseBtn = document.querySelector(".menuCloseBtn");
  menuModal.style.display = "none";

  menuBtn.addEventListener("click", () => {
    if (menuModal.style.display === "none") {
      menuModal.style.display = "block";
    }
  });
  menuCloseBtn.addEventListener("click", () => {
    if (menuModal.style.display === "block") {
      menuModal.style.display = "none";
    }
  });
};
