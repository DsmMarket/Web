window.addEventListener('load', () => {
    const mainPage = document.querySelector('.mainPage');
    const timeN = new Date();

    if(timeN.getHours() <= 6 || timeN.getHours() >= 19) {
        document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?night,city")';
        mainPage.classList.toggle('night');
    } else {
        document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?morning,city")';
    }
})


const mainPage_itemCarousel = document.querySelector('.mainPage_itemCarousel');

function carouselChangedLeft() {
    mainPage_itemCarousel.classList.remove('carouselShopChangedRight');
    mainPage_itemCarousel.classList.remove('carouselRentChangedRight');
    mainPage_itemCarousel.classList.remove('carouselShopChangedLeft');
    mainPage_itemCarousel.classList.remove('carouselRentChangedLeft');
    if(mainPage_itemCarousel.classList.contains('carouselRent')) {
        mainPage_itemCarousel.classList.add('carouselRentChangedLeft');
        mainPage_itemCarousel.classList.remove('carouselRent');
    } else {
        mainPage_itemCarousel.classList.add('carouselShopChangedLeft');
        mainPage_itemCarousel.classList.add('carouselRent');
    }
}

function carouselChangedRight() {
    mainPage_itemCarousel.classList.remove('carouselShopChangedLeft');
    mainPage_itemCarousel.classList.remove('carouselRentChangedLeft');
    mainPage_itemCarousel.classList.remove('carouselShopChangedRight');
    mainPage_itemCarousel.classList.remove('carouselRentChangedRight');
    if(mainPage_itemCarousel.classList.contains('carouselRent')) {
        mainPage_itemCarousel.classList.add('carouselRentChangedRight');
        mainPage_itemCarousel.classList.remove('carouselRent');
    } else {
        mainPage_itemCarousel.classList.add('carouselShopChangedRight');
        mainPage_itemCarousel.classList.add('carouselRent');
    }
}






