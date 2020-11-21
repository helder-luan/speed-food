let items = [
  {
    id: 0,
    name: "Aneis de Cebola Empanados",
    src: "../images/items/001-onion-rings.svg",
    price: 14.90,
    description: "Aneis de cebola empanados - 20 unidades. Acompanha suco de uva 200ml.",
    amount: 1
  },

  {
    id: 1,
    name: "Hamburger Speed-Food",
    src: "../images/items/003-burger-4.svg",
    price: 17.50,
    description: "Pão, molho da casa, hambúrguer artesanal 120g, queijo, baicon, ovo, alface e tomate. Acompanha coca-cola 350ml.",
    amount: 1
  },

  {
    id: 2,
    name: "Pizza De Calabresa",
    src: "../images/items/005-pizza-1.svg",
    price: 27.99,
    description: "Pizza de calabresa (G) - Queijo, calabresa e catupiry. Acompanha coca-cola 2L.",
    amount: 1
  },
  
  {
    id: 3,
    name: "Taco",
    src: "../images/items/006-taco.svg",
    price: 15.00,
    description: "Carne moída, tomate, pimentão, cebola, feijão, molho de tomate e pimenta calabresa. ",
    amount: 1
  },
  
  {
    id: 4,
    name: "Cachorro Quente",
    src: "../images/items/008-hot-dog-1.svg",
    price: 9.00,
    description: "Pão, salsicha, molho, bacon, ketchup, maionese, batata palha e milho.",
    amount: 1
  },
  
  {
    id: 5,
    name: "Frango Frito com Batatas Fritas",
    src: "../images/items/016-fried-chicken-1.svg",
    price: 19.90,
    description: "Coxas de frango frito e batatas fritas. Serve 2 pessoas.",
    amount: 1
  },
  
  {
    id: 6,
    name: "Yakisoba",
    src: "../images/items/017-chinese.svg",
    price: 7.50,
    description: "Macarrão, carne, cenora, brócolis, repolho e palmito. Serve 1 pessoa.",
    amount: 1
  },

  {
    id: 7,
    name: "Batatas Fritas",
    src: "../images/items/028-fries.svg",
    price: 15.00,
    description: "Porção batatas fritas - 500g",
    amount: 1
  },

  {
    id: 8,
    name: "Coxa Frango Frito",
    src: "../images/items/029-fried-chicken.svg",
    price: 31.90,
    description: "Porção de coxa de frango frito. Serve 3 pessoas. Acompanha katchup, maionese e mostarda (100ml).",
    amount: 1
  }
];

let cart = [];

const areaPedido = document.querySelector('#items');

//add the items to sales area
for (let i = 0; i < items.length; i++) {
  areaPedido.innerHTML += `
    <div data-key="${i}" class="prods">

      <div class="images-prods">
        <img src="${items[i].src}" alt="${items[i].name}">
      </div>

      <div class="desc">
        <p>${items[i].name}</p>
        <p>R$${items[i].price.toFixed(2)}</p>
      </div>

      <div class="qt-prods">
        <div onclick="inc(event)" class="qt-prods-mais">+</div>

        <div class="qt">${items[i].amount}</div>

        <div onclick="dec(event)" class="qt-prods-menos">-</div>   
      </div>   
      
      <div class="addCart">
        <p onclick="addToCart(event)">Adicionar ao carrinho</p>
      </div>
    </div>
  `;
}

//check if there are any items in the cart
function verifyCart() {
  let img = document.querySelector('#buttonCart img');
  if (cart.length > 0) {
    img.src = '../images/bag-with-items.svg';
  } else {
    img.src = '../images/bag-empty.svg';
    if (document.querySelector('#total') && document.querySelector('#buy')) {
      document.querySelector('#total').remove();
      document.querySelector('#buy').remove();
      document.querySelector('#prods-cart-area').innerHTML = "<h1 style='text-align: center;'>CARRINHO VAZIO! &#128722;</h1>";
    } 
    else {}
  }

}

