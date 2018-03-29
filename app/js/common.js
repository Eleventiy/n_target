$(function () {


	// Forms validation
	$('#formPlan').validate({
		rules: {
			'p-user-email': {
				required: true,
				email: true
			},
			'user-accept': 'required',
			'market': 'required'
		},
		messages: {
			'p-user-email': {
				required: 'Please specify your email',
				email: 'To continue, please enter a valid email address'
			},
			'user-accept': 'To continue, please select this box',
			'market': 'To continue, please select an option'
		}
	});


	// Burger menu
	$('#toggleMenu').click(function () {

		$('#mobileMenu').toggleClass('is-open');
		$('#mobileOverlay').toggleClass('is-open');

		if ( $('#mobileOverlay').hasClass('is-open') ) {
			$('body').addClass('overlayed');
		} else {
			$('body').removeClass('overlayed');
		}

	});


	// Slider
	$('#previewSlider').slick({
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: 0,
		variableWidth: true
	});

});
