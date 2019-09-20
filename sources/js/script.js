const mainBody = document.querySelector('body');
const menuCatalog = document.querySelector('.menu-catalog');
const menuCatalogGear = document.querySelector('.menu-catalog__active');
const workCatalog = document.querySelector('.workScheme-catalog');
const workCatalogGear = document.querySelector('.workScheme-catalog__active');
// const repairCatalog = document.querySelectorAll('.repair-items__item_img');
// const repairCatalogGear = document.querySelector('.repair-menu-catalog__active');
const addressDescr = document.querySelector('.address-descr');
const addressItem = document.querySelector('.address-item');
const addressMapItem = document.querySelector('.address-map__item');
const modalBody = document.querySelector('.modal-popup-body');
const modalPopup = document.querySelector('.modal-popup');
const showPopup = document.querySelectorAll('.show-popup');
const closePopup = document.querySelector('.modal-popup-close');
const mobileBurger = document.querySelector('.mobile-burger');
const mobileMenu = document.querySelector('.header .menu');
const mobileBurgerCatalog = document.querySelector('.mobile-catalog-burger');
const mobileMenuCatalog = document.querySelector('.header .menu-catalog');
const screenWidth = window.screen.availWidth;


menuCatalog.addEventListener('mouseover', moveMenuGear);
menuCatalog.addEventListener('mouseleave', hideMenuGear);
workCatalog.addEventListener('mouseover', workMoveMenuGear);
workCatalog.addEventListener('mouseleave', workHideMenuGear);
addressItem.addEventListener('click', activeAddressDescr);
closePopup.addEventListener('click', activeClosePopup);
mobileBurger.addEventListener('click', activeMobileBurger);
mobileBurgerCatalog.addEventListener('click', activeMobileBurgerCatalog);
activeShowPopup(); 


// for (let i = 0; i < repairCatalog.length; i++) {
// 	repairCatalog[i].addEventListener('mouseover', repairMoveMenuGear);
// 	repairCatalog[i].addEventListener('mouseleave', repairHideMenuGear);
// }


function activeMobileBurger() {
	if (this.classList.contains('mobile-burger-active')) {
		this.classList.remove('mobile-burger-active');
		mobileMenu.style.top = '-200%';
		mainBody.style.overflow = 'visible';
		mainBody.style.position = 'static';
	} else {
		this.classList.add('mobile-burger-active');
		mobileMenu.style.top = '0';
		mainBody.style.overflow = 'hidden';
		mainBody.style.position = 'fixed';
	}
}

function activeMobileBurgerCatalog() {
	if (this.classList.contains('mobile-catalog-burger-active')) {
		this.classList.remove('mobile-catalog-burger-active');
		mobileMenuCatalog.style.top = '-200%';
		mainBody.style.overflow = 'visible';
		mainBody.style.position = 'static';
		menuCatalog.style.display = 'none';
	} else {
		this.classList.add('mobile-catalog-burger-active');
		mobileMenuCatalog.style.top = '0';
		mainBody.style.overflow = 'hidden';
		mainBody.style.position = 'fixed';
		menuCatalog.style.display = 'flex';
	}
}

function activeShowPopup() {
	for (var i = 0; i < showPopup.length; i++) {
		showPopup[i].addEventListener('click', () => {
			modalPopup.classList.remove('modal-popup-hide');
			modalBody.classList.remove('modal-popup-hide');
			modalPopup.classList.add('modal-popup-active');
			modalBody.classList.add('modal-popup-active');
			mainBody.style.overflow = 'hidden';
		});	
	}
};
function activeClosePopup() {
	modalPopup.classList.remove('modal-popup-active');
	modalBody.classList.remove('modal-popup-active');
	modalPopup.classList.add('modal-popup-hide');
	modalBody.classList.add('modal-popup-hide');
	mainBody.style.overflow = 'visible';
};

