// javascript
// ============================================================
// DEFAULT PRODUCTS
// ============================================================
// Ye products tab use honge jab localStorage me pehle se
// "products" naam ka data available nahi hoga.

let defaultProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 25000,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 3,
    name: "Headphones",
    price: 2500,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 4,
    name: "Keyboard",
    price: 1500,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 3000,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 6,
    name: "T-Shirt",
    price: 800,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 7,
    name: "Backpack",
    price: 1800,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },
  {
    id: 8,
    name: "Watch",
    price: 4500,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
  },
  {
    id: 9,
    name: "Coffee Mug",
    price: 400,
    category: "home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a",
  },
  {
    id: 10,
    name: "Table Lamp",
    price: 1200,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  },
];

// ============================================================
// CART DATA
// ============================================================
// localStorage se cart ka data retrieve kar rahe hain.
// Agar data nahi mila to empty array use hoga.

let card_list = JSON.parse(localStorage.getItem("card_list")) || [];

// Cart icon ke paas jo number dikh raha hai usko update karna.
let list = document.querySelector("#card_no");
list.innerHTML = card_list.length;

// ============================================================
// SAVE CART
// ============================================================
// Cart ke current data ko localStorage me save karta hai.
// JSON.stringify() array/object ko string me convert karta hai.

function saveCard() {
  localStorage.setItem("card_list", JSON.stringify(card_list));
}

// Cart me total kitne products hain uski initial length.
let list_item = card_list.length;

// ============================================================
// PRODUCTS DATA
// ============================================================
// localStorage me saved products hain to unhe use karo.
// Nahi hain to defaultProducts use karo.

let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;

// ============================================================
// RESET BUTTON
// ============================================================
// Reset button click hone par localStorage ka data remove
// kiya ja raha hai.

let reset = document.querySelector("#reset_btn");

reset.addEventListener("click", () => {
  localStorage.removeItem("products");
  localStorage.clear();
  location.reload();
});

// ============================================================
// DELETE PRODUCT
// ============================================================
// Product ID ke basis par product ko products array se remove
// karta hai, phir updated array localStorage me save hota hai.

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  saveProducts();
}

// ============================================================
// ADD PRODUCT TO CART
// ============================================================
// Selected product ko cart me add karta hai.
// "items" se quantity milti hai.

function add_card(element, items) {
  // Spread operator se original product ki saari properties
  // copy karke quantity bhi add kar rahe hain.
  let cart_product = {
    ...element,
    quantity: Number(items),
  };

  // New product ko cart array me add karna.
  card_list.push(cart_product);

  // Cart ko localStorage me save karna.
  saveCard();

  console.log(card_list);

  // Cart icon ka product count update karna.
  let list = document.querySelector("#card_no");
  list.innerHTML = `${card_list.length}`;
}

// ============================================================
// CART ELEMENTS
// ============================================================

let card_div = document.querySelector("#card");
let my_div = document.querySelector("#card_area");
let cart_items = document.querySelector("#cart_items");
let hide_bt = document.querySelector("#hide_btn");

// ============================================================
// CART ICON CLICK
// ============================================================
// Cart icon par click karne par cart open aur close hoga

card_div.addEventListener("click", () => {
  // Agar cart hidden hai to show karo.
  if (my_div.style.display === "none") {
    show_card();
  } else {
    // Agar already visible hai to hide karo.
    my_div.style.display = "none";
  }
});

// ============================================================
// HIDE CART BUTTON
// ============================================================
// Hide button click karne par cart section hide hoga.

hide_bt.addEventListener("click", () => {
  my_div.style.display = "none";
});

// ============================================================
// SHOW CART
// ============================================================
// Cart ke andar currently added products ko display karta hai.
// Saath hi total price calculate karta hai.

