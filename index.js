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
      btn.classList.remove("d-none");
    });
    event.target.classList.add("d-none");
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

//product fetching handler
window.addEventListener("load", async () => {
  const fetecUrl = "https://dummyjson.com/products";
  try {
    const response = await fetch(fetecUrl);
    if (response.status === 200) {
      const data = await response.json();
      const products = data.products.slice(0, 5);
      let productList = "";
      products.forEach((product) => {
        const newProduct = `
        <div class="card" style="width: 12rem">
          <img
            src="${product.thumbnail}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-truncate">
             ${product.title}
            </h5>
            <p class="card-text text-truncate">
                   ${product.description}
            </p>
            <div class="card-text">
              <span>৳${product.price.toLocaleString()}</span>
              <span style="font-size: 10px; text-align: end">-         ${product.discountPercentage.toLocaleString()}%</span>
            </div> 
            <a href="#" class="btn btn-primary w-100">Buy</a>
          </div>
        </div>`;
        productList += newProduct;
      });

      document.querySelector("#products .content").innerHTML = productList;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.log(error);
  }
});
