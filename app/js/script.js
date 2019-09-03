$(document).ready(function () {

// nice select
//$('.select-beauty').niceSelect();
// nice select === end

//closeModal() - закрыть окна
//initModal('data-name-attr') - Открыть нужное окно

//modals
var modalState = {
	"isModalShow": false, //state show modal
	"scrollPos": 0
};
$('.modal-content').click(function (event) {
	event.stopPropagation();
});

var openModal = function () {
	if (!$('.modal-layer').hasClass('modal-layer-show')) {
		$('.modal-layer').addClass('modal-layer-show');
		modalState.scrollPos = $(window).scrollTop();
		$('body').css({
			overflow: 'hidden',
			position: 'fixed',
			overflowY: 'hidden',
			top: -modalState.scrollPos,
			width: '100%'
		});
	}
	modalState.isModalShow = true;
};
var closeModal = function () {
	$('.modal-layer').removeClass('modal-layer-show');
	$('body').css({
		overflow: '',
		position: '',
		top: modalState.scrollPos
	});
	$(window).scrollTop(modalState.scrollPos);
	$('.modal').removeClass('modal__show');
	modalState.isModalShow = false;
};

var initModal = function (el) {
	openModal();
	$('.modal').each(function () {
		if ($(this).data('modal') === el) {
			$(this).addClass('modal__show')
		} else {
			$(this).removeClass('modal__show')
		}
	});
	var modalHeightCont = $(window).height();
	$('.modal-filter').height(modalHeightCont);

};

$('.modal-get').click(function () {
	var currentModal = $(this).data("modal");
	initModal(currentModal);
});

$('.modal-layer, .modal-close, .modal-hide').click(function () {
	closeModal();
});
//modals===end

//mobile menu
//Фиксируем скрол
$('.head-toggle--open').click(function(){
	$('body').css({
		overflow: '',
		position: '',
		top: ''
	})
});

$('.head-toggle').click(function(event){
	event.stopPropagation();
	$(this).toggleClass('head-toggle--open');
	$('.slide-menu').toggleClass('slide-menu--open');
	//$('body').toggleClass('body-fix')
});

$('.slide-menu').on("click", function (event) {
	event.stopPropagation();
});

$(document).on("click", function () {
		$('.head-wrap').removeClass('head--up');
		$('.head-toggle').removeClass('head-toggle--open');
		$('.slide-menu').removeClass('slide-menu--open');
		console.log(modalState.isModalShow);
		if(modalState.isModalShow == false){
			$('body').removeClass('body-fix')
	}
});
//mobile menu===end

// fix top-menu
/*var shrinkHeader = 250;
var heightHeader=$('.header').height();
$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if ( scroll >= shrinkHeader ) {
			$('body').css('paddingTop',heightHeader);
			$('.header').addClass('shrink');
		}
		else {
				$('body').css('paddingTop',0);
				$('.header').removeClass('shrink');
		}
});*/

$(window).resize(function(){
	heightHeader=$('.header').height();
});
// fix top-menu === end

// VIDEO
$('.video-bg').vide(
	{
		mp4: 'img/video-2.mp4' //путь к файлу
	},
	{
		muted: true,
		loop: true,
		posterType: "mp4" // нужный тип файлов
});


// VIDEO === end

// item slider
$('.item-slider').slick({
	slidesToShow: 3,
	speed: 500,
	dots:true,
	arrows:false,
	//autoplay: true,
	//fade: true
	//autoplaySpeed: 8000, time between
	customPaging : function(slider, i) {
		return '<span class="dot"></span>';
	}
});
// item slider === end

// === custom arrow el ===
$('.slider-control--right').click(function(){
	$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
});

$('.slider-control--left').click(function(){
	$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
});
// custom arrow el === end

// gallery
$('.gallery-main-slider').slick({
	slidesToShow: 1,
	speed: 500,
	dots:false,
	arrows:false,
	asNavFor: '.gallery-nav-slider',
	responsive: [
		{
			breakpoint: 640,
			settings: "unslick"

		}
	],
});
// gallery === end

// gallery nav
$('.gallery-nav-slider').slick({
	slidesToShow: 5,
	speed: 500,
	dots:false,
	arrows:false,
	//autoplay: true,
	//fade: true
	//autoplaySpeed: 8000, time between
	/*customPaging : function(slider, i) {
		return '<span class="dot"></span>';
	}*/
	asNavFor: '.gallery-main-slider',
	//centerMode: true,
	focusOnSelect: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 480,
			settings: {
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		}
	],
});
// gallery nav === end



// login
	$('.login-switch').click(function(){
		var current = $(this).data('switch');
		console.log(current);
		$('.login-wrap').each(function(){
			if($(this).data('cont')===current){
				$(this).addClass('login-wrap--active');
			} else {
				$(this).removeClass('login-wrap--active');
			}
		})
	});
	$('.login-toggle').click(function(){
		$('.login-toggle').removeClass('login-toggle--active');
		$(this).addClass('login-toggle--active');
	});
// login === end


// TABS
	$(".product-tab-head__el").click(function(){
		var currentTab = $(this).index();
		$(".product-tab-head__el").removeClass('product-tab-head__el--active');
		$(this).addClass('product-tab-head__el--active');
		$(".product-tab-cont__el").each(function(){
			console.log($(this).index());
			if($(this).index()==currentTab){
				$(this).addClass('product-tab-cont__el--active')
			}else{
				$(this).removeClass('product-tab-cont__el--active')
			}
		})
	});
// TABS === end


//increment field
	$('.icr-btn').click(function(){
		$(this).addClass('hidden');
		$(this).next('.elements-icr-block').removeClass('hidden');
		$(this).closest('.item').addClass('item--add');
	});
	$('.incr__minus').click(function (e) {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) - 1;
		count = count < 1 ? 0 : count;
		$input.html(count);
		if(count < 1 ){
			$(this).closest('.basket-list__el').slideUp();
			$(this).closest('.elements-icr-block').addClass('hidden');
			$(this).closest('.item__content').find('.icr-btn').removeClass('hidden');
			$(this).closest('.item').removeClass('item--add');
			//basket show empty state
			$(this).closest('.basket-el').slideUp(function(){
				$(this).remove();
				if($('.basket-el').length < 1){
					$('.basket-empty').removeClass('basket-empty--hidden');
					$('.snacks').remove();
				}
			});
			//basket show empte state === end
			//ingr toggle
			$(this).closest('.add-ingr__el').removeClass('add-ingr__el--active');
			//ingr toggle === end
			count = 1;
			console.log('minus');
			$input.html(count);
			e.stopPropagation();
		}
	});

	$('.incr__plus').click(function () {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) + 1;
		count = count > 100 ? 100 : count;
		$input.html(count);
	});
	//increment field end

	//remove cart el
	$('.basket-el__remove').click(function(){
		$(this).closest('.basket-el').slideUp(function(){
			$(this).remove();
			if($('.basket-el').length < 1){
				$('.basket-empty').removeClass('basket-empty--hidden');
				$('.snacks').remove();
			}
		});
	});
	//remove cart el ===end
});
