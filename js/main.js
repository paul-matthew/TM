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

  document.addEventListener("DOMContentLoaded", function() {
	if (window.location.pathname.endsWith("/shop.html")) {
		const products = [
			"Product #1",
			"Product #2",
			"Product #3",
		  ];
		  
	  const productSearchInput = document.getElementById("productSearch");
	  const suggestionListpro = document.getElementById("suggestionListpro");
	  const allProductCards = document.querySelectorAll(".card-container");
  
	  document.addEventListener("click", function(event) {
		if (event.target !== productSearchInput) {
		  suggestionListpro.style.display = "none";
		}
	  });
  
	  document.addEventListener("keydown", function(event) {
		if (event.key === "Escape") {
		  suggestionListpro.style.display = "none";
		}
	  });
  
	  productSearchInput.addEventListener("input", function() {
		const inputValuepro = productSearchInput.value.toLowerCase();
		suggestionListpro.innerHTML = "";
  
		const matchingProducts = products.filter(product =>
		  product.toLowerCase().includes(inputValuepro)
		);
  
		allProductCards.forEach(card => {
		  const cardTitleElement = card.querySelector(".card-title2");
		  if (cardTitleElement !== null) {
			const cardTitle = cardTitleElement.textContent.toLowerCase();
			if (
			  inputValuepro === "" ||
			  matchingProducts.some(product =>
				cardTitle.includes(product.toLowerCase())
			  )
			) {
			  card.style.display = "block";
			} else {
			  card.style.display = "none";
			}
		  } else {
			console.error("Card title element not found");
		  }
		});
  
		matchingProducts.forEach(product => {
		  const listItempro = document.createElement("li");
		  listItempro.textContent = product;
		  listItempro.addEventListener("click", function() {
			productSearchInput.value = product;
			showProductCard(product);
		  });
		  suggestionListpro.appendChild(listItempro);
		});
  
		suggestionListpro.style.display = matchingProducts.length > 0 ? "block" : "none";
	  });
  
	  function showProductCard(productName) {
		const productCardContainer = document.getElementById("productCardContainer");
		productCardContainer.innerHTML = ""; // Clear existing content
  
		allProductCards.forEach(card => {
		  const cardTitleElement = card.querySelector(".card-title2");
		  if (cardTitleElement !== null) {
			const cardTitle = cardTitleElement.textContent.toLowerCase();
			if (cardTitle.includes(productName.toLowerCase())) {
			  card.style.display = "block";
			  productCardContainer.appendChild(card); // Show the selected product card
			  productCardContainer.style.display = "block";
			  card.classList.add("center-horizontal"); 
			} else {
			  card.style.display = "none";
			}
		  } else {
			console.error("Card title element not found");
		  }
		});
	  }
	}
  });
	
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
fetchAndDisplayProducts();


