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
		// Check if you are on the homepage (index.html)
		if (window.location.pathname === '/') {
		  // Get references to the loading screen and the loader (logo)
		  const loadingScreen = document.querySelector('.loading-screen');
		  const loader = document.querySelector('.loader');
	  
		  // Create an animation that fades in the loader
		  setTimeout(function () {
			loader.style.opacity = 1;
		  }, 1000); // Adjust the delay to control when the loader appears
	  
		  // When the loader animation is complete (after 3 seconds), hide the loading screen
		  setTimeout(function () {
			loadingScreen.style.opacity = 0;
			setTimeout(function () {
			  loadingScreen.style.display = 'none';
			}, 2000); // Adjust the delay to control when the loading screen disappears
		  }, 2000); // Adjust the duration to match your desired 3-second loading animation
		}
	  });
	  
	
	