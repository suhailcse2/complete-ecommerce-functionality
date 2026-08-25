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
let card_list = JSON.parse(localStorage.getItem("card_list")) || [];
let list = document.querySelector("#card_no");
list.innerHTML = card_list.length;
function saveCard() {
  localStorage.setItem("card_list", JSON.stringify(card_list));
}
let list_item = card_list.length;
let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;

let reset = document.querySelector("#reset_btn");
reset.addEventListener("click", () => {
  localStorage.removeItem("products");
  localStorage.clear();
});
function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  saveProducts();
}

function add_card(element, items) {

  let cart_product = {
    ...element,
    quantity: Number(items),
  };

  card_list.push(cart_product);
  saveCard();
  console.log(card_list);

  let list = document.querySelector("#card_no");
  list.innerHTML = `${card_list.length}`;
}

let card_div = document.querySelector("#card");
let my_div = document.querySelector("#here_data");
let cart_items = document.querySelector("#cart_items");
let hide_bt = document.querySelector("#hide_bt");

// initially hidden


// CART ICON / CARD CLICK
card_div.addEventListener("click", () => {
  if (my_div.style.display === "none") {
    show_card();
  } else {
    my_div.style.display = "none";
  }
});

// HIDE BUTTON
hide_bt.addEventListener("click", () => {
  my_div.style.display = "none";
});
function show_card() {
  cart_items.innerHTML = "";
  let total = 0;

  card_list.forEach((product) => {
    let det = document.createElement("div");
det.classList="card_ele"
    det.innerHTML = `
            
            <h2>Name: ${product.name}</h2>
            <h2>Price: ${product.price}</h2>
            <h2>Category: ${product.category}</h2>
            <h2>Quantity: ${product.quantity}</h2>

            <img 
                src="${product.image}"
                alt="${product.name}"
                style="height:100px;width:200px;"
            >
        `;
    let itemTotal = product.price * product.quantity;

    total += itemTotal;
    let delete_Btn = document.createElement("button");

    delete_Btn.innerText = "Delete";
delete_Btn.classList="del_btn"
    det.appendChild(delete_Btn);

    delete_Btn.addEventListener("click", (e) => {
      e.stopPropagation();

      delete_card(product.id);
    });

    cart_items.appendChild(det);
  });
  let totalPrice = document.createElement("h2");
  totalPrice.innerText = `Total: ₹${total}`;

  cart_items.appendChild(totalPrice);
  my_div.style.display = "flex";
}
function delete_card(id) {
  let product = card_list.find((product) => product.id === id);

  if (!product) return;

  product.quantity--;

  if (product.quantity <= 0) {
    card_list = card_list.filter((product) => product.id !== id);
  }
  saveCard();
  document.querySelector("#card_no").innerHTML = card_list.length;

  show_card();
}
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

let productForm = document.querySelector("#productForm");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // let alreadyExists = products.some(product =>
  //     product.id === newProduct.id &&
  //     product.id !== editingProductId);

  let newProduct = {
    id: Number(document.querySelector("#productId").value),
    name: document.querySelector("#productName").value,
    price: Number(document.querySelector("#productPrice").value),
    category: document.querySelector("#productCategory").value,
    image: document.querySelector("#productImage").value,
  };

  if (isEditing) {
    products = products.map((product) => {
      if (product.id === editingProductId) {
        return newProduct;
      }

      return product;
    });
    saveProducts();
  } else {
    let alreadyExists = products.some(
      (product) =>
        
        product.id === newProduct.id && product.id !== editingProductId,
    );

    if (alreadyExists) {
      alert("This Product ID already exists!");
      return;
    }

    products.push(newProduct);
    saveProducts();
  }

  productForm.reset();
  productForm.style.display = "none";

  search_product();
});
let editingProductId = null;
let isEditing = false;
function edit_product() {
  let productForm = document.querySelector("#productForm");

  isEditing = false;

  productForm.reset();
  productForm.style.display = "flex";
}
function replace_detail(element) {
  editingProductId = element.id;
  isEditing = true;

  let productForm = document.querySelector("#productForm");

  productForm.style.display = "flex";

  document.querySelector("#productId").value = element.id;
  document.querySelector("#productName").value = element.name;
  document.querySelector("#productPrice").value = element.price;
  document.querySelector("#productCategory").value = element.category;
  document.querySelector("#productImage").value = element.image;
}
// let custom=document.querySelector(".btn_list")
// custom.addEventListener('mouseenter',()=>{
//   // let quan=document.querySelector(".item-no")
//   // quan.style.display="flex";
// })
function search_product() {
  let prd = document.querySelector("#srh").value;
  let result = products.filter((product) =>
    product.name.toLowerCase().includes(prd.toLowerCase()),
  );
  renderProducts(result,false);
}
let cate_ele=document.querySelector("#cate_ele")
let cate_fa=document.querySelector("#cate_fa")
let cate_acc=document.querySelector("#cate_acc")
let cate_home=document.querySelector("#cate_home")
cate_ele.addEventListener('click',()=>{
  let category=cate_ele.innerText;
  search_cate(category)
})
cate_fa.addEventListener('click',()=>{
  let category=cate_fa.innerText;
  search_cate(category)
})
cate_acc.addEventListener('click',()=>{
  let category=cate_acc.innerText;
  search_cate(category)
})
cate_home.addEventListener('click',()=>{
  let category=cate_home.innerText;
  search_cate(category)
})
function search_cate(categ) {
 
  let result = products.filter((product) =>
    product.category.toLowerCase().includes(categ.toLowerCase()),
  );
  renderProducts(result,true);
}

