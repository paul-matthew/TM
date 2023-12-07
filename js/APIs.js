//BLOG HEADLESS CMS-----------------------------------------

document.addEventListener('DOMContentLoaded', function() {
	if (location.pathname.endsWith('blog.html')) {
	  // Assuming you want 10 post per page
	  const postsPerPage = 10;
  
	  const urlParams = new URLSearchParams(window.location.search);
	  const currentPageIndex = urlParams.get('index');
	  const startIndex = (currentPageIndex - 1) * postsPerPage;
	  const endIndex = startIndex + postsPerPage;
  
	  fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'Authorization': 'Bearer bc4a449b76547409adcd6e3392bc6e',
		},
		body: JSON.stringify({
		  query: `{
			allBlogs {
			  id
			  blogTitle
			  dateField
			  blogDescription
			  blogImage { url }
			}
		  }`
		}),
	  })
		.then(response => response.json())
		.then(data => {
		  const allBlogs = data.data.allBlogs.slice(startIndex, endIndex);
		  allBlogs.sort((a, b) => new Date(b.dateField) - new Date(a.dateField));
		  const blogSection = document.getElementById('blogpost');
	
		  allBlogs.forEach(blog => {
			console.log('Current Blog:', blog); 
  
			// Truncate the description to the first 15 words
			const blogDescription = blog.blogDescription;
			const isMobile = window.innerWidth <= 768; // Adjust the pixel value as needed for your mobile view
			
			const wordsCount = isMobile ? 8 : 15;
			const truncatedDescription = blogDescription.split(' ').slice(0, wordsCount).join(' ');
			const descriptionWithEllipsis = blogDescription.split(' ').length > wordsCount ? truncatedDescription + '...' : truncatedDescription;

			const blogEntry = document.createElement('div');
			blogEntry.className = 'col-md-12';
			blogEntry.innerHTML = `
			  <div class="blog-entry d-flex justify-content-end">
				<a href="blog-single.html" class="block-20 img" style="background-image: url('${blog.blogImage.url}');">
				</a>
				<div class="text">
				  <p class="meta"><span><i class="fa fa-calendar me-1"></i>${blog.dateField}</span> <span><a href="#"></a></span></p>
				  <h3 class="heading mb-3"><a href="#">${blog.blogTitle}</a></h3>
				  <p>${descriptionWithEllipsis}</p>
				  <a href="blog-single.html?id=${blog.id}" class="btn read-more pb-4 px-1">Read more</a>
				</div>
			  </div>
			`;
	
			blogSection.appendChild(blogEntry);
		  });
		})
		.catch(error => console.error('Error:', error));
	  }
  });
  
  

//Blog Full Post-----------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
	if (location.pathname.endsWith('blog-single.html')) {
	  const urlParams = new URLSearchParams(window.location.search);
	  const blogID = urlParams.get('id'); // Replace 'blogID' with the actual parameter name
  
	  fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'Authorization': 'Bearer bc4a449b76547409adcd6e3392bc6e',
		},
		body: JSON.stringify({
		  query: `{
			allBlogs {
			  id
			  blogTitle
			  dateField
			  blogDescription
			  blogImage { url }
			}
		  }`
		}),
	  })
		.then(response => response.json())
		.then(data => {
		  const allBlogs = data.data.allBlogs;
		  const selectedBlog = allBlogs.find(blog => blog.id === blogID);
  
		  const blogSection = document.getElementById('blogpost-full');
  
		  if (selectedBlog) {
			console.log('Selected Blog:', selectedBlog);
			const blogEntry = document.createElement('div');
			blogEntry.className = 'col-md-12';
			blogEntry.innerHTML = `
			  <h2 class="mb-3">${selectedBlog.blogTitle}</h2>
			  <h3 class="mb-3" style="font-size:15px; color:red">${selectedBlog.dateField}</h3>
			  <img src="${selectedBlog.blogImage.url}" class="img-fluid mb-3"loading="lazy">
			  <p style="color: #333; font-size: 14px; line-height: 1.6em;">${selectedBlog.blogDescription}</p>
			`;
  
			blogSection.appendChild(blogEntry);
		  } else {
			// If the blog with the specified ID is not found
			blogSection.innerHTML = 'Blog post not found';
		  }
		})
		.catch(error => console.error('Error:', error));
	}
  });
 

//PRINTIFY API------------------------------------------------------

//General -----
// Initialize a global array to store all selected SKUs
let selectedSKUs = [];
let itemCount = 0; // Total item count for all products

// To RETRIEVE and log the stored SKUs locally
const initializeSelectedSKUs = () => {
    const storedSKUs = localStorage.getItem('selectedSKUs');
    selectedSKUs = storedSKUs ? JSON.parse(storedSKUs) : [];
};

initializeSelectedSKUs();

