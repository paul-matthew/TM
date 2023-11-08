(function() {

	"use strict";

	AOS.init({
		ease: 'slide',
		once: true
	});

	var slider = function(){

		var heroSlider = document.querySelectorAll('.hero-slider');

		if ( heroSlider.length > 0 ) {
			var heroSlider = tns({
				container: '.hero-slider',
				items: 1,
				mode: 'carousel',
				autoplay: true,
			  animateIn: 'tns-fadeIn',
		    animateOut: 'tns-fadeOut',
				speed: 700,
				nav: true,
				controls: false,
				autoplayButtonOutput: false,
			});
		}

		var carouselCourses = document.querySelectorAll('.carousel-courses');
		if ( carouselCourses.length > 0 ) {

			var coursesSlider = tns({
				container: '.carousel-courses',
				items: 1,
				mode: 'carousel',
				autoplay: true,
			  animateIn: 'tns-fadeIn',
		    animateOut: 'tns-fadeOut',
				speed: 700,
				nav: true,
				gutter: 20,
				controls: false,
				autoHeight: true,
				autoplayButtonOutput: false,
				responsive:{
					0:{
						items: 1,
						gutter: 0
					},
					600:{
						items: 2,
						gutter: 20
					},
					1000:{
						items: 3,
						gutter: 20
					}
				}
			});

		}

		var carouselSlider = document.querySelectorAll('.carousel-testimony');
		if ( carouselSlider.length > 0 ) {

			var testimonySlider = tns({
				container: '.carousel-testimony',
				items: 1,
				mode: 'carousel',
				autoplay: true,
			  animateIn: 'tns-fadeIn',
		    animateOut: 'tns-fadeOut',
				speed: 700,
				nav: true,
				gutter: 20,
				controls: false,
				autoplayButtonOutput: false,
				responsive:{
					0:{
						items: 1,
						gutter: 0
					},
					600:{
						items: 2,
						gutter: 20
					},
					1000:{
						items: 3,
						gutter: 20
					}
				}
			});

		}

	}
	slider();
	
	//COUNTER
	'use trict';
		// How long you want the animation to take, in ms
		const animationDuration = 2000;
		// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
		const frameDuration = 1000 / 60;
		// Use that to calculate how many frames we need to complete the animation
		const totalFrames = Math.round( animationDuration / frameDuration );
		// An ease-out function that slows the count as it progresses
		const easeOutQuad = t => t * ( 2 - t );


		const numberWithCommas = n => {
			return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}

		// The animation function, which takes an Element
		const animateCountUp = el => {
			let frame = 0;
			const countTo = parseInt( el.innerHTML, 10 );
			// Start the animation running 60 times per second
			const counter = setInterval( () => {
			frame++;
			// Calculate our progress as a value between 0 and 1
			// Pass that value to our easing function to get our
			// progress on a curve
			const progress = easeOutQuad( frame / totalFrames );
			// Use the progress value to calculate the current count
			const currentCount = Math.round( countTo * progress );

			// If the current count has changed, update the element
			if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = numberWithCommas(currentCount);
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
		}, frameDuration );
		};

		// Run the animation on all elements with a class of ‘countup’
		const runAnimations = () => {
			const countupEls = document.querySelectorAll( '.countup' );
			countupEls.forEach( animateCountUp );
		};




		// In Viewed
		var elements;
		var windowHeight;

		function init() {
			elements = document.querySelectorAll('.section-counter');
			windowHeight = window.innerHeight;
		}

		function checkPosition() {
			var i;
			for (i = 0; i < elements.length; i++) {
				var element = elements[i];
				var positionFromTop = elements[i].getBoundingClientRect().top;
			if (positionFromTop - windowHeight <= 0) {
			if( !element.classList.contains('viewed') ) {
			element.classList.add('viewed');
			runAnimations();
			} else {
			if ( element.classList.contains('viewed') ) {

			}
		}

		}
		}
		}

		window.addEventListener('scroll', checkPosition);
		window.addEventListener('resize', init);

		init();
		checkPosition();


	//GLIGHTBOX
	const lightbox = GLightbox({
	  touchNavigation: true,
	  loop: true,
	  autoplayVideos: true
	});


})()



//Services Card pop-up

