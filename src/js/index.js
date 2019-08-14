
$(() => {
	/*========== NAVBAR TRANSPARENT TO SOLID ==========*/
	if ($(window).scrollTop() > 300) 
	{
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
});