const updateSelectedSKUs = (updatedSKUs) => {
    selectedSKUs = updatedSKUs;
    localStorage.setItem('selectedSKUs', JSON.stringify(selectedSKUs));
};
// PRODUCTS-------
let fetchURL = '';
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    fetchURL = 'http://localhost:5000/products';
} else {
    fetchURL = 'https://tm-server-4a2a80557ba4.herokuapp.com/products';
}
if (window.location.pathname.includes('shop.html')) {
fetch(fetchURL)
  .then(response => response.json())
  .then(data => {
    const productsContainer = document.getElementById('products-container');

    if (data && data.data) {
      data.data.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-3', 'col-md-6', 'col-sm-6', 'p-2', 'card-container');
        productCard.innerHTML = `
          <a data-bs-toggle="modal" href="#productitem${index + 1}">
            <div class="card">
              <img src="${product.images[0].src}" class="card-img-top" alt="${product.title}"loading="lazy">
              <div class="card-body">
                <div>
                  <div class="service-info">
                    <h5 class="card-title2" style='font-size:25px'>${product.title}</h5>
                  </div>
                    <h5 style='font-size:12px;'>
                      $${product.variants.filter(variant => variant.is_enabled).reduce(
                      (maxPrice, variant) => (variant.price > maxPrice ? variant.price : maxPrice), 0) / 100}
                    USD</h5>
                  </div>
              </div>
            </div>
          </a>
        `;
        productsContainer.appendChild(productCard);

        const productModal = document.createElement('div');
        productModal.classList.add('portfolio-modal', 'modal', 'fade');
        productModal.id = `productitem${index + 1}`;
        productModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${product.title}</h5>
              <button type="button" class="view-cart-btn" style="font-family:inherit;margin:10px"><i class="fas ion-ios-cart"></i></button>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="product-images">
                <div class="small-images">
                  ${product.images.map((image, i) => `
                    <img src="${image.src}" class="small-img" alt="${product.title}" loading="lazy">
                  `).join('')}
                </div>
                <div class="main-container">
                  <img src="${product.images[0].src}" class="img-fluid main-img" alt="${product.title}" loading="lazy">
                </div>
              </div>
              <div class="color-options">
                <h6></h6>
                ${(product.options.find(option => option.name === 'Colors')?.values || [])
                  .filter(color => {
                    const variant = product.variants.find(variant => variant.options.includes(color.id));
                    return variant && variant.is_enabled;
                  })
                  .map((color) => `
                    <div class="color-option" style="background-color: ${color.colors[0]};"></div>
                  `).join('') || product.options.find(option => option.name === 'Frame Color')?.values.map((frameColor) => `
                    <div class="color-option" style="background-color: ${frameColor.colors[0]};"></div>
                `).join('') || product.options.find(option => option.name === 'Color')?.values.map((color) => `
                  <div class="color-option" style="background-color: ${color.colors[0]};"></div>
                `).join('') || ''}
              </div>
              <div class="size-and-quantity-options" style="display: flex; align-items: center;">
                <div class="size-options" style="margin-right: 20px;">
                  <h6 style='font-weight:bold; display: inline;'>Size Options:</h6>
                  <select class="size-dropdown">
                    ${product.options.find(option => option.name === 'Sizes')?.values
                      .filter(size => {
                        const variant = product.variants.find(variant => variant.options.includes(size.id));
                        if (size.title.length < 4) {
                            return variant && variant.is_available ? `<option value="${size.id}">${size.title} (Available)</option>` : '';
                        } else {
                            return variant && variant.is_available && variant.is_enabled ? `<option value="${size.id}">${size.title}</option>` : '';
                        }                      
                        })
                      .map(size => `
                        <option value="${size.id}">${size.title}</option>
                      `).join('') || product.options.find(option => option.name === 'Size')?.values
                      .filter(size => {
                        const variant = product.variants.find(variant => variant.options.includes(size.id));
                        return variant && variant.is_available && variant.is_enabled;
                      })
                      .map(size => `
                        <option value="${size.id}">${size.title}</option>
                      `).join('') || product.options.find(option => option.name === 'Phone Models')?.values
                      .filter(size => {
                        const variant = product.variants.find(variant => variant.options.includes(size.id));
                        return variant && variant.is_available && variant.is_enabled;
                      })
                      .map(size => `
                        <option value="${size.id}">${size.title}</option>
                      `).join('') }            
                  </select>
                </div>
                <div>
                  <label for="product-qty" style="margin-top: 10px; font-weight: bold; display: inline;">Quantity:</label>
                  <input type="number" class="product-qty" name="quantity" min="1" max="50" value="1" style="display: inline; width: 40px;">
                  </div>
              </div>
              <p style='font-weight:bold'>Price: 
                <span style='font-weight:normal'>
                  $${product.variants.filter(variant => variant.is_enabled).reduce(
                  (maxPrice, variant) => (variant.price > maxPrice ? variant.price : maxPrice), 0) / 100}
                USD</span>
              </p>
              <button class="add-to-cart-btn" style='margin-right:10px'>Add to Cart</button>Items in Cart: <span class="item-count"></span>
              <p>${product.description}</p>
            </div>
          </div>
        </div>
      `;
      

        document.body.appendChild(productModal);

        // JavaScript to handle color selection
        const colorOptions = productModal.querySelectorAll('.color-option');
        colorOptions.forEach((colorOption, colorIndex) => {
            colorOption.addEventListener('click', () => {
                const selectedColor = product.options.find(option => option.name === 'Colors')?.values[colorIndex] ||
                                     product.options.find(option => option.name === 'Frame Color')?.values[colorIndex]||
                                     product.options.find(option => option.name === 'Color')?.values[colorIndex];;
                if (selectedColor) {
                    // Remove 'selected' class from all color options
                    colorOptions.forEach(option => {
                        option.classList.remove('selected');
                    });
        
                    // Add 'selected' class to the clicked color option
                    colorOption.classList.add('selected');
                }
            });
        });
        

        // JavaScript to handle size selection dropdown
        const sizeDropdown = productModal.querySelector('.size-dropdown');
        const Quantity = productModal.querySelector('.product-qty');



        productCard.addEventListener('click', () => {
            const smallImages = document.querySelectorAll(`#productitem${index + 1} .small-images .small-img`);
            const mainImage = document.querySelector(`#productitem${index + 1} .main-img`);

            // Switch main image on click of small images
            smallImages.forEach((img, idx) => {
                img.addEventListener('click', () => {
                    // Remove 'selected' class from all images
                    smallImages.forEach((img) => {
                        img.classList.remove('selected');
                    });

                    // Add 'selected' class to the clicked image
                    img.classList.add('selected');

                    // Apply a smooth transition
                    mainImage.style.opacity = '0';
                    mainImage.onload = function() {
                        mainImage.style.opacity = '1';
                    };
                    mainImage.src = product.images[idx].src;
                });
            });
        });

        const addToCartButton = productModal.querySelector(`#productitem${index + 1} .add-to-cart-btn`);
        
        // Add an event listener to the "View Cart" button
        const viewCartButton = productModal.querySelector('.view-cart-btn');
        viewCartButton.addEventListener('click', () => {
            // Redirect to cart.html or your desired cart page
            window.location.href = 'cart.html';
        });

        addToCartButton.addEventListener('click', () => {
            // Get the selected color, size, and variant
            const selectedColorIndex = Array.from(colorOptions).findIndex(option => option.classList.contains('selected'));
            const selectedColor = product.options.find(option => option.name === 'Colors')?.values[selectedColorIndex] ||
            product.options.find(option => option.name === 'Frame Color')?.values[selectedColorIndex] ||
            product.options.find(option => option.name === 'Color')?.values[selectedColorIndex];
            const selectedSizeId = sizeDropdown.value;
            const selectedQuantity = Quantity.value;
        
            console.log('Selected Color:', selectedColor);
            console.log('Selected Size ID:', selectedSizeId);
            console.log('Selected Quantity:', selectedQuantity);
        
            // Log the entire product data for debugging
            console.log('Product Data:', product);
        
            // Find the selected variant based on color and size
            let selectedVariant;
        
            // Attempt with the first set of conditions
            selectedVariant = product.variants.find(variant => {
                const colorMatchIndex = variant.options[0] === selectedColor?.id;
                const sizeMatchIndex = variant.options[1]?.toString() === selectedSizeId.toString();
                return colorMatchIndex && sizeMatchIndex;
            });
        
            // If the first attempt failed, try the second set of conditions
            if (!selectedVariant) {
                selectedVariant = product.variants.find(variant => {
                    const colorMatchIndex = variant.options[2] === selectedColor?.id;
                    const sizeMatchIndex = variant.options[0]?.toString() === selectedSizeId.toString();
                    return colorMatchIndex && sizeMatchIndex;
                });
            }
        
            // If the second attempt failed, try the second set of conditions
            if (!selectedVariant) {
                selectedVariant = product.variants.find(variant => {
                    const colorMatchIndex = variant.options[1] === selectedColor?.id;
                    const sizeMatchIndex = variant.options[0]?.toString() === selectedSizeId.toString();
                    console.log("ah yo", variant.options[1])
                    return colorMatchIndex && sizeMatchIndex;
                });
            }
        
            // Now you can use the selectedVariant variable as needed
        
            if (!selectedColor && (product.options.find(option => option.name === 'Colors')?.values.length > 0 || product.options.find(option => option.name === 'Color')?.values.length > 0 || product.options.find(option => option.name === 'Frame Color')?.values.length > 0)) {
                // Show an error message to the user (you can customize this based on your UI)
                alert("Please select a Colour Option");
                return; // Stop execution if no color is selected
            }
        
            // Log the selected variant for debugging
            console.log('Selected Variant:', selectedVariant);
        
            // Check if a variant was found
            if (selectedVariant) {
                const selectedVariantSKU = selectedVariant.sku;
        
                // Add the selected SKU to the global array based on quantity
                for (let i = 0; i < selectedQuantity; i++) {
                    selectedSKUs.push(selectedVariantSKU);
                }
        
                // Update total item count
                itemCount = selectedSKUs.length;
        
                // Now you can use the selectedVariantSKU in your cart logic
                console.log("Selected Variant SKU:", selectedVariantSKU);
        
                // Also, you can log or use the entire selectedSKUs array
                console.log("All Selected SKUs:", selectedSKUs);
        
                // Update the item count display in all modals
                document.querySelectorAll('.item-count').forEach(span => {
                    span.textContent = itemCount;
                });
                // To STORE the SKU locally
                localStorage.setItem('selectedSKUs', JSON.stringify(selectedSKUs));
                // To RETRIEVE and log the stored SKUs locally
                const storedSKUs = localStorage.getItem('selectedSKUs');
                const retrievedSKUs = storedSKUs ? JSON.parse(storedSKUs) : [];
        
                console.log("NEW Stored SKUs:", retrievedSKUs);
            } else {
                console.error('No matching variant found for the selected color and size.');
            }
        });
        
    });
} else {
    console.log("Products data is missing or undefined.");
}
})
.catch(error => console.error(error));
}



