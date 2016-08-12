var winw; 
var winh; 
function checkwidth(){
	winw = window.innerWidth; 
	winh = window.innerHeight;
	console.log(winw); 
	console.log(winh); 
	var scroll = $(document).scrollTop(); 
	if (winw >= 768) {
		if (scroll <= 25){
			$('.navbar.navbar-fixed-top').removeClass('onscroll');
		} else {
			$('.navbar.navbar-fixed-top').addClass('onscroll'); 
		}
		$(window).scroll(function (event) {
			scroll = $(document).scrollTop(); 
			if (scroll <= 25){
				$('.navbar.navbar-fixed-top').removeClass('onscroll');
			} else {
				$('.navbar.navbar-fixed-top').addClass('onscroll'); 
			}
		});
	} else {
		$('.navbar,navbar-fixed-top').addClass('onscroll')
		$(window).scroll(function (event) {
			scroll = $(document).scrollTop(); 
			$('.navbar.navbar-fixed-top').addClass('onscroll')
		})
	};
};

$(window).scroll(function(){
	if (winw >= 768) {
		var posicion =  ($(window).scrollTop() * 0.50);	
		$('.jumbotron-container').css({
			'background-position': 'center -' + posicion + 'px'
		});
	} else {
		$('.jumbotron-container').css({
			'background-position': 'center center'
		});
	}
});

$(document).ready(checkwidth()); 
$(window).resize(function(){checkwidth()});