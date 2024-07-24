let wishlist = [];

function saveWishlistToStorage() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function removeFromWishlist(index, wishlist) {
  wishlist.splice(index, 1);
  saveWishlistToStorage();
  window.location.reload();
  renderWishlist(wishlist);
}

document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.querySelector(".wishlist-container");

  // Load wishlist data from localStorage
  loadWishlistFromStorage();

  function renderWishlist(wishlist) {
    if (wishlistContainer) {
      wishlistContainer.innerHTML = "";
      wishlist.forEach((product, index) => {
        const wishlistItem = document.createElement("div");
        wishlistItem.classList.add("wishlist-item");
        wishlistItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="info">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
          </div>
          <button class="remove-btn" onclick="removeFromWishlist(${index}, wishlist)">Remove</button>
        `;
        wishlistContainer.appendChild(wishlistItem);
      });
    }
  }

  function addToWishlist(product) {
    wishlist.push(product);
    saveWishlistToStorage();
    renderWishlist(wishlist);
  }


  function loadWishlistFromStorage() {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedWishlist) {
      wishlist = storedWishlist;
      renderWishlist(wishlist);
    }
  }

  const heartIcons = document.querySelectorAll(".fa-heart");
  heartIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const productCard = icon.closest(".product");
      const product = {
        name: productCard.querySelector("h3").textContent,
        price: productCard.querySelector(".price").textContent,
        image: productCard.querySelector("img").src,
      };
      addToWishlist(product);
    });
  });
});