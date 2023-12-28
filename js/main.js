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
	

// Call the function to fetch and display Printify products
// document.addEventListener('DOMContentLoaded', () => {
//     fetchAndDisplayProducts();
// });

//BlOG PAGE - PAGE BUTTONS

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


//ADDRESS OPTIONS AUTOMATION VIA API

function populateCountryOptions() {
	const countrySelect = document.getElementById('countryInput');
	  countries = [
		{ value: '', text: '' },
		{ value: 'CA', text: 'Canada' },
		{ value: 'TT', text: 'Trinidad and Tobago' },
		{ value: 'US', text: 'United States' },
		// Add more countries as needed
	  ];
	

  
	// Clear existing options
	countrySelect.innerHTML = '';
  
	// Add new options based on the countries array
	countries.forEach(country => {
	  const option = document.createElement('option');
	  option.value = country.value;
	  option.text = country.text;
  
	  if (inputValues.country === country.value) {
		option.selected = true;
	  }
  
	  countrySelect.appendChild(option);
	});
	saveInputValues();
}
  
function filterUSRegions(regions) {
// Filter out regions with specific ISO codes
return regions.filter(region => !region.iso2.startsWith('UM-') && !region.iso2.startsWith('VI') && !region.iso2.startsWith('GU'));
}
  
async function region() {
	// Get the selected country
	const selectedCountry = document.getElementById('countryInput').value;
	saveInputValues();
	console.log('Country saved:', selectedCountry);
  
	// Get the region select element
	const regionSelect = document.getElementById('regionInput');
  
	// Clear existing options
	regionSelect.innerHTML = '';
  
	// Set the fetch URL based on the environment
	let fetchURLmap = '';
	if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
	  fetchURLmap = 'http://localhost:5000/maps/regions';
	} else {
	  fetchURLmap = 'https://tm-server-4a2a80557ba4.herokuapp.com/maps/regions';
	}
  
	const apiUrl = `${fetchURLmap}?country=${selectedCountry}`;
  
	try {
	  const response = await fetch(apiUrl);
	  const result = await response.json();
  
	  switch (selectedCountry) {
		case 'CA':
		  // Sort the Canadian regions alphabetically by name
		  const sortedCARegions = result.sort((a, b) => a.name.localeCompare(b.name));
		  addOptions(regionSelect, sortedCARegions.map(state => ({ value: state.iso2, text: state.name })));
		  fetchCities();
		  break;
		case 'TT':
		  // Assuming 'TT' API response contains ISO and name properties
		  // Sort the Trinidad and Tobago regions alphabetically by name
		  const sortedTTRegions = result.sort((a, b) => a.name.localeCompare(b.name));
		  addOptions(regionSelect, sortedTTRegions.map(state => ({ value: state.iso2, text: state.name })));
		  fetchCities();
		  break;
		case 'US':
		  // For 'US', filter out regions with ISO codes starting with "UM-"
		  const filteredUSRegions = filterUSRegions(result);
		  // Sort the American regions alphabetically by name
		  const sortedUSRegions = filteredUSRegions.sort((a, b) => a.name.localeCompare(b.name));
		  addOptions(regionSelect, sortedUSRegions.map(state => ({ value: state.iso2, text: state.name })));
		  fetchCities();
		  break;
		// Add more cases for other countries as needed
		default:
		  // Default case when no country is selected
		  break;
	  }
  
	} catch (error) {
	  console.log('Error fetching states:', error);
	}
  }
  
async function fetchCities() {
// Get the selected country and region
const selectedCountry = document.getElementById('countryInput').value;
const selectedRegion = document.getElementById('regionInput').value;
saveInputValues();
console.log('Region saved:', selectedRegion);

// Set up headers for the API request
const headers = new Headers();
headers.append("Content-Type", "application/json");

let fetchURLmap = '';
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
	fetchURLmap = 'http://localhost:5000/maps/cities';
} else {
	fetchURLmap = 'https://tm-server-4a2a80557ba4.herokuapp.com/maps/cities';
}

const apiUrl = `${fetchURLmap}?country=${selectedCountry}&region=${encodeURIComponent(selectedRegion)}`;

try {
	// Fetch cities data from the server
	const response = await fetch(apiUrl);
	const result = await response.json();

	// Log the result to the console (you can modify this part as needed)
	// console.log(result);

	// Update city dropdown options
	updateCityDropdown(result);
} catch (error) {
	console.log('Error fetching cities:', error);
}
}

function updateCityDropdown(cityData) {
	const citySelect = document.getElementById('cityInput');
  
	// Clear existing options
	citySelect.innerHTML = '';
  
	// Add new options based on the fetched city data
	cityData.forEach(city => {
	  const option = document.createElement('option');
	  option.value = city.name; // Use the 'name' property for the value
	  option.text = city.name; // Display the 'name' property in the dropdown
	  citySelect.appendChild(option);
	});
	saveInputValues();console.log('City saved:',citySelect.value)
}
  
function addOptions(regionSelect, optionsArray, selectedValue) {
// Add options to the select element
optionsArray.forEach(optionText => {
	const option = document.createElement('option');
	option.value = optionText.value;
	option.text = optionText.text;

	// Add a data attribute to store the classification
	option.setAttribute('data-classification', 'region');

	if (selectedValue === optionText) {
	option.selected = true;
	}
	regionSelect.add(option);
});
}