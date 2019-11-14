
<<<<<<< HEAD
const mainPageItemCarouselShop = document.getElementById('view-item');
=======
const mainPageItemCarouselShop = document.getElementById('asdf');
>>>>>>> ca357dc698ed29cb6b7176c8d4bf22e4a52440c8
// const mainPageItemCarouselRent = document.getElementById('mainPageItemCarouselRent');
function fillItemCarousel(type, data) {
    if(type == 'deal') {
        data.forEach((v) => {
<<<<<<< HEAD

            // <div class="paper">
            //     <div class="paper-holder">
            //         <a href="#">
            //             <img src="image/explosion.png" alt="Unknown Image">
            //         </a>
            //         </div>
            //         <p class="paper-description">익스플로전</p>
            //         <p class="paper-description">5만원</p>
            //         <p class="paper-description"><a id="category" href="#">#생필품</a></p>
            //         <div class="paper-content">
            //         <p class="paper-text">압둘알리</p>
            //     </div>
            // </div>

            let mainPage_itemCarousel_content = document.createElement('div');
            mainPage_itemCarousel_content.setAttribute('class', 'paper');
=======
            let mainPage_itemCarousel_content = document.createElement('div');
            mainPage_itemCarousel_content.setAttribute('class', 'mainPage_itemCarousel_content');
>>>>>>> ca357dc698ed29cb6b7176c8d4bf22e4a52440c8
            mainPage_itemCarousel_content.addEventListener('click', () => {
                itemClicked(v.postId, 0);
                popup_showItem.classList.remove("hidden");
            })
            mainPage_itemCarousel_content.innerHTML += `
<<<<<<< HEAD
            <div class="paper-holder">
                <a href="#">
                    <img src="${v.img}" alt="Unknown Image" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';">
                </a>
            </div>
            <p class="paper-description">${v.title}</p>
            <p class="paper-description">${v.price}</p>
            <div class="paper-content">
                <p class="paper-text"></p>
            </div>
=======
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
>>>>>>> ca357dc698ed29cb6b7176c8d4bf22e4a52440c8
            `
            mainPageItemCarouselShop.appendChild(mainPage_itemCarousel_content);
            // mainPageItemCarouselShop.innerHTML += `
            // <div class="mainPage_itemCarousel_content" onclick="itemClicked(${v.postId}, 0)">
            //     <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
            //     <div class="mainPage_itemCarousel_content_namePrice">
            //         <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
            //         <p class="mainPage_itemCarousel_content_price">${v.price}</p>
            //     </div>
            // </div>`
            // popupOpen();
        });
    } else if(type == 'rent') {
        data.forEach((v) => {
            let mainPage_itemCarousel_content = document.createElement('div');
            mainPage_itemCarousel_content.setAttribute('class', 'mainPage_itemCarousel_content');
            mainPage_itemCarousel_content.addEventListener('click', () => {
                itemClicked(v.postId, 1);
                popup_showItem.classList.remove("hidden");
            })
            mainPage_itemCarousel_content.innerHTML += `
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
            `
            mainPageItemCarouselRent.appendChild(mainPage_itemCarousel_content);
            // mainPageItemCarouselRent.innerHTML += `
            // <div class="mainPage_itemCarousel_content" onclick="itemClicked(${v.postId}, 1)">
            //     <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
            //     <div class="mainPage_itemCarousel_content_namePrice">
            //         <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
            //         <p class="mainPage_itemCarousel_content_price">${v.price}</p>
            //     </div>
            // </div>`
            // popupOpen();
        });
    } else {
        console.log('deal or rent fail');
    }
}

(function getDealList() {
    axios.get(`https://dsm-market.ga/list/deal`, {
        params: {
            "page": 1,
<<<<<<< HEAD
            "pagesize": 5
=======
            "pagesize": 4,
            "search": "",
            "category": "",
>>>>>>> ca357dc698ed29cb6b7176c8d4bf22e4a52440c8
        },
        headers: {
            "Authorization": localStorage.getItem("accessToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('9. refer success(Deal)');
            fillItemCarousel('deal', response.data.list);
        } else if(response.status === 401) {
            console.log('3. invalid access token(Deal)');

        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("상품 조회에 실패하셨습니다." + reject + " and " + Promise.reject(reject.response));
        if(reject.response.status === 401) {
            reissuanceToken();
        }

    })
})()
function getRentList() {
    axios.get(`https://dsm-market.ga/list/rent`, {
        params: {
            "page": 1,
            "pagesize": 4,
            "search": "",
            "category": "",
        },
        headers: {
            "Authorization": localStorage.getItem("accessToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('9. refer success(rent)');
            fillItemCarousel('rent', response.data.list);
        } else if(response.status === 401) {
            console.log('3. invalid access token(rent)');

        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("대여 조회에 실패하셨습니다." + reject + " and " + Promise.reject(reject.response));
        if(reject.response.status === 401) {
            reissuanceToken();
        }

    })
}