function show_card() {
  // Purane cart elements clear kar do.
  cart_items.innerHTML = "";

  // Total price initially 0.
  let total = 0;

  // Cart ke har product par loop.
  card_list.forEach((product) => {
    // Har cart product ke liye ek div create karna.
    let det = document.createElement("div");
    det.classList = "card_ele";

    // Product ki details HTML me insert karna.
    det.innerHTML = `
            
            <h2>Name: ${product.name}</h2>
            <h2>Price: ${product.price}</h2>
            <h2>Category: ${product.category}</h2>
            <h2>Quantity: ${product.quantity}</h2>

            <img 
                src="${product.image}"
                alt="${product.name}"
               >
              
        `;

    // Product ka total = price × quantity
    let itemTotal = product.price * product.quantity;

    // Har product ka total overall total me add karna.
    total += itemTotal;

    // Delete button create karna.
    let delete_Btn = document.createElement("button");

    delete_Btn.innerText = "Delete";
    delete_Btn.classList = "del_btn";

    // Delete button ko product ke div me add karna.
    det.appendChild(delete_Btn);

    // Delete button click hone par cart se product remove hoga.
    delete_Btn.addEventListener("click", (e) => {
      // Cart ke parent click event ko trigger hone se rokna.
      e.stopPropagation();

      delete_card(product.id);
    });

    // Product ko cart container me add karna.
    cart_items.appendChild(det);
  });

  // ==========================================================
  // CART TOTAL
  // ==========================================================

  let totalPrice = document.createElement("h2");

  totalPrice.innerText = `Total: ₹${total}`;

  cart_items.appendChild(totalPrice);

  // Cart ko visible karna.
  my_div.style.display = "flex";
}

// ============================================================
// DELETE CART PRODUCT / DECREASE QUANTITY
// ============================================================
// Product ko directly remove karne ke bajaye pehle quantity
// 1 se decrease hoti hai.
// Quantity 0 hone par product cart se remove hota hai.

function delete_card(id) {
  // ID ke basis par cart product find karna.
  let product = card_list.find((product) => product.id === id);

  // Agar product nahi mila to function stop.
  if (!product) return;

  // Quantity ko 1 se decrease karna.
  product.quantity--;

  // Quantity 0 ya usse kam ho gayi to product remove karo.
  if (product.quantity <= 0) {
    card_list = card_list.filter((product) => product.id !== id);
  }

  // Updated cart localStorage me save karna.
  saveCard();

  // Cart icon ka count update karna.
  document.querySelector("#card_no").innerHTML = card_list.length;

  // Cart ko dobara render karna.
  show_card();
}

// ============================================================
// SAVE PRODUCTS
// ============================================================
// Products array ko localStorage me save karta hai.

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// ============================================================
// PRODUCT FORM
// ============================================================

let productForm = document.querySelector("#productForm");

// Form submit hone par new product add ya existing product edit
// kiya jayega.

productForm.addEventListener("submit", (e) => {
  // Form submit hone par page reload hone se rokna.
  e.preventDefault();

  // Form se product ki values lekar object banana.
  let newProduct = {
    id: Number(document.querySelector("#productId").value),
    name: document.querySelector("#productName").value,
    price: Number(document.querySelector("#productPrice").value),
    category: document.querySelector("#productCategory").value,
    image: document.querySelector("#productImage").value,
  };

  // ==========================================================
  // EDIT EXISTING PRODUCT
  // ==========================================================

  if (isEditing) {
    // Map se products array ko update karna.
    products = products.map((product) => {
      // Jis product ki ID editingProductId ke equal hai,
      // uski jagah newProduct return hoga.
      if (product.id === editingProductId) {
        return newProduct;
      }

      // Baaki products same rahenge.
      return product;
    });

    // Updated products save karna.
    saveProducts();
  } else {
    // ========================================================
    // ADD NEW PRODUCT
    // ========================================================

    // Check karna ki same ID ka product already exist karta hai
    // ya nahi.
    let alreadyExists = products.some(
      (product) =>
        product.id === newProduct.id && product.id !== editingProductId,
    );

    // Same ID milne par new product add nahi hoga.
    if (alreadyExists) {
      alert("This Product ID already exists!");
      return;
    }

    // New product ko products array me add karna.
    products.push(newProduct);

    // Updated array localStorage me save karna.
    saveProducts();
  }

  // Form ko clear karna.
  productForm.reset();

  // Form ko hide karna.
  productForm.style.display = "none";

  // Products ko dobara search/render karna.
  search_product();
});

// ============================================================
// EDITING VARIABLES
// ============================================================
// editingProductId -> currently edit ho rahe product ki ID
// isEditing -> decide karta hai ki form Add ke liye hai ya Edit

