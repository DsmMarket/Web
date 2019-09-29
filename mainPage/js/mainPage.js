window.addEventListener('load', () => {
    isUserLogin();
    setBackground();
    getDealList();
    getRentList();
})

function isUserLogin() {
    axios.get(`http://52.78.148.203/auth/login`, {
        headers: {
            "Authorization" : localStorage.getItem("accessToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('1. login success');
            getNickName();
        } else if(response.status === 401) {
            console.log('3. invalid access token');
            changeLoginOut(1);
            reissuanceToken();
        } else {
            console.log(`Error: status code[${response.status}]`);
            changeLoginOut(1);

        }
    })
    .catch((reject) => {
        console.log("로그인에 실패하셨습니다." + reject + " and " + reject.response);
        changeLoginOut(1);
        reissuanceToken();
    })
}

function getNickName() {
    axios.get(`http://52.78.148.203/user/nick`, {
        headers: {
            "Authorization" : localStorage.getItem("accessToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('Nick success');
            changeLoginOut(response.data.nick);
        } else if(response.status === 401) {
            console.log('Nick fail');
            changeLoginOut('Null');
        } else {
            console.log(`Error: status code[${response.status}]`);
            changeLoginOut('Null');
        }
    })
    .catch((reject) => {
        console.log("닉네임 얻기에 실패하셨습니다." + reject + " and " + reject.response);
        changeLoginOut('Null');
    })
}

function changeLoginOut(v) {
    const mainPageLoginLogout = document.getElementById('mainPageLoginLogout');
    if(v === 1) {
        mainPageLoginLogout.innerHTML += `<a href="../loginView/loginView.html">log in / sign up</a>`
    } else {
        mainPageLoginLogout.innerHTML += `<p>${v}님</p><a onclick="logout()">log out</a>`
    }
}

function reissuanceToken() {
    axios.get(`http://52.78.148.203/token`, {
        headers: {
            "Authorization": localStorage.getItem("refreshToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('5. refresh success');
            localStorage.setItem("accessToken", response.data.access_token);
            window.location.reload(true);
        } else if(response.status === 401) {
            console.log('4. relogin is required');
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("access토큰 재발급에 실패하셧습니다." + reject + " and " + reject.response);

    })
}

function logout() {
    localStorage.clear();
    window.location.reload(true);
}

function setBackground() {
    const mainPage = document.querySelector('.mainPage');
    const timeN = new Date();

    if(timeN.getHours() <= 6 || timeN.getHours() >= 19) {
        document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?night,city")';
        mainPage.classList.toggle('night');
    } else {
        document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?morning,city")';
    }
}


const mainPageItemCarouselShop = document.getElementById('mainPageItemCarouselShop');
const mainPageItemCarouselRent = document.getElementById('mainPageItemCarouselRent');
let title;
function fillItemCarousel(dR, data) {
    if(dR == 'deal') {
        data.forEach((v) => {
            if(v.title.length >= 9){title = v.title.substr(0, 9) + "..."}else{title = v.title}
            mainPageItemCarouselShop.innerHTML += `
            <div class="mainPage_itemCarousel_content" onclick="itemClicked(${v.postId}, 0)">
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
            </div>`
        });
        popupOpen();
    } else if(dR == 'rent') {
        data.forEach((v) => {
            if(v.title.length >= 9){title = v.title.substr(0, 9) + "...";}else{title = v.title;}
            mainPageItemCarouselRent.innerHTML += `
            <div class="mainPage_itemCarousel_content" onclick="itemClicked(${v.postId}, 1)">
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
            </div>`
        });
    } else {
        console.log('deal or rent fail');
    }
}

function getDealList() {
    axios.get(`http://52.78.148.203/list/deal`, {
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
            console.log('9. refer success(Deal)');
            fillItemCarousel('deal', response.data.list);
        } else if(response.status === 401) {
            console.log('3. invalid access token(Deal)');

        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("상품 조회에 실패하셨습니다." + reject + " and " + reject.response);

    })
}
function getRentList() {
    axios.get(`http://52.78.148.203/list/rent`, {
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
        console.log("대여 조회에 실패하셨습니다." + reject + " and " + reject.response);

    })
}


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

const popup_showItemImg = document.getElementById('popup_showItemImg');
const popup_showItemImgs = document.getElementById('popup_showItemImgs');

function fillItemModal(data, dealRent) {
    while (popup_showItemImgs.hasChildNodes()) {
        popup_showItemImgs.removeChild(popup_showItemImgs.firstChild);
    }
    data.img.forEach((v, i) => {
        popup_showItemImgs.innerHTML += `
        <li>
            <img src="${v}">
        </li>`
    });
    popup_showItemImg.setAttribute('src', data.img[0]);
}

function itemClicked(postId, type) {
    axios.get(`http://52.78.148.203/post`, {
        params: {
            "postId": postId,
            "type": type,
        },
        headers: {
            "Authorization": localStorage.getItem("accessToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('itemClickedSuccess');
            fillItemModal(response.data, type);
        } else if(response.status === 410) {
            console.log('itemClickedFail');

        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("개별 상품 조회에 실패하셨습니다." + reject + " and " + reject.response);

    })
}

const popup_showItem = document.getElementById("popup_showItem");

function popupOpen() {
    const mainPage_itemCarousel_content = document.querySelectorAll(".mainPage_itemCarousel_content");
    mainPage_itemCarousel_content.forEach((e) => {
        e.addEventListener('click', () => {
            popup_showItem.classList.remove("hidden");
        })
    })
}

popup_showItem.addEventListener('click', () => {
    popup_showItem.classList.add("hidden");
})

document.getElementById("popup_showItemBox").addEventListener('click', () => {
    event.stopPropagation();
})










