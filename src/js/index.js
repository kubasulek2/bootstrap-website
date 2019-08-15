
$(() => {
	/*========== NAVBAR TRANSPARENT TO SOLID ==========*/
	if ($(window).scrollTop() > 300) {
		$('.navbar').addClass('solid');
	}


	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('.navbar').addClass('solid');
		} else {
			$('.navbar').removeClass('solid');
		}
	});
	/*========== CLOSE MOBILE NAV ON CLICK ==========*/
	$(document).click(function (event) {
		const clickover = $(event.target),
			_opened = $('.navbar-collapse').hasClass('show');

		if (_opened === true && !clickover.hasClass('navbar-toggler')) {
			$('.navbar-toggler').click();
		}
	});

	/*========== SMOOTH SCROLLING TO LINKS ==========*/

	$('a').click(function (event) {
		if (this.hash !== '') {
			event.preventDefault();
			const hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () { window.location.hash = hash; });
		}

	});

	/*========== ARROW FADE ==========*/
	$(window).scroll(function () {

		$('.arrow').css('opacity', 1 - $(window).scrollTop() / 250);

	});

	/*========== ARROW FADE ==========*/
	$('.loading-btn').click(function () {
		if (!$(this).hasClass('load-two')) {
			$('.row.hidden-one').removeClass('hidden');
			$(this).addClass('load-two');
		} else {
			$('.row.hidden-two').removeClass('hidden');
			$(this).addClass('hidden');

		}
	});
	/*========== TEAM SLIDER ==========*/
	$('#team-slider').owlCarousel({
		items: 3,
		autoplay: true,
		smartSpeed: 700,
		loop: true,
		autoplayHoverPause: true,
		responsive: {
			0:{
				items: 1
			},
			576:{
				items: 2
			},
			768:{
				items: 3
			}
		}
	}
	);

	/*========== PORTFOLIO COUNTER ==========*/
	$('.counter').counterUp({
		delay: 10,
		time: 1800
	});
});