let editingProductId = null;
let isEditing = false;

// ============================================================
// ADD PRODUCT FORM OPEN
// ============================================================
// Add Product button se form open hota hai.

function edit_product() {
  let productForm = document.querySelector("#productForm");

  // New product add kar rahe hain, isliye editing false.
  isEditing = false;

  // Purani form values clear.
  productForm.reset();

  // Form display.
  productForm.style.display = "flex";
}

// ============================================================
// EDIT PRODUCT FORM
// ============================================================
// Existing product ki information ko form me fill karta hai.

function replace_detail(element) {
  // Currently editing product ki ID save karna.
  editingProductId = element.id;

  // Editing mode on.
  isEditing = true;

  let productForm = document.querySelector("#productForm");

  // Form show karna.
  productForm.style.display = "flex";

  // Existing product ki values form fields me fill karna.
  document.querySelector("#productId").value = element.id;
  document.querySelector("#productName").value = element.name;
  document.querySelector("#productPrice").value = element.price;
  document.querySelector("#productCategory").value = element.category;
  document.querySelector("#productImage").value = element.image;
}

// ============================================================
// SEARCH PRODUCT
// ============================================================
// Search input ke according product filter karta hai.

function search_product() {
  // Search input ki value lena.
  let prd = document.querySelector("#srh").value;

  // Product name me search text exist karta hai ya nahi check.
  let result = products.filter((product) =>
    product.name.toLowerCase().includes(prd.toLowerCase()),
  );

  // Search result ko render karna.
  renderProducts(result, false);
}

// ============================================================
// CATEGORY ELEMENTS
// ============================================================

let cate_ele = document.querySelector("#cate_ele");
let cate_fa = document.querySelector("#cate_fa");
let cate_acc = document.querySelector("#cate_acc");
let cate_home = document.querySelector("#cate_home");

// Electronics category click.
cate_ele.addEventListener("click", () => {
  let category = cate_ele.innerText;
  search_cate(category);
});

// Fashion category click.
cate_fa.addEventListener("click", () => {
  let category = cate_fa.innerText;
  search_cate(category);
});

// Accessories category click.
cate_acc.addEventListener("click", () => {
  let category = cate_acc.innerText;
  search_cate(category);
});

// Home category click.
cate_home.addEventListener("click", () => {
  let category = cate_home.innerText;
  search_cate(category);
});

// ============================================================
// CATEGORY SEARCH
// ============================================================
// Selected category ke according products filter karta hai.

function search_cate(categ) {
  let result = products.filter((product) =>
    product.category.toLowerCase().includes(categ.toLowerCase()),
  );

  // Category result ko render karna.
  renderProducts(result, true);
}

// ============================================================
// RENDER PRODUCTS
// ============================================================
// Ye function products ko webpage par dynamically create karta hai.
// "r" decide karta hai ki result normal search ka hai ya
// category search ka.

