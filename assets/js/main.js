$(document).ready(function(){
	$('header .mobile-menu').click(function(){
		$(this).parents('header').toggleClass('mobile-active');
	});

	// Select all links with hashes
	$('a.scroll')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });


		jQuery('#contact-form').submit(function(e){
				var validated = true;
				var form = $(this);

				form.find('input[required],textarea[required]').each(function(){
					if( $(this).val() == '' ) {
						$(this).addClass('input-error');
						validated = false;
					}
					else {
						$(this).removeClass('input-error');
					}
				});

				console.log('Validated 1' + validated);


				// $.ajax({
				// 	url: '/mailer/recaptcha.php',
				// 	type: 'POST',
				// 	data: form.serialize(),
				// 	error: function() {
				// 		alert('An error occured while processing the request. Please try again later.');
				// 	},
				// 	complete : function(data) {

				// 		if(data.responseText == '') {
				// 			validated = true;
				// 			jQuery('#recaptcha-msg').html('');
				// 		} else {
				// 			validated = false;
				// 			jQuery('#recaptcha-msg').html(data.responseText);

				// 		}



						if(validated) {
							console.log('inside validated');

							$.ajax({
								url: '/mailer/mail.php',
								type: 'POST',
								data: form.serialize(),
								error: function() {
									alert('An error occured while processing the request. Please try again later.');
								},
								success: function(response) {
									var data = jQuery.parseJSON(response);
									//alert(data);
									console.log(data);
									if(data.success === true) {
										jQuery('#success-form-msg').html(data.msg).show();
									} else {
										jQuery('#recaptcha-msg').html(data.msg);
									}

								}
							});

							console.log('below ajax');

						}

					// }

				// });



				console.log('below validated');

				e.preventDefault();
			});





});
