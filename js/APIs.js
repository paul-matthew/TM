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
				  <a href="blog-single.html?id=${blog.id}" style="background-color: #D091DE !important; border: solid black !important; z-index: 2; width:100px !important; height:30px !important; font-size:small !important;" class="btn btn-white pb-4 px-1">Read more</a>
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
			  <img src="${selectedBlog.blogImage.url}" class="img-fluid mb-3">
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
              <img src="${product.images[0].src}" class="card-img-top" alt="${product.title}">
              <div class="card-body">
                <div>
                  <div class="service-info">
                    <h5 class="card-title2" style='font-size:25px'>${product.title}</h5>
                  </div>
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
                <div>
                <h5 class="modal-title">${product.title}</h5>
                <button class="add-to-cart-btn"><i class="fas ion-ios-cart"></i></button>
                <span class="item-count"></span>
                </div>
                <button type="button" class="btn btn-outline-primary view-cart-btn" style="font-family:inherit;margin:10px">View Cart </button>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="product-images">
                <div class="small-images">
                    ${product.images.map((image, i) => `
                    <img src="${image.src}" class="small-img" alt="${product.title}">
                    `).join('')}
                </div>
                <div class="main-container">
                    <img src="${product.images[0].src}" class="img-fluid main-img" alt="${product.title}">
                </div>
                </div>
                <div class="color-options">
                <h6>Color Options:</h6>
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
            `).join('') || 'No color options available'}
                </div>
                <div class="size-options">
                <h6>Size Options:</h6>
                <select class="size-dropdown">
                ${product.options.find(option => option.name === 'Sizes')?.values
                .filter(size => {
                    const variant = product.variants.find(variant => variant.options.includes(size.id));
                    return variant && variant.is_available;
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
                <p>${product.description}</p>
                <p class='modal-price'>Price: $${product.variants[0]?.price}</p>
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
        sizeDropdown.addEventListener('change', (event) => {
            const selectedSizeId = event.target.value;
            // Implement logic to handle the selected size
        });

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
                product.options.find(option => option.name === 'Color')?.values[selectedColorIndex];;
            const selectedSizeId = sizeDropdown.value;
        
            console.log('Selected Color:', selectedColor);
            console.log('Selected Size ID:', selectedSizeId);
        
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
                    console.log("ah yo",variant.options[1])
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
        
                // Add the selected SKU to the global array
                selectedSKUs.push(selectedVariantSKU);
        
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
                
                console.log("Stored SKUs:", retrievedSKUs);
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

if (window.location.pathname.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', () => {
            // Create an order button
    const orderButton = document.createElement('button');
    orderButton.id = 'orderButton';
    orderButton.classList.add('btn', 'btn-primary', 'order-btn'); 
    orderButton.innerText = 'Order Now';

    // Add a click event listener to the order button
    orderButton.addEventListener('click', handleOrderButtonClick);

    // Insert the order button at the top of the cart container
    const cartContainer = document.getElementById('cart-container');
    cartContainer.parentNode.insertBefore(orderButton, cartContainer);
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
                                    const matchingSKU = matchingVariant.sku;
                                    const existingCartItem = document.querySelector(`.cart-item[data-sku="${matchingSKU}"]`);

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

                                        const matchingImage = product.images.find(image => image.variant_ids.includes(matchingVariant.id));

                                        // Product image
                                        const productImage = document.createElement('img');
                                        productImage.src = matchingImage ? matchingImage.src : '';
                                        productImage.alt = product.title;
                                        productImage.classList.add('col-2', 'img-fluid', 'productimg');

                                        // Product details
                                        const productDetails = document.createElement('div');
                                        productDetails.classList.add('col-8');
                                        productDetails.innerHTML = `
                                        <hr style="border-top: 5px solid black; margin: 1px 0;">
    
                                        <h5 style='font-family: IGLight;'>${product.title}</h5>
                                            <p style="margin: 0;"><span style="font-weight: bold;">Color & Size:</span> ${matchingVariant.title}</p>
                                            <p style="margin: 0;"><span style="font-weight: bold;">Price:</span> $${matchingVariant.price}</p>
                                            <p style="margin: 0;"><span style="font-weight: bold;">Quantity:</span> <span class="quantity">1</span></p>
                                        `;

                                        // Remove item button
                                        const removeItemButton = document.createElement('button');
                                        removeItemButton.innerText = 'Remove';
                                        removeItemButton.classList.add('btn', 'btn-warning', 'col-2', 'remove-btn');
                                        removeItemButton.addEventListener('click', () => {
                                            // Find the index of the item with the matching SKU in the cart
                                            const matchingSKU = matchingVariant.sku;
                                            const quantityElement = cartItem.querySelector('.quantity');
                                            const currentQuantity = parseInt(quantityElement.innerText, 10);

                                            if (currentQuantity > 1) {
                                                // If the quantity is more than 1, decrease it
                                                quantityElement.innerText = currentQuantity - 1;
                                            } else {
                                                // If the quantity is 1, remove the entire cart item
                                                cartItem.parentNode.removeChild(cartItem);
                                            }

                                            // Update selectedSKUs with the filtered array
                                            const updatedSelectedSKUs = selectedSKUs.filter(item => item !== matchingSKU);
                                            updateSelectedSKUs(updatedSelectedSKUs);
                                            console.log(`Remove item with SKU: ${matchingSKU}`);
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

                } else {
                    console.log("Product data is missing or undefined.");
                }
            })
            .catch(error => console.error(error));
    });
}

//ORDER

function handleOrderButtonClick() {
    // Your logic to fetch product data and create cart items goes here
    // ...

    // After fetching and creating cart items, you can make the order API call here
    // For example, you can use the fetch API to make a POST request to the Printify order API

    // Replace 'YOUR_PRINTIFY_API_KEY' with your actual Printify API key

    // Example: Making a POST request to the Printify order API
    fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
            // Handle the response from the order API
            console.log('Order response:', data);
        })
        .catch(error => {
            console.error('Error making order request:', error);
        });
}