function renderProducts(productList,r) {
  let is_category=r;
  let my_div = document.querySelector(`#results`);

  let cat_list=document.querySelector("#category_list")
  my_div.innerHTML = "";
cat_list.innerHTML = "";
  
 
  if (productList.length === 0 && is_category===false) {
    my_div.innerHTML = "<h2>Product not found</h2>";
  }
  if (productList.length === 0 && is_category===true) {
    cat_list.innerHTML = "<h2>Product not found</h2>";
  }


  console.log(productList);

  productList.forEach((element) => {
    let det = document.createElement("div");
    det.classList="srh_ele"
    let card = document.createElement("div");
    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    let replace_btn = document.createElement("button");
    replace_btn.innerText = "Edit Details";
    replace_btn.className = "edit_btn";
    let card_btn = document.createElement("button");
    card_btn.innerText = "Add Card";
    card_btn.className = "list_btn";
    let item_input = document.createElement("input");
    item_input.placeholder = " No of Item";
    item_input.className = "item-no";
    item_input.style.display = "none";
    let button_list=document.createElement("div")
    button_list.classList="btn_list"
    det.innerHTML = ` <div id="pro_elem"><span id="pro_text">
    <h1 id="pd_head"> Product Details</h1>
    <h2> Name : ${element.name} </h2>
    <h2> Price : ${element.price} </h2>
    <h2 id="catee"> Category : ${element.category}</h2>
    </span>
      <img 
        src="${element.image}" 
        alt="${element.name}" 
        style="height: 140px; margin-top:10px; "
    > </div>
    `;
    card.appendChild(card_btn);
    card.appendChild(item_input);
    if(is_category=false){
    button_list.appendChild(deleteBtn);
    button_list.appendChild(replace_btn);
    button_list.appendChild(card);
    det.appendChild(button_list)
    my_div.appendChild(det);
    }
   if(is_category=true){
        button_list.appendChild(deleteBtn);
    button_list.appendChild(replace_btn);
    button_list.appendChild(card);
    det.appendChild(button_list)
    cat_list.appendChild(det);

   }
    deleteBtn.addEventListener("click", () => {
      deleteProduct(element.id);
   
      search_product(productList);

    });
    card.addEventListener("mouseenter", () => {
      item_input.style.display = "flex";

    });
    replace_btn.addEventListener("click", () => {
      replace_detail(element);
    });
   
    card_btn.addEventListener("click", () => {

    item_input.style.display = "none";

    let item_quantity = Number(item_input.value);

    if (item_quantity <= 0) {
        alert("Quantity enter karo");
        return;
    }

    let existingProduct = card_list.find(
        product => product.id === element.id
    );

    if (!existingProduct) {

        add_card(element, item_quantity);

    } else {

        // purani quantity me new quantity add
        existingProduct.quantity += item_quantity;

        saveCard();

        // sirf cart ke products ko re-render karo
        show_card();
    }

    console.log(card_list);
});

  });
}

let sr_btn = document.querySelector("#srh_btn");
sr_btn.addEventListener("click", () => {
  search_product();
});

let add_bt = document.querySelector("#add_btn");

add_bt.addEventListener("click", () => {
  edit_product();
});
renderProducts(products);