//SHOPPING CART------
let subtotal = 0;
let total = 0;
let shipping = 19.99;
const skuToProductIdMap = {};
if (window.location.pathname.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', () => {
    // Create an order button
    const orderButton = document.createElement('button');
    orderButton.id = 'orderButton';
    orderButton.classList.add('order-btn'); 
    orderButton.innerText = 'Order Now';

    // Add a click event listener to the order button
    orderButton.addEventListener('click', handleOrderButtonClick);

    // Create an clear button
    const clearButton = document.createElement('button');
    clearButton.id = 'clearButton';
    clearButton.classList.add('clear-btn'); 
    clearButton.innerText = 'Clear';

    // Add a click event listener to the order button
    clearButton.addEventListener('click', handleClearButtonClick);

    // Insert the order button at the top of the cart container
    const cartContainer = document.getElementById('cart-container');
    cartContainer.parentNode.insertBefore(orderButton, cartContainer);
    cartContainer.parentNode.insertBefore(clearButton, cartContainer);
    
        // Fetch product data based on SKUs
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                
                if (data && data.data) {
                    const productsContainer = document.getElementById('cart-container');

                    // Iterate over the fetched product data and create elements
                    data.data.forEach(product => {
                        // Check if the product has at least one variant with a matching SKU
                        if (product.variants.some(variant => selectedSKUs.includes(variant.sku))) {
                            selectedSKUs.forEach(selectedSKU => {
                                const matchingVariant = product.variants.find(variant => variant.sku === selectedSKU);
                                if (matchingVariant) {
                                  skuToProductIdMap[matchingVariant.sku] = product.id;
                              }

                                if (matchingVariant) {
                                    const matchingSKU = matchingVariant.sku;
                                    const existingCartItem = document.querySelector(`.cart-item[data-sku="${matchingSKU}"]`);
                                    subtotal += matchingVariant.price / 100;
                                    updateTotal();
       
                                    if (existingCartItem) {
                                        // If the item with the same SKU already exists, update its quantity
                                        const quantityElement = existingCartItem.querySelector('.quantity');
                                        const currentQuantity = parseInt(quantityElement.innerText, 10);
                                        quantityElement.innerText = currentQuantity + 1;
                                    } else {
                                        // Create and append the new cart item
                                        const cartItem = document.createElement('div');
                                        cartItem.classList.add('cart-item', 'row', 'mb-3');
                                        cartItem.setAttribute('data-sku', matchingSKU);
                                        cartItem.setAttribute('data-product-id', product.id); // Add product ID attribute
                                        cartItem.setAttribute('data-variant-id', matchingVariant.id); // Add variant ID attribute

                                        const matchingImage = product.images.find(image => image.variant_ids.includes(matchingVariant.id));

                                        // Product image
                                        const productImage = document.createElement('img');
                                        productImage.src = matchingImage ? matchingImage.src : '';
                                        productImage.alt = product.title;
                                        productImage.classList.add('col-2', 'img-fluid', 'productimg');
                                        productImage.loading = 'lazy';

                                        // Product details
                                        const productDetails = document.createElement('div');
                                        productDetails.classList.add('col-8');
                                        productDetails.innerHTML = `
                                        <hr style="border-top: 5px solid #D091DE; margin: 1px 0;">
    
                                        <h5 style='font-family: IGLight;'>${product.title}</h5>
                                            <p style="margin: 0;"><span style="font-weight: bold;">Color & Size:</span> ${matchingVariant.title}</p>
                                            <p style="margin: 0;"><span style="font-weight: bold;">Price:</span> $${matchingVariant.price/100} USD</p>
                                            <p style="margin: 0;"><span style="font-weight: bold;">Quantity:</span> <span class="quantity">1</span></p>
                                        `;

                                        // Remove item button
                                        const removeItemButton = document.createElement('button');
                                        removeItemButton.innerText = 'Remove';
                                        removeItemButton.classList.add('col-2', 'remove-btn');
                                        removeItemButton.addEventListener('click', () => {
                                            // Find the index of the item with the matching SKU in the cart
                                            const matchingSKU = matchingVariant.sku;
                                            const quantityElement = cartItem.querySelector('.quantity');
                                            const currentQuantity = parseInt(quantityElement.innerText, 10);
                                            console.log('Current Quantity:', currentQuantity); // Log current quantity for debugging
                                            subtotal -= matchingVariant.price / 100;
                                            updateTotal();

                                        
                                            if (currentQuantity > 1) {
                                                // If the quantity is more than 1, decrease it
                                                quantityElement.innerText = currentQuantity - 1;
                                                const indexOfMatchingSKU = selectedSKUs.indexOf(matchingSKU);
                                        
                                                // Check if the SKU appears more than once in the array
                                                if (indexOfMatchingSKU !== -1) {
                                                    // Remove only the first occurrence of the SKU
                                                    selectedSKUs.splice(indexOfMatchingSKU, 1);
                                                }
                                        
                                                // Update selectedSKUs with the modified array
                                                updateSelectedSKUs(selectedSKUs);
                                            } else {
                                                // If the quantity is 1, remove the entire cart item
                                                cartItem.parentNode.removeChild(cartItem);
                                        
                                                // Update selectedSKUs with the filtered array
                                                const updatedSelectedSKUs = selectedSKUs.filter(item => item !== matchingSKU);
                                                updateSelectedSKUs(updatedSelectedSKUs);
                                            }
                                        
                                            // Log the updated array
                                            console.log('Updated SKUs:', selectedSKUs);
                                            // console.log(`Remove item with SKU: ${matchingSKU}`);
                                        });
                                        

                                        // Append elements to the cart item
                                        cartItem.appendChild(productImage);
                                        cartItem.appendChild(productDetails);
                                        cartItem.appendChild(removeItemButton);

                                        // Append cart item to the cart container
                                        productsContainer.appendChild(cartItem);
                                    } 
                                }
                            });
                        }
                    });
                  return total;
                } else {
                    console.log("Product data is missing or undefined.");
                }
            })
            .catch(error => console.error(error));
    });
}
function updateTotal() {
  // Calculate the total based on your logic
  total = (subtotal + (subtotal * 0.13) + shipping).toFixed(2);
  // console.log('bread and tings', total);

  // Dispatch a custom event to notify other parts of the application
  const updateTotalEvent = new CustomEvent('updateTotalEvent', {
    detail: { total: total },
  });
  document.dispatchEvent(updateTotalEvent);

  return total;
}