// Function to open the modal
function openModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.style.display = "block";
  }
  
  // Function to close the modal
  function closeModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.style.display = "none";
  }
  
  // Close modal if the user clicks outside of it
  window.onclick = function (event) {
	var modals = document.querySelectorAll(".portfolio-modal");
	for (var i = 0; i < modals.length; i++) {
	  var modal = modals[i];
	  if (event.target === modal) {
		modal.style.display = "none";
	  }
	}
  };


    // Function to filter FAQ questions based on search keywords
	function filterFAQs() {
		const input = document.getElementById('faqSearch').value.toLowerCase();
		const questions = document.querySelectorAll('h4');
		
		questions.forEach(question => {
		  const text = question.textContent.toLowerCase();
		  const answer = question.nextElementSibling.textContent.toLowerCase();
		  
		  if (text.includes(input) || answer.includes(input)) {
			question.style.display = 'block';
			question.nextElementSibling.style.display = 'block';
		  } else {
			question.style.display = 'none';
			question.nextElementSibling.style.display = 'none';
		  }
		});
	  }

	  //LOADER SCREEN

document.addEventListener('DOMContentLoaded', function () {
  // Check if the current page is the index.html or /TM/
  const currentPage = window.location.pathname;
  if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) {
    // Get references to the loading screen and the loader (logo)
    const loadingScreen = document.querySelector('.loading-screen');
    const loader = document.querySelector('.loader');
    
    // Create an animation that fades in the loader
    setTimeout(function () {
      loader.style.opacity = 1;
    }, 10); // Adjust the delay to control when the loader appears
    
    // When the loader animation is complete (after 3 seconds), hide the loading screen
    setTimeout(function () {
      loadingScreen.style.opacity = 0;
      setTimeout(function () {
        loadingScreen.style.display = 'none';
      }, 1000); // Adjust the delay to control when the loading screen disappears
    }, 2000); // Adjust the duration to match your desired 3-second loading animation
  }
});

  //PRODUCT SEARCHBAR

//   document.addEventListener("DOMContentLoaded", function() {
// 	if (window.location.pathname.endsWith("/shop.html")) {
// 		const products = [
// 			"Product #1",
// 			"Product #2",
// 			"Product #3",
// 		  ];
		  
// 	  const productSearchInput = document.getElementById("productSearch");
// 	  const suggestionListpro = document.getElementById("suggestionListpro");
// 	  const allProductCards = document.querySelectorAll(".card-container");
  
// 	  document.addEventListener("click", function(event) {
// 		if (event.target !== productSearchInput) {
// 		  suggestionListpro.style.display = "none";
// 		}
// 	  });
  
// 	  document.addEventListener("keydown", function(event) {
// 		if (event.key === "Escape") {
// 		  suggestionListpro.style.display = "none";
// 		}
// 	  });
  
// 	  productSearchInput.addEventListener("input", function() {
// 		const inputValuepro = productSearchInput.value.toLowerCase();
// 		suggestionListpro.innerHTML = "";
  
// 		const matchingProducts = products.filter(product =>
// 		  product.toLowerCase().includes(inputValuepro)
// 		);
  
// 		allProductCards.forEach(card => {
// 		  const cardTitleElement = card.querySelector(".card-title2");
// 		  if (cardTitleElement !== null) {
// 			const cardTitle = cardTitleElement.textContent.toLowerCase();
// 			if (
// 			  inputValuepro === "" ||
// 			  matchingProducts.some(product =>
// 				cardTitle.includes(product.toLowerCase())
// 			  )
// 			) {
// 			  card.style.display = "block";
// 			} else {
// 			  card.style.display = "none";
// 			}
// 		  } else {
// 			console.error("Card title element not found");
// 		  }
// 		});
  
// 		matchingProducts.forEach(product => {
// 		  const listItempro = document.createElement("li");
// 		  listItempro.textContent = product;
// 		  listItempro.addEventListener("click", function() {
// 			productSearchInput.value = product;
// 			showProductCard(product);
// 		  });
// 		  suggestionListpro.appendChild(listItempro);
// 		});
  
// 		suggestionListpro.style.display = matchingProducts.length > 0 ? "block" : "none";
// 	  });
  
// 	  function showProductCard(productName) {
// 		const productCardContainer = document.getElementById("productCardContainer");
// 		productCardContainer.innerHTML = ""; // Clear existing content
  
// 		allProductCards.forEach(card => {
// 		  const cardTitleElement = card.querySelector(".card-title2");
// 		  if (cardTitleElement !== null) {
// 			const cardTitle = cardTitleElement.textContent.toLowerCase();
// 			if (cardTitle.includes(productName.toLowerCase())) {
// 			  card.style.display = "block";
// 			  productCardContainer.appendChild(card); // Show the selected product card
// 			  productCardContainer.style.display = "block";
// 			  card.classList.add("center-horizontal"); 
// 			} else {
// 			  card.style.display = "none";
// 			}
// 		  } else {
// 			console.error("Card title element not found");
// 		  }
// 		});
// 	  }
// 	}
//   });
	
