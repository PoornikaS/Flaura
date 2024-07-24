// Get references to the necessary elements
const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close-btn');
const productForm = document.getElementById('productForm');
const productContainer = document.querySelector('.products-container');

// Function to show the modal window
function showModal() {
  productModal.style.display = 'block';
}

// Function to hide the modal window
function hideModal() {
  productModal.style.display = 'none';
}

// Event listeners
addProductBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);
window.addEventListener('click', function(event) {
  if (event.target === productModal) {
    hideModal();
  }
});

// Function to create a new product card
function createProductCard(name, price, image, discount) {
  const productCard = document.createElement('div');
  productCard.classList.add('product');

  if (discount) {
    const discountSpan = document.createElement('span');
    discountSpan.textContent = `-${discount}%`;
    productCard.appendChild(discountSpan);
  }

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('img');
  const productImg = document.createElement('img');
  productImg.src = URL.createObjectURL(image);
  imgDiv.appendChild(productImg);

  // Add the bar div with icons and links
  const barDiv = document.createElement('div');
  barDiv.classList.add('bar');

  const heartIcon = document.createElement('i');
  heartIcon.classList.add('fa-solid', 'fa-heart');
  barDiv.appendChild(heartIcon);

  const cartLink = document.createElement('a');
  cartLink.href = '#';
  cartLink.textContent = 'Add To Cart';
  barDiv.appendChild(cartLink);

  const shareIcon = document.createElement('i');
  shareIcon.classList.add('fa-solid', 'fa-share');
  barDiv.appendChild(shareIcon);

  imgDiv.appendChild(barDiv);

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');
  const productName = document.createElement('h3');
  productName.textContent = name;
  const productPrice = document.createElement('p');
  productPrice.classList.add('price');
  productPrice.textContent = `$ ${price}`;
  infoDiv.appendChild(productName);
  infoDiv.appendChild(productPrice);

  productCard.appendChild(imgDiv);
  productCard.appendChild(infoDiv);

  return productCard;
}

// Event listener for form submission
productForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productImage = document.getElementById('productImage').files[0];
  const productDiscount = document.getElementById('productDiscount').value;

  const newProductCard = createProductCard(productName, productPrice, productImage, productDiscount);
  productContainer.appendChild(newProductCard);

  hideModal();
  productForm.reset();
});
