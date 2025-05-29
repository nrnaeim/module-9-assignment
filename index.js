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

//fetch allData
async function fetcProduct() {
  document.querySelector(
    "#products .content"
  ).innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;

  const fetecUrl = "https://dummyjson.com/products";
  try {
    const response = await fetch(fetecUrl);
    if (response.status === 200) {
      const data = await response.json();
      return (products = await data.products);
    } else {
      throw new Error("Server error");
    }
  } catch (error) {
    return error;
  }
}

//product inseting
function insertProduct(responseData) {
  if (responseData?.message) {
    errorhandler();
  } else {
    let productList = "";
    responseData.forEach((product) => {
      const newProduct = `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"> 
          <div class="card myProductCard p-0">
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
          </div>
          </div>`;
      productList += newProduct;
    });

    document.querySelector("#products .content").innerHTML = productList;
  }
}

//product fetching handler
window.addEventListener("load", async () => {
  const responseData = await fetcProduct();
  if (responseData?.message) {
    errorhandler();
  } else {
    const slicePart = responseData.slice(0, 6);
    insertProduct(slicePart);
  }
});

//see all product and Product handler
async function seeAllProduct(event) {
  event.preventDefault();
  const productList = await fetcProduct();
  insertProduct(productList);
}

//error handler
function errorhandler() {
  document.querySelector("#products .content").innerHTML = `
   <p>Opps! 501 Server error</p>
  `;
}