function moveMenuGear(e) {
	let { target } = e;
	while(target){
		if (screenWidth < 993) {
			if(target.className === 'menu-catalog-list__link'){
				menuCatalogGear.style.opacity = 1;
				const liArr = target.parentElement.children;
				for(let i = 0; i < liArr.length; ++i){
					liArr[i].style.zIndex = 0;
				}
				target.style.zIndex = '55';
				menuCatalogGear.style.left = `${target.offsetLeft - 64 + target.offsetWidth / 2}px`;
				menuCatalogGear.style.top = `${target.offsetTop - 28 + target.offsetHeight / 2}px`;
				break;
			} else {
				target = target.parentElement;
			}
		} else {
			if(target.className === 'menu-catalog-list__link'){
				menuCatalogGear.style.opacity = 1;
				const liArr = target.parentElement.children;
				for(let i = 0; i < liArr.length; ++i){
					liArr[i].style.zIndex = 0;
				}
				target.style.zIndex = '55';
				menuCatalogGear.style.left = `${target.offsetLeft - 49 + target.offsetWidth / 2}px`;
				break;
			} else {
				target = target.parentElement;
			}
		}
	}
};

function hideMenuGear(e) {
	menuCatalogGear.style.opacity = 0;
};

function workMoveMenuGear(e) {
	let { target } = e;
	while(target){
		if (screenWidth < 993) {
			if(target.className === 'workScheme-catalog-list__link'){
			workCatalogGear.style.opacity = 1;
			const liArr = target.parentElement.children;
			for(let i = 0; i < liArr.length; ++i){
				liArr[i].style.zIndex = 0;
			}
			target.style.zIndex = '55';
			console.log('aaaa');
			workCatalogGear.style.left = `${target.offsetLeft - 68 + target.offsetWidth / 2}px`;
			workCatalogGear.style.top = `${target.offsetTop - 39 + target.offsetHeight / 2}px`;
			break;
			} else {
				target = target.parentElement;
			}
		} else {
			if(target.className === 'workScheme-catalog-list__link'){
				workCatalogGear.style.opacity = 1;
				const liArr = target.parentElement.children;
				for(let i = 0; i < liArr.length; ++i){
					liArr[i].style.zIndex = 0;
				}
				target.style.zIndex = '55';
				workCatalogGear.style.left = `${target.offsetLeft - 58 + target.offsetWidth / 2}px`;
				break;
			} else {
				target = target.parentElement;
			}	
		}
	}
};

function workHideMenuGear(e) {
	workCatalogGear.style.opacity = 0;
};

// function repairMoveMenuGear(e) {
// 	let { target } = e;
	
// 	console.dir(target);
	
// 	while(target){
// 		if(target.className === 'repair-items__item_img'){
// 			let c = this.getBoundingClientRect()
// 			console.log(c);
// 			repairCatalogGear.style.opacity = 1;
// 			const liArr = target.parentElement.children;
// 			for(let i = 0; i < liArr.length; ++i){
// 				liArr[i].style.zIndex = 0;
// 			}
// 			target.style.zIndex = '55';
// 			repairCatalogGear.style.left = `${c.left - 200 + target.offsetWidth / 2}px`;
// 			repairCatalogGear.style.top = `${c.top - 28 + target.offsetHeight / 2}px`;
// 			break;
// 		} else {
// 			target = target.parentElement;
// 		}
// 	}
// };

// function repairHideMenuGear(e) {
// 	repairCatalogGear.style.opacity = 1;
// };

function activeAddressDescr (e) {
	let { target } = e;
	while (target) {
		if(target.parentElement.classList.contains('address-descr') || target.parentElement.className === 'address-item') {
			const descrArr = this.children;
			const mapArr = addressMapItem.children;
			for(let i = 0; i < descrArr.length; ++i) {
				descrArr[i].classList.toggle('address-descr__active');
			}
			for(let x = 0; x < mapArr.length; ++x) {
				mapArr[x].classList.toggle('address-map__active');
			}
			break;
		} else {
			target = target.parentElement;
		}
	}
}

$(document).ready(function(){
	if ($(window).width() < 769) {
		$('.slider').slick({
	  	infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  autoplay: true,
		  autoplaySpeed: 3000,
	  }); 
  } else if( $(window).width() < 1200 ) {
  	$('.slider').slick({
	  	infinite: true,
		  slidesToShow: 2,
		  slidesToScroll: 1,
	    mobileFirst: true,
		  prevArrow: $('.prev'),
			nextArrow: $('.next'),
	  });
  } else {
	  $('.slider').slick({
	  	infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 1,
	    mobileFirst: true,
		  prevArrow: $('.prev'),
			nextArrow: $('.next'),
	  });  
  }
  $('.whatTech-slider').slick({
  	infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 3000,
	  arrows: false,
  });
});