//PRINTIFY API

// Fetch Printify products and display on the page
function fetchAndDisplayProducts() {
    const printifyToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6Ijg1Njk0MWYwYWRiNzRmZWYwNTk3MWQ1NDZmYTMyODBlYWQ2YzdmMjBlMWZmYzFiZWZkOTBjNjAyMmZiYTk2Y2ViMWQ3OTQ2ZDA0NTNkNTA3IiwiaWF0IjoxNjk5MDUzNTE4Ljk3NTkyOCwibmJmIjoxNjk5MDUzNTE4Ljk3NTkzLCJleHAiOjE3MzA2NzU5MTguOTY4MTk2LCJzdWIiOiIxNTMxMDg4OCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiXX0.AnouG1li_lIaGjFDcP45lyFGpL5a4bpeI1CYEOte8dleYodgcqyXmYW70nKgFjmgF2sjzDf6CQ_NT-cKwTg'; // Replace with your actual Printify API token
    const shopID = '11876498'; // Replace with your Printify Shop ID
    const url = `https://api.printify.com/v1/shops/${shopID}/products.json`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${printifyToken}`,
            'User-Agent': 'YourAppOrClientName'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        const products = data.data; // Assuming the product details are in the data property

        const productsContainer = document.getElementById('products-container');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productTitle = document.createElement('h2');
            productTitle.textContent = product.title;
            productCard.appendChild(productTitle);

            // Check if images property exists and has length greater than zero
            if (product.images && product.images.length > 0) {
                product.images.forEach(image => {
                    const productImage = document.createElement('img');
                    productImage.src = image.url;
                    productImage.alt = product.title; // Set alt text for accessibility
                    productCard.appendChild(productImage);
                });
            }

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productCard.appendChild(productDescription);

            const productPrice = document.createElement('span');
            productPrice.textContent = `Price: $${product.price}`; // Assuming the price is available in the product object
            productCard.appendChild(productPrice);

            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error('Error fetching Printify products:', error);
        // You might want to display an error message to the user here
    });
}

// Call the function to fetch and display Printify products
// document.addEventListener('DOMContentLoaded', () => {
//     fetchAndDisplayProducts();
// });

//FITPRINT EMBED CODE

// document.addEventListener('DOMContentLoaded', function() {
//     iFrameResize({
//         log: false,
//         checkOrigin: false,
//         heightCalculationMethod: 'grow',
//         autoResize: false,
//         onMessage: function(messageData) {
//             var jsonData = JSON.parse(messageData.message);
//             if (jsonData.action == 'navigateTo') {
//                 window.onbeforeunload = null;
//                 window.parent.location.href = jsonData.data;
//             }
//             if (jsonData.action == 'scrollTo') {
//                 setTimeout(function() {
//                     document.getElementById('fitPrintAnchor').scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 }, 200);
//             }
//         },
//         onInit: function(iframe) {
//             window.addEventListener('scroll', function() {
//                 const scrollFromTop = window.scrollY;
//                 var fitPrintIframe = document.getElementById('fitPrintIframe');
//                 var offset = fitPrintIframe.getBoundingClientRect();
//                 if (scrollFromTop > offset.top + 10) {
//                     iframe.iFrameResizer.sendMessage(scrollFromTop - (offset.top - 10));
//                 }
//             });
//         }
//     }, '#fitPrintIframe');
// });


//BLOG HEADLESS CMS

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
  
  

//BlOG PAGE - SCROLL BUTTONS

document.addEventListener('DOMContentLoaded', function() {
	const urlParams = new URLSearchParams(window.location.search);
	const index = urlParams.get('index');
	
	const paginationList = document.querySelectorAll('.blogpage li');
  
	paginationList.forEach(li => {
	  const anchor = li.querySelector('a');
	  if (anchor && anchor.getAttribute('href').includes(`index=${index}`)) {
		li.classList.add('active');
	  }
	});
  });
  
  

//Blog Full Post

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
  
  //PRINTIFY API

// Fetch products from Printify API
fetch('http://localhost:5000/products')
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
                    <h5 class="card-title2">${product.title}</h5>
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
                <h5 class="modal-title">${product.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img src="${product.images[0].src}" class="img-fluid" alt="${product.title}">
                <p>${product.description}</p>
                <p>Price: $${product.variants[0].price}</p>
                <!-- Add more product details as needed -->
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(productModal);

        productCard.addEventListener('click', () => {
          // Display the product modal here or perform any other actions
        });
      });
    } else {
      console.log("Products data is missing or undefined.");
    }
  })
  .catch(error => console.error(error));  