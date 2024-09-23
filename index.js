const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      photo: "assets/icons/001-beetroot.svg",
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      photo: "assets/icons/002-carrot.svg",
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      photo: "assets/icons/003-apple.svg",
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      photo: "assets/icons/004-apricot.svg",
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      photo: "assets/icons/005-avocado.svg",
      type: "fruit" 
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      photo: "assets/icons/006-bananas.svg",
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      photo: "assets/icons/007-bell-pepper.svg",
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      photo: "assets/icons/008-berry.svg",
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      photo: "assets/icons/009-blueberry.svg",
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      photo: "assets/icons/010-eggplant.svg",
      type: "vegetable"
    }
  ],
  cart: []
};

function createButtonStore(item) {
  const button = document.createElement("button");

  button.innerText = "Add to Cart";

  button.addEventListener("click", () => handleAddToCart(item));
  return button;
}

function handleAddToCart(item) {
 
 const existingCartItem = state.cart.find(cartItem => cartItem.id === item.id);

 if (!existingCartItem) {
  
   state.cart.push({ ...item, quantity: 1 });
 } else {

   existingCartItem.quantity += 1;
 }

  console.log("Current cart:", state.cart);
  renderCartItemList();
  renderTotalPrice();
  
}

// select element
const groceryListUl = document.querySelector("#store-item-list");
function renderStoreItemList(items) {
  const storeItemList = document.getElementById("store-item-list")

  // reset the list
  storeItemList.innerHTML = "";

  
  for (let i = 0; i < items.length; i++) {
    const grocery = items[i];

    const groceryLi = document.createElement("li");
    groceryLi.setAttribute("store", grocery.id);

    // Create an image element for the item's photo
    const img = document.createElement("img");
    img.src = grocery.photo;
    img.style.width = "50px"; 
    img.style.height = "50px";

    // Append the image and a button to the list item
    groceryLi.appendChild(img);
    groceryLi.appendChild(createButtonStore(grocery));
    
    // Append the list item to the UL
    storeItemList.appendChild(groceryLi);
  }
}

// select element
const cartListUl = document.querySelector("#cart-item");
function renderCartItemList() {
  // reset the list
  cartListUl.innerHTML = "";

  for(let i = 0; i < state.cart.length; i++ ) {
    const cart = state.cart[i];

    const cartLi = document.createElement("li");

    const img = document.createElement("img");
    img.src = cart.photo;
    img.style.width = "50px";
    img.style.height = "50px";

    cartLi.setAttribute("cart", cart.id);
    cartLi.innerText = cart.name;
    cartLi.innerText += " x " + cart.quantity;
    
    // append the list item to the ul
    cartLi.prepend(img);
    cartLi.appendChild(createButtonRemoveCart(cart));
    cartListUl.appendChild(cartLi);
  }
}

  function createButtonRemoveCart(item) {
    const button = document.createElement("button");
    button.classList.add("quantity-btn", "remove-btn", "center");
    button.addEventListener("click", () => handleRemoveFromCart(item));
    return button;
  }

  function handleRemoveFromCart(item) {
    if (!item) {
      console.error("Item is undefined");
      return;
    }
    // Remove the item from the cart
    const index = state.cart.indexOf(item);
    state.cart.splice(index, 1);

    console.log("Current cart:", state.cart);

    renderCartItemList();
    renderTotalPrice();
  }


  // select element
const totalListUl = document.querySelector("#total-price");
  function renderTotalPrice() {
    // reset the list
    totalListUl.innerHTML = "";
    let total = 0;
    for(let i = 0; i < state.cart.length; i++ ) {
      const cart = state.cart[i];
      total += cart.price * cart.quantity;
    }
    const totalLi = document.createElement("li");
    totalLi.innerText = "Total: $" + total.toFixed(2);
    totalListUl.appendChild(totalLi);
 
  }

  function handleFilterByType(type) {
    const filteredItems = type === "all" ? state.items : filterByType(type);
    renderStoreItemList(filteredItems);
  }

  function createDropDownMenu() {
    const select = document.createElement("select");
    
    // Add a change event listener to filter by type
    select.addEventListener("change", () => handleFilterByType(select.value));
  
    // Add default all option
    const optionAll = document.createElement("option");
    optionAll.innerText = "All";
    optionAll.value = "all";
    select.appendChild(optionAll);
  
    // Extract unique item types
    const types = state.items.map(item => item.type);
    const uniqueTypes = [...new Set(types)];
  
    // Create options for each unique type
    for (const type of uniqueTypes) {
      const option = document.createElement("option");
      option.innerText = type;
      option.value = type;
      select.appendChild(option);
    }

    // Append the dropdown to a specific element
    const dropdownContainer = document.getElementById("dropdown-container");
    dropdownContainer.appendChild(select);
  }

  
  function createForm() {
    const formContainer = document.getElementById("form-container");

  const form = document.createElement("form");
  form.setAttribute("method", "post");

  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("placeholder", "Add item name");

 
  const inputId = document.createElement("input");
  inputId.setAttribute("type", "text");
  inputId.setAttribute("placeholder", "Add item id");

  
  const inputPrice = document.createElement("input");
  inputPrice.setAttribute("type", "text");
  inputPrice.setAttribute("placeholder", "Add item price");

  
  const inputType = document.createElement("input");
  inputType.setAttribute("type", "text");
  inputType.setAttribute("placeholder", "Add item type");

 
  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Submit");

  
  form.appendChild(inputName);
  form.appendChild(inputId);
  form.appendChild(inputPrice);
  form.appendChild(inputType);
  form.appendChild(submitButton);

  
  formContainer.appendChild(form);

  formContainer.appendChild(form);
  
    // Prevent the default form submission behavior
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const itemName = inputName.value;
      const itemId = inputId.value;
      const itemPrice = inputPrice.value;
      const itemType = inputType.value;
      console.log("Item submitted:", itemName);
      console.log("Item submitted:", itemPrice);
      console.log("Item submitted:", itemId);
      console.log("Item submitted:", itemType);
      state.items.push({ id: itemId, name: itemName, price: parseFloat(itemPrice), type: itemType });
      renderStoreItemList(state.items);
      form.reset();
    });
  }
  
  


  function filterByType(type) {
    console.log("Filtering by type:", type);
    return state.items.filter(item => item.type === type);
  } 

function main() {
  createForm(); 
  createDropDownMenu();
  renderStoreItemList(state.items);
  
}

main();