//ORDER

// Global variable to track the current stage
let currentStage = 1;
const inputValues = {
  firstName:'',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  region:'',
  city: '',
  address: '',
  address2: '',
  zip: ''
};
const random = generateRandom6DigitNumber();
const randomlabel = generateRandom6DigitNumber();

function generateRandom6DigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

  // Create a modal element
  const orderModal = document.createElement('div');
  orderModal.classList.add('modal', 'fade');
  orderModal.id = 'orderModal';

// Function to handle the order button click
function handleOrderButtonClick() {
  // Function to construct the modal body based on the current stage


  // Set the modal content
  orderModal.innerHTML = constructModalBody();

  // Append the modal to the body
  document.body.appendChild(orderModal);

  // Initialize the modal using Bootstrap's modal
  const modal = new bootstrap.Modal(orderModal);

  orderModal.addEventListener('hidden.bs.modal', function () {
    // Reset the currentStage to 1 when the modal is closed
    currentStage = 1;
    // console.log(currentStage);
  });

  // Show the modal
  modal.show();

}
  // Initialize an array to store line items for the order
  const lineItems = [];

async function submitOrder() {

  // Find all cart items
  const cartItems = document.querySelectorAll('.cart-item');

  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    region,
    city,
    address,
    address2,
    zip,
  } = inputValues;

  // Iterate over each cart item
  cartItems.forEach(cartItem => {
    const sku = cartItem.getAttribute('data-sku');
    const quantityElement = cartItem.querySelector('.quantity');
    const productId = cartItem.getAttribute('data-product-id'); 
    const variantId = cartItem.getAttribute('data-variant-id'); 

    // Extract the quantity as an integer
    const quantity = parseInt(quantityElement.innerText, 10);

    // Add the line item to the array
    lineItems.push({
      // "sku": sku,
      "product_id": productId,
      "variant_id": variantId,
      "quantity": quantity
    });
  });

  // Construct the order details
  const orderDetails = {
    "external_id": random.toString,
    "label": randomlabel.toString,
    "line_items": lineItems,
    "shipping_method": 1,
    "is_printify_express": false,
    "send_shipping_notification": false,
    "address_to": {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "phone": phone,
      "country": country,
      "region": region,
      "address1": address,
      "address2": address2,
      "city": city,
      "zip": zip,
      // Include other user input in address_to
    }
  };
  // console.log('ah yo this one:',lineItems);

  // Make a POST request to your server's /orders endpoint
  let fetchURLorder = '';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      fetchURLorder = 'http://localhost:5000/orders';
  } else {
      fetchURLorder = 'https://tm-server-4a2a80557ba4.herokuapp.com/orders';
  }

  if (window.location.pathname.includes('cart.html')) {
  fetch(fetchURLorder, {
    method: 'POST',
    body: JSON.stringify(orderDetails),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k',

    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Printify order response:', data);
    })
    .catch(error => {
      console.error('Error placing order with Printify:', error);
    });
}
}