//add the clicked item to cart
function addToCart(event) {
  let keyItem = event.path[2].dataset.key;
  let choosed = {
    id: items[keyItem].id,
    name: items[keyItem].name,
    src: items[keyItem].src,
    price: items[keyItem].price,
    description: items[keyItem].description,
    amount: items[keyItem].amount
  }
  cart.push(choosed);

  items[keyItem].amount = 1;
  event.path[2].children[2].children[1].innerHTML = items[keyItem].amount;

  verifyCart();

  event.path[1].classList.remove('addCart');
  event.path[1].classList.add('added');
  event.target.innerHTML = 'Adicionado &#10004;';
  setTimeout(() => {
    event.target.innerHTML = 'Adicionar ao carrinho';
    event.path[1].classList.remove('added');
    event.path[1].classList.add('addCart');
  }, 2000);
}

//sum of prices
function purchasePrice() {
  let total = 0;
  let areaTotal = document.querySelector('#total');
  for (let i = 0; i < cart.length; i++) {
    total += ((cart[i].amount) * (cart[i].price.toFixed(2)));
  }
  areaTotal.innerHTML = `Total: R$${total.toFixed(2)}`;
}

//add items from the cart at screeen
function addItems() {
  document.querySelector('#prods-cart-area').innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    document.querySelector('#prods-cart-area').innerHTML += `
    <div class="prodsChosen">

      <div data-key="${i}" class="prodsInfo">

        <div class="prodsInfo--img">
          <img class="itemCart" src="${cart[i].src}" alt="">
        </div>

        <div class="prodsInfo--price">R$${cart[i].price.toFixed(2)}</div>

        <div class="prodsInfo--desc">${cart[i].description}</div>

        <div class="prodsInfo--qt">${cart[i].amount}</div>

        <div class="removeItem">
          <button onclick="removeItem(event)" id="delItem"><img src="../images/icon-x-delete.svg" alt="Remover Item"></button>
        </div>
      </div>


    </div>
    `;
  }
}

//open the cart area
function openCart() {
  document.querySelector('#cart').style.display = 'flex';
  document.querySelector('#cart').style.opacity = 0;
  setTimeout(()  => {
    document.querySelector('#cart').style.opacity = 1;
  }, 500);

  if (cart.length == 0) {
    if (document.querySelector('#total') && document.querySelector('#buy')) {
      document.querySelector('#total').remove();
      document.querySelector('#buy').remove();
    }

    document.querySelector('#prods-cart-area').innerHTML = "<h1 style='text-align: center;'>CARRINHO VAZIO! &#128722;</h1>";
  } 
  else {
    addItems();
    if (document.querySelector('#total') && document.querySelector('#buy')) {} 
    else {
      document.querySelector('#prods-cart').innerHTML += `
      <div id="total"></div>
      <div id="buy" onclick="checkOut()">
        Finalizar Compra
      </div>
      `;
    }
    purchasePrice();
  }
}

//close the cart area
function closeCart() {
  document.querySelector('#cart').style.opacity = 0;
  setTimeout(()  => {
    document.querySelector('#cart').style.display = 'none';
  }, 500);
}

//removes a specific item from the cart 
function removeItem(event) {
  //console.log(cart[event.path[3].dataset.key])
  cart.splice([event.path[3].dataset.key], 1)
  //console.log(cart)
  //console.log(event.path[3])
  event.path[3].remove();
  addItems();
  //console.log(document.querySelectorAll('.prodsInfo'))
  verifyCart();
  if (cart.length > 0) {
    purchasePrice();
  }
}

//finish the request
function checkOut() {
  closeCart();
  cart = [];

  document.querySelector('#finish').style.display = 'flex';
  document.querySelector('#finish').style.opacity = 0;
  setTimeout(()  => {
    document.querySelector('#finish').style.opacity = 1;
  }, 500);
  
  setTimeout(() => {
    document.querySelector('#finish').innerHTML = `
    <h1 style="font-size: clamp();">Pedido Enviado Com Sucesso! &#128513;</h1>
    `;
    setTimeout(() => {
      document.querySelector('#finish').style.opacity = 0;
      setTimeout(()  => {
        document.querySelector('#finish').style.display = 'none';
        location.replace('../index.html');
      }, 500);
    }, 2000);
  }, 5000);
}

//item quantity increment
function inc(e) {
  let key = e.path[2].dataset.key;
  items[key].amount++;
  e.path[1].children[1].innerHTML = items[key].amount;
}

//item quantity decrement
function dec(e) {
  let key = e.path[2].dataset.key;
  if (items[key].amount > 1) {
    items[key].amount--;
    e.path[1].children[1].innerHTML = items[key].amount;
  }
}