function renderProducts(productList, r) {
  // Category mode ko store karna.
  let is_category = r;

  // Normal search results ka container.
  let my_div = document.querySelector(`#results`);

  // Category results ka container.
  let cat_list = document.querySelector("#category_list");

  // Purane results clear karna.
  my_div.innerHTML = "";
  cat_list.innerHTML = "";

  // ==========================================================
  // NO PRODUCT FOUND
  // ==========================================================

  // Normal search me product nahi mila.
  if (productList.length === 0 && is_category === false) {
    my_div.innerHTML = "<h2>Product not found</h2>";
  }

  // Category search me product nahi mila.
  if (productList.length === 0 && is_category === true) {
    cat_list.innerHTML = "<h2>Product not found</h2>";
  }

  console.log(productList);

  // ==========================================================
  // CREATE EACH PRODUCT CARD
  // ==========================================================

  productList.forEach((element) => {
    // Main product div.
    let det = document.createElement("div");
    det.classList = "srh_ele";

    // Product card container.
    let card = document.createElement("div");

    // Delete button.
    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";

    // Edit button.
    let replace_btn = document.createElement("button");

    replace_btn.innerText = "Edit Details";
    replace_btn.className = "edit_btn";

    // Add to cart button.
    let card_btn = document.createElement("button");

    card_btn.innerText = "Add Card";
    card_btn.className = "list_btn";

    // Quantity input.
    let item_input = document.createElement("input");

    item_input.placeholder = " No of Item";
    item_input.className = "item-no";

    // Starting me quantity input hidden hai.
    item_input.style.display = "none";

    // Buttons ko ek common div me rakhna.
    let button_list = document.createElement("div");

    button_list.classList = "btn_list";

    // ========================================================
    // PRODUCT INFORMATION HTML
    // ========================================================

    det.innerHTML = `
      <div id="product_element">
        <span id="product_text">

          <h1 id="product_head"> Product Details</h1>

          <h2> Name : ${element.name} </h2>

          <h2> Price : ${element.price} </h2>

          <h2 id="category_name">
            Category : ${element.category}
          </h2>

        </span>

        <img
          src="${element.image}"
          alt="${element.name}"
          
        >

      </div>
    `;

    // Add Card button aur quantity input ko card me add karna.
    card.appendChild(card_btn);
    card.appendChild(item_input);

    // ========================================================
    // NORMAL SEARCH RESULT
    // ========================================================

    if ((is_category = false)) {
      button_list.appendChild(deleteBtn);
      button_list.appendChild(replace_btn);
      button_list.appendChild(card);

      det.appendChild(button_list);

      my_div.appendChild(det);
    }

    // ========================================================
    // CATEGORY SEARCH RESULT
    // ========================================================

    if ((is_category = true)) {
      button_list.appendChild(deleteBtn);
      button_list.appendChild(replace_btn);
      button_list.appendChild(card);

      det.appendChild(button_list);

      cat_list.appendChild(det);
    }

    // ========================================================
    // DELETE PRODUCT BUTTON
    // ========================================================

    deleteBtn.addEventListener("click", () => {
      // Product ko products array se delete karna.
      deleteProduct(element.id);

      // Search results ko dobara render karna.
      search_product(productList);
    });

    // ========================================================
    // MOUSE ENTER
    // ========================================================
    // Product card par mouse aane par quantity input show hota hai.

    card.addEventListener("mouseenter", () => {
      item_input.style.display = "flex";
    });

    // ========================================================
    // EDIT BUTTON
    // ========================================================

    replace_btn.addEventListener("click", () => {
      replace_detail(element);
    });

    // ========================================================
    // ADD CARD BUTTON
    // ========================================================

    card_btn.addEventListener("click", () => {
      // Add karne ke baad quantity input hide.
      item_input.style.display = "none";

      // Input se quantity lena.
      let item_quantity = Number(item_input.value);

      // Quantity valid hai ya nahi check.
      if (item_quantity <= 0) {
        alert("Quantity enter karo");
        return;
      }

      // Check karna ki product already cart me hai ya nahi.
      let existingProduct = card_list.find(
        (product) => product.id === element.id,
      );

      // ======================================================
      // PRODUCT CART ME EXIST NAHI KARTA
      // ======================================================

      if (!existingProduct) {
        // New product cart me add.
        add_card(element, item_quantity);
      } else {
        // ====================================================
        // PRODUCT ALREADY CART ME EXIST KARTA HAI
        // ====================================================

        // Existing quantity me new quantity add.
        existingProduct.quantity += item_quantity;

        // Updated cart save.
        saveCard();

        // Cart ko dobara render karna.
        show_card();
      }

      console.log(card_list);
    });
  });
}

// ============================================================
// SEARCH BUTTON
// ============================================================
// Search button click hone par search_product function chalega.

let sr_btn = document.querySelector("#srh_btn");

sr_btn.addEventListener("click", () => {
  search_product();
});

// ============================================================
// ADD PRODUCT BUTTON
// ============================================================
// Add button click hone par product form open hoga.

let add_bt = document.querySelector("#add_btn");

add_bt.addEventListener("click", () => {
  edit_product();
});

// ============================================================
// INITIAL RENDER
// ============================================================
// Page load hote hi products ko screen par display karna.

renderProducts(products);
let cont_form=document.querySelector("#contact_form")
cont_form.addEventListener('submit',()=>{
confirm("Do you want to send message ?")
  
})