function formatPhoneNumber() {
  var phoneInput = document.getElementById('phoneInput');
  
  // Remove any non-numeric characters
  var phoneNumber = phoneInput.value.replace(/\D/g, '');

  // Format the phone number as needed
  if (phoneNumber.length >= 10) {
    phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  // Update the input value
  phoneInput.value = phoneNumber;
}


function constructModalBody() {
  switch (currentStage) {
    case 1:
      return `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Total Cost</h5><span style="margin-left:5px">(USD)</span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Display order summary and total cost here -->
              <table style="border-collapse: collapse; width: 50%;">
              <tr>
                  <td style="border: none;">Subtotal:</td>
                  <td style="border: none; text-align: left;">$${(subtotal).toFixed(2)}</td>
              </tr>
              <tr>
                  <td style="border: none;">Tax:</td>
                  <td style="border: none; text-align: left;">$${(subtotal * 0.13).toFixed(2)}</td>
              </tr>
              <tr>
                  <td style="border: none;">Shipping:</td>
                  <td style="border: none; text-align: left;">$${shipping}</td>
              </tr>
              <tr>
                  <td style="border: none; font-weight: bold;">Total:</td>
                  <td style="border: none; text-align: left; font-weight: bold;">$${total}</td>
              </tr>
          </table>
              <button id="OrderDetailsButton" class="proceed-btn gen-btn mt-3">Order Details</button>
            </div>
          </div>
        </div>
      `;
    case 2:
      return `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Shipping Information</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="firstNameInput">First Name<span style='color:red'>*</span>:</label>
              <input type="text" id="firstNameInput" class="form-control" required value="${inputValues.firstName}">
              <label for="lastNameInput">Last Name<span style='color:red'>*</span>:</label>
              <input type="text" id="lastNameInput" class="form-control" required value="${inputValues.lastName}">
              <label for="emailInput">Email<span style='color:red'>*</span>:</label>
              <input type="email" id="emailInput" class="form-control" required value="${inputValues.email}">
              <label for="phoneInput">Phone<span style='color:red'>*</span>:</label>
              <input type="text" id="phoneInput" class="form-control" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Please enter a valid phone number (e.g., 123-456-7890)" inputmode="numeric" oninput="formatPhoneNumber()" value="${inputValues.phone}">
              <label for="countrySelect">Country<span style='color:red'>*</span>:</label>
              <select id="countryInput" class="form-control" required>
                <option value="CA" ${inputValues.country === 'CA' ? 'selected' : ''}>Canada</option>
                <option value="TT" ${inputValues.country === 'TT' ? 'selected' : ''}>Trinidad and Tobago</option>
                <option value="US" ${inputValues.country === 'US' ? 'selected' : ''}>United States</option>
              </select>
              <label for="regioninput">Province/State<span style='color:red'>*</span>:</label>
              <input type="region" id="regionInput" class="form-control" required value="${inputValues.region}">
              <label for="cityinput">City<span style='color:red'>*</span>:</label>
              <input type="city" id="cityInput" class="form-control" required value="${inputValues.city}">
              <label for="addressinput">Address<span style='color:red'>*</span>:</label>
              <input type="address" id="addressInput" class="form-control" required value="${inputValues.address}">
              <label for="address2input">Unit <span style='font-size:10px'>(if applicable):</span></label>
              <input type="address2" id="address2Input" class="form-control" required value="${inputValues.address2}">
              <label for="zipinput">Postal Code/ZIP<span style='color:red'>*</span>:</label>
              <input type="zip" id="zipInput" class="form-control" required value="${inputValues.zip}">
              <button id="backButton" class="back-btn gen-btn mt-3">Back</button>
              <button id="proceedpayment" class="proceed-btn gen-btn mt-3">Proceed to Payment</button>
              <div id='formincomplete' style='color:red; margin-top:5px;font-size:11px'></div>
              <div id='formincomplete2' style='color:red; margin-top:5px;font-size:11px'></div>
              <div style='font-size:10px; margin-top:15px'>By placing your order, you agree to Tropical Misfit's <a href="./terms-privacy.html">Terms of Use and Privacy Policy</a>.</div>
          </div>
        </div>
      `;
    case 3:
      return `
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Display payment options here -->
            <div id='paypal-parent'>
            </div>              
          <button id="backButton2" class="back-btn gen-btn mt-3">Back</button>
          </div>
        </div>
      </div>
      `;
      case 4:
        return `
          <div class="modal-dialog modal-dialog-centered success-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-black">Order Received!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <!-- Display a larger text indicating the order has been received and is being processed -->
                <div class="success-message">
                  <span class="checkmark larger-checkmark">&#10003;</span>
                  <p class="larger-text">Thanks for placing your order! It has been received and is being processed. You will receive an email notification with more details.</p>
                </div>
              </div>
            </div>
          </div>
        `;
      
       
  }
}

orderModal.addEventListener('click', function (event) {
  const targetId = event.target.id;
  switch (targetId) {
    case 'OrderDetailsButton':
      currentStage=2;
      console.log(currentStage);
      orderModal.innerHTML = constructModalBody();
      saveInputValues();
      break;
    case 'proceedpayment':
      currentStage=3;
      saveInputValues();
      // submitOrder();
      console.log(currentStage);
      orderModal.innerHTML = constructModalBody();
      initializePayPal();
      break;
    case 'backButton':
      currentStage=1;
      saveInputValues();
      console.log(currentStage);
      orderModal.innerHTML = constructModalBody();
      break;
    case 'backButton2':
      currentStage=2;
      console.log(currentStage);
      orderModal.innerHTML = constructModalBody();
      saveInputValues();
      break;
  }
});

var initialSetupDone = false;

function saveInputValues() {
  console.log('this is the', currentStage)
  const firstNameInput = document.getElementById('firstNameInput');
  const lastNameInput = document.getElementById('lastNameInput');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const countryInput = document.getElementById('countryInput');
  const regionInput = document.getElementById('regionInput');
  const cityInput = document.getElementById('cityInput');
  const addressInput = document.getElementById('addressInput');
  const address2Input = document.getElementById('address2Input');
  const zipInput = document.getElementById('zipInput');

  if (firstNameInput) inputValues.firstName = firstNameInput.value;
  if (lastNameInput) inputValues.lastName = lastNameInput.value;
  if (emailInput) inputValues.email = emailInput.value;
  if (phoneInput) inputValues.phone = phoneInput.value;
  if (countryInput) inputValues.country = countryInput.value;
  if (regionInput) inputValues.region = regionInput.value;
  if (cityInput) inputValues.city = cityInput.value;
  if (addressInput) inputValues.address = addressInput.value;
  if (address2Input) inputValues.address2 = address2Input.value;
  if (zipInput) inputValues.zip = zipInput.value;

  if (currentStage === 2) {
    var formControls = document.getElementsByClassName('form-control');
    var proceedBtn = document.getElementById('proceedpayment');
    var modalBody = document.querySelector('.modal-body'); // Adjust the selector based on your modal structure
  
    // Function to validate email format
    function validateEmailFormat(emailValue) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(emailValue);
    }
  
    // Function to validate zip code or Canadian postal code format
    function validateZipCodeFormat(zipValue) {
      // Allow for postal code with or without a space
      var zipPattern = /^(\d{5}(-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d|[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d)$/;
      return zipPattern.test(zipValue);
    }
  
    var validationMessage = document.getElementById('formincomplete');
    if (!validationMessage) {
      validationMessage = document.createElement('div');
      validationMessage.id = 'validationMessage';
      modalBody.appendChild(validationMessage);
    }
    var validationMessage2 = document.getElementById('formincomplete2');
    if (!validationMessage2) {
      validationMessage2 = document.createElement('div');
      validationMessage2.id = 'validationMessage2';
      modalBody.appendChild(validationMessage2);
    }

    var validationMessageText = '';

    if (!initialSetupDone || 
      Array.from(formControls).some(input => input.value.trim() === '' && input !== address2Input) ||
      !validateEmailFormat(emailInput.value.trim()) ||
      !validateZipCodeFormat(zipInput.value.trim()) ||
      phoneInput.value.replace(/\D/g, '').length < 10) {
    // Set initial state
    proceedBtn.disabled = true;
    proceedBtn.classList.add('btn-disabled');
    validationMessageText = 'Please fill in all required fields to proceed to payment.';
  }
  
    validationMessage.innerText = validationMessageText;
    // var validationMessage2=document.createElement('div');
    // validationMessage.appendChild(validationMessage2);
  
    // Loop through each element with the 'form-control' class
    Array.from(formControls).forEach(function (formControl) {
      formControl.addEventListener('input', function () {
        var inputsToCheck = Array.from(formControls).filter(function (input) {
          return input !== address2Input;
        });
  
        var allFieldsFilled = inputsToCheck.every(function (input) {
          return input.value.trim() !== '';
        });
  
        var emailIsValid = validateEmailFormat(emailInput.value.trim());
        var zipIsValid = validateZipCodeFormat(zipInput.value.trim());
        var phoneIsValid = phoneInput.value.replace(/\D/g, '').length >= 10;
  
        var allFilledAndValid = allFieldsFilled && emailIsValid && zipIsValid && phoneIsValid;

                
        if (!emailIsValid && emailInput.value.trim() !== '') {
          validationMessage2.innerHTML = 'Please provide a valid EMAIL';
        } else if (!zipIsValid && zipInput.value.trim() !== '') {  // Fix here
          validationMessage2.innerHTML = 'Please review POSTAL/ZIP CODE format';
        } else if (!phoneIsValid && phoneInput.value.trim() !== '') {  // Fix here
          validationMessage2.innerHTML = 'Please review PHONE NUMBER';
        } 
          else {
          validationMessage2.innerHTML = '';
        }
        
        if(allFieldsFilled){
          validationMessageText = '';
          validationMessage.innerText = validationMessageText;
        }

        proceedBtn.disabled = !allFilledAndValid;
        proceedBtn.classList.toggle('btn-disabled', !allFilledAndValid);

      });
    });
  
    initialSetupDone = true;
  }
  
    
}

function initializePayPal(amount) {
  // Get the container for the PayPal button
  const paypalContainer = document.getElementById('paypal-parent');

  // Create a new div for the PayPal button
  const paypalButtonContainer = document.createElement('div');
  paypalButtonContainer.id = 'paypal-button-container';

  // Append the PayPal button container to the parent container
  paypalContainer.appendChild(paypalButtonContainer);

  // Initialize the PayPal SDK here
  paypal.Buttons({
    createOrder: function (_, actions) {
      saveInputValues();
      console.log('Amount to be sent to PayPal:', total);
  
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total,
            },
            // shipping: {
            //   name: {
            //     full_name: inputValues.firstName + ' ' + inputValues.lastName,
            //     phone: inputValues.phone,
            //     email: inputValues.email,
            //   },
            //   address: {
            //     country_code: 'US',
            //     address_line_1: inputValues.address,
            //     address_line_2: '',
            //     admin_area_2: inputValues.city,
            //     admin_area_1: inputValues.region,
            //     postal_code: 'xxxxx',
            //   },

            // },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: function (data, actions) {
      // Capture the transaction details
      return actions.order.capture().then(function (details) {
        // details contains information about the transaction
        console.log('Transaction details:', details);

        // Now, trigger your submitOrder function with the necessary information
        submitOrder();
        currentStage=4;
        orderModal.innerHTML = constructModalBody();  
      });
    },
  }).render('#paypal-button-container');
  
  
}


// Handle PAYPAL Checkout
// const paypalScript = document.createElement('script');
// paypalScript.src = 'https://www.paypal.com/sdk/js?client-id=AZiLd6zqQUwa01x2PvxtcQw9hQY4p99xS61WRn2yDHBZxWdCVS4aLQbCA1CcUGj9HuF9AC9QwQ9qxfNC';
// document.head.appendChild(paypalScript);


//Shipping

function calculateShippingCost() {
  // Fetch the order details, such as selectedSKUs and any other relevant information


  // Make a POST request to Printify's shipping cost endpoint
  fetch(fetchURL)
  .then(response => response.json())
  .then(data => {
      // Handle the response from Printify
      console.log('Printify shipping cost response:', data);

      // You can extract and use the shipping cost options from the response
      const standardShippingCost = data.standard || 0;
      const expressShippingCost = data.express || 0;
      const priorityShippingCost = data.priority || 0;
      const printifyExpressShippingCost = data.printify_express || 0;

      // You can use these shipping cost values as needed in your application
  })
  .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('Error calculating shipping cost with Printify:', error);
      // You can also show an error message to the user
  });
}


//CLEAR

function handleClearButtonClick() {
    // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to clear all items from the cart?');

    // Check if the user confirmed
    if (isConfirmed) {
        const cartItems = document.querySelectorAll('.cart-item');

        // Iterate through each cart item and remove it
        cartItems.forEach(cartItem => {
            // Find the matching SKU for each cart item
            const matchingSKU = cartItem.dataset.sku;

            // Update selectedSKUs with the filtered array
            const updatedSelectedSKUs = selectedSKUs.filter(item => item !== matchingSKU);
            updateSelectedSKUs(updatedSelectedSKUs);

            // Remove the cart item from the DOM
            cartItem.parentNode.removeChild(cartItem);
        });

        console.log('All items cleared from the cart.');
    } else {
        console.log('Clear operation canceled by the user.');
    }
}