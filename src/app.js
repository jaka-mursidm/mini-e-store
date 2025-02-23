
function addCart(e, btn) {
  e.preventDefault();

  // Search closest card element after button click event
  const card = btn.closest('.card');

  // Get data from card
  const getTitle = card.querySelector('.card-title').textContent;
  const getImage = card.querySelector('.card-img-top').src;
  const getPriceText = card.querySelector('.card-price').textContent;
  const getPriceData = card.querySelector('.card-price').getAttribute('data-price');


  // Get cart container
  const canvasCart = document.querySelector('.offcanvas-body');
  const bodyCart = canvasCart.querySelector('.cart-items');

  // Parce price value from data-price attribute
  const priceValue = parseFloat(getPriceData);

  // Add new price item to totalPrice variable 
  totalPrice += priceValue;
  // Conversion to rupiah currency
  document.getElementById('total-price').textContent = 'Rp' + totalPrice.toLocaleString('id-ID');

  // Get cart container
  const cartItems = canvasCart.querySelectorAll('.cart-item');
  let existingCartItem = null;
  if (cartItems.length > 0) {
    cartItems.forEach(item => {
      const title = item.querySelector('.cart-title').textContent;
      if (title === getTitle) {
        existingCartItem = item;
      }
    });
  }
  if (existingCartItem) {
    const qtyInput = existingCartItem.querySelector('.qty-input');
    let currentQty = parseInt(qtyInput.value);
    qtyInput.value = currentQty + 1;

    totalPrice += priceValue;
  } else {
    // HTML structure of cart items
    const cartItemHTML = `
<div class="row mb-4 cart-item">
  <div class="col-md-3 mb-4">
    <div class="position-relative" style="width: 80px; height: 80px; background-color: gray;">
      <img class="" src="${getImage}" alt="${getTitle}"style="width:100%; height:100%; object-fit: cover;">
      <a href="#"><span class="position-absolute start-0 top-0 translate-middle badge bg-danger">X</span></a>
    </div>
  </div>
  <div class="col-md-9 ps-2">
    <p class="mb-1 fw-bold cart-title">${getTitle}</p>
    <p class="mb-1 cart-price" data-price="${getPriceData}">${getPriceText}</p>
    <div class="form-group d-flex gap-2">
      <label for="qty">Qty</label>
      <input id="qty" value="1" oninput="qtyHandler(this)" class="form-control form-control-sm qty-input" min="1" type="number">
    </div>
  </div>
</div>
`;
    // Add cart items to the end of the container using insertAdjacentHTML

    bodyCart.insertAdjacentHTML('beforeend', cartItemHTML);

    //  Update total item in the cart
    const totalItems = bodyCart.querySelectorAll('.cart-item').length;
    const captionTotal = document.getElementById('total-item');
    captionTotal.textContent = 'Total items : ' + totalItems;

    // If the cart item is not there, notification will not be given
    const cartIcon = document.getElementById('cart-icon');
    const itemIconTotal = document.getElementById('total-cart-icon');
    if (totalItems > 1) {
      itemIconTotal.textContent = totalItems;
    } else {
      const notifTotalHTML = `<span id="total-cart-icon"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            ${totalItems}</span>`;
      cartIcon.insertAdjacentHTML('beforeend', notifTotalHTML);
    }
  }
}

function qtyHandler(item) {
  const cartItems = document.querySelectorAll('.cart-item');
  let newTotalPrice = 0;

  cartItems.forEach(cartItem => {
    const price = parseInt(cartItem.querySelector('.cart-price').getAttribute('data-price'));
    let quantity = parseInt(cartItem.querySelector('.qty-input').value);
    if (quantity == NaN) {
      quantity = 0;
      console.log(quantity);

    }
    newTotalPrice += price * quantity;
  });
  totalPrice = newTotalPrice;
  document.getElementById('total-price').textContent = 'Rp' + totalPrice.toLocaleString('id-ID');
}


// TotalPrice global
let totalPrice = 0;

