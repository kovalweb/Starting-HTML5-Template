(function() {

	"use strict";
  
	var app = {
		
		init: function() {

			//=== lazy loading effect ===\\
			this.lazyLoading();

			this.setUpListeners();

			//=== Custom scripts ===\\
			this.formingHrefTel();
			this.contentTable();
			this.detectIE();

			//=== Plugins ===\\
			this.iCookies();
			this.device();
			this.popUp();
			this.forms();
			this.scrollToFixed();

		},

		OPTIONSCOOCIES: {
			title: 'Cookies',
			message: 'We use cookies to understand how you use our site, to personalize content and to improve your experience. By continuing to use our site, you accept our use of cookies and revised.',
			delay: 600,
			expires: 30,
			onAccept: function () {
				var myPreferences = $.fn.ihavecookies.cookie();
			},
			moreInfoLabel: '',
			uncheckBoxes: true,
			advancedBtnLabel: '',
		},
 
		setUpListeners: function() {

			//=== Ripple effect for buttons ===\\
			$(".ripple").on("click", this.btnRipple);

			//=== Tab ===\\
			$(".tabs-nav li").on("click", this.tab);

			//=== Accordion ===\\
			$(".accordion-trigger").on("click", this.accordion);
			
			//=== Form field ===\\
			$(".form-field").each(this.input.inputEach);
			$(".form-field-input")
				.on("focus", this.input.inputFocus)
				.on("keyup change", this.input.inputKeyup)
				.on("blur", this.input.inputBlur);
			
		},

		//=== Tab ===\\
		tab: function() {

			var _this = $(this),
				index = _this.index(),
				tabs = _this.closest(".tabs"),
				items = tabs.find(".tabs-item");

			if (!_this.hasClass("active")) {

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");
			
			}

		},

		//=== Accordion ===\\
		accordion: function(e) {

			e.originalEvent.preventDefault();

			var _this = $(this),
				item = _this.closest(".accordion-item"),
				container = _this.closest(".accordion"),
				items = container.find(".accordion-item"),
				content = item.find(".accordion-content"),
				otherContents = container.find(".accordion-content"),
				duration = 300;

			if (!item.hasClass("active")) {
				items.removeClass("active");
				item.addClass("active");
				otherContents.stop(true, true).slideUp(duration);
				content.stop(true, true).slideDown(duration);
			} else {
				content.stop(true, true).slideUp(duration);
				item.removeClass("active");
			}

		},
		
		//=== Form input ===\\
		input: {

			inputEach: function() {

				var _this = $(this),
					val = _this.find(".form-field-input").val();
	
				if (val === "") {
					_this.removeClass("focus");
				} else {
					_this.addClass("focus");
				}
	
			},
			inputFocus: function() {
	
				var _this = $(this),
					wrappInput = _this.parent();
	
				wrappInput.addClass("focus");
	
			},
			inputKeyup: function() {
	
				var _this = $(this),
					val = _this.val(),
					wrappInput = _this.parent();
	
				if (val === "" && !_this.is(":focus")) {
					wrappInput.removeClass("focus");
				} else {
					wrappInput.addClass("focus");
				}
	
			},
			inputBlur: function() {
	
				var _this = $(this),
					val = _this.val(),
					wrappInput = _this.parent();
	
				if(val === "") {
					wrappInput.removeClass("focus"); 
				}
	
			},

		},

		//=== Ripple effect for buttons ===\\
		btnRipple: function(e) {
			
			var _this = $(this),
				offset = $(this).offset(),
				positionX = e.originalEvent.pageX - offset.left,
				positionY = e.originalEvent.pageY - offset.top;
			_this.append("<div class='ripple-effect'>");
			_this
				.find(".ripple-effect")
				.css({
					left: positionX,
					top: positionY
				})
				.animate({
					opacity: 0
				}, 1500, function() {
					$(this).remove();
				});

		},

		//=== Forming href for phone ===\\
		formingHrefTel: function() {

			var linkAll = $('.formingHrefTel'),
				joinNumbToStringTel = 'tel:';

			$.each(linkAll, function () {
				var _this = $(this),
					linkValue = _this.text(),
					arrayString = linkValue.split("");

				for (var i = 0; i < arrayString.length; i++) {
					var thisNunb = app.isNumber(arrayString[i]);
					if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
						joinNumbToStringTel += arrayString[i];
					}
				}

				_this.attr("href", function () {
					return joinNumbToStringTel;
				});
				joinNumbToStringTel = 'tel:'

			});

		},

		isNumber: function(n) {

			return !isNaN(parseFloat(n)) && isFinite(n);

		},
		
		//=== Content table responsive ===\\
		contentTable: function() {

			var contentTable = $(".content");
			if(contentTable.length) {
				
				$.each(contentTable.find("table"), function() {
					$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
				});
				
			}

		},

		//=== Plugins ===\\

		lazyLoading: function() {

			$('.lazy').Lazy({
				effect: 'fadeIn'
			});

		},

		scrollToFixed: function() {

			$('.header-fixed').scrollToFixed({
				preFixed: function() { $(this).addClass("fixed"); },
				postFixed: function() { $(this).removeClass("fixed"); }
			});
			
		},

		iCookies: function() {

			$('body').ihavecookies(this.OPTIONSCOOCIES);

		},

		device: function() {

			if( (device.mobile() || device.tablet()) && device.ios() ) {
				var tempCSS = $('a').css('-webkit-tap-highlight-color');
				$('main, .main-inner').css('cursor', 'pointer')
						 .css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
				$('a').css('-webkit-tap-highlight-color', tempCSS);
			}

		},

		popUp: function() {

			$('.open_popup').popup({
				transition: 'all 0.4s',
				color: '#000000',
				opacity: 0.8
			});

		},

		forms: function() {

			$.validator.addMethod("customemail", function (value, element) {
				return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
			},
				"The email is not a valid email."
			);
			
			$(".сallback_popup_form").validate({
				rules: {
					Name: {
						required: true,
						minlength: 2
					},
					Phone: {
						required: true
					},
					Email: {
						required: true,
						email: true,
						customemail: true
					},
				},
				messages: {
					Name: {
						required: "The name field is required.",
					},
					Phone: {
						required: "The phone field is required.",
					},
					Email: {
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					},
				},
				submitHandler: function(form) {
					var th = $(form),
						popup = th.closest(".popup_style"),
						close = popup.find(".popup_close");
					
					close.click();

					setTimeout(function() {
						th.trigger("reset");
						$(".form-field").removeClass("focus");
					}, 1000);

				}
			});

		},

		//=== detect IE ===\\
		detectIE: function() {

			if(this.detectIECheck()) {
				var body = document.querySelector("body"),
					msg = 'Unfortunately, the browser Internet Explorer you use is outdated and cannot display the site normally. <br> Please open the site in another browser';
				body.classList.add("overflow-hidden");
				body.innerHTML = '<div class="ie-browser"><div class="ie-browser-tr"><div class="ie-browser-td">'+ msg +'</div></div></div>';
			}

		},
		detectIECheck: function() {

			var ua = window.navigator.userAgent;
			  
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}
			  
			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}
			  
			// other browser
			return false;

		}
		
	}
 
	app.init();
 
}());
