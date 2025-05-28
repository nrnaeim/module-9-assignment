//menu open close handler
const menuOpenCloseBtns = document.querySelectorAll(".menuOpenClose i");
menuOpenCloseBtns.forEach((item) => {
  item.addEventListener("click", (event) => {
    const menuContainer = document.querySelector(".menuContainer");
    const menu = document.querySelector(".menuContainer");

    menuContainer.classList.contains("d-none")
      ? menuContainer.classList.remove("d-none")
      : menuContainer.classList.add("d-none");

    menu.classList.contains("smallDeviceMenu")
      ? menu.classList.remove("smallDeviceMenu")
      : menu.classList.add("smallDeviceMenu");

    menuOpenCloseBtns.forEach((btn) => {
      if (btn.classList.contains("d-none")) {
        btn.classList.remove("d-none ");
      } else {
        btn.classList.add("d-none");
      }
    });
  });
});

//menu handler
const menu = document.querySelectorAll(".menu li a");
menu.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    menu.forEach((bt) => {
      bt.classList.remove("activeMenu");
    });
    event.target.classList.add("activeMenu");
  });
});
