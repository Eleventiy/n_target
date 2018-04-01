$(function () {

	// PageScroll2ID
	$(window).on("load",function(){
		$('a[rel="m_PageScroll2id"]').mPageScroll2id();
	});

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
	$('#formContact').validate({
		messages: {
			'c-user-name': {
				required: 'Please specify your name'
			},
			'c-user-email': {
				required: 'Please specify your email',
				email: 'To continue, please enter a valid email address'
			},
			'c-user-message': {
				required: 'Please specify your message'
			}
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
	$('.header-nav__link').click(function () {
		$('#mobileMenu').removeClass('is-open');
		$('#mobileOverlay').removeClass('is-open');
		$('body').removeClass('overlayed');
	});


	// Slide images on "Preview" section
	$('#nextPreviewSlide').click(function () {
		$('.preview-box:nth-child(3)').addClass('is-active');
		$('.preview-box:nth-child(4)').removeClass('is-active');

		return false;
	});

	$('#prevPreviewSlide').click(function () {
		$('.preview-box:nth-child(4)').addClass('is-active');
		$('.preview-box:nth-child(3)').removeClass('is-active');

		return false;
	});

	// Slide toggle "Contact form"
	$('#contactFormLink').click(function () {
		$('#contactForm').slideToggle("slow");

		return false;
	});

});
