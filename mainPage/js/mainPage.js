window.addEventListener('load', () => {
    isUserLogin();
    setBackground();
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
            getDealList();
            getRentList();
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
function fillItemCarousel(dR, data) {
    if(dR == 'deal') {
        data.forEach((v) => {
            mainPageItemCarouselShop.innerHTML += `
            <div class="mainPage_itemCarousel_content" onclick="itemClicked(${v.postId}, 0)">
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
            </div>`
            popupOpen();
        });
    } else if(dR == 'rent') {
        data.forEach((v) => {
            mainPageItemCarouselRent.innerHTML += `
            <div class="mainPage_itemCarousel_content" onclick="itemClicked(${v.postId}, 1)">
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
            </div>`
            popupOpen();
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

const popup_showItemTitle = document.getElementById('popup_showItemTitle');
const popup_showItemAuthor = document.getElementById('popup_showItemAuthor');
const popup_showItemCreatedAt = document.getElementById('popup_showItemCreatedAt');
const popup_showItemContent = document.getElementById('popup_showItemContent');
const popup_showItemCategory = document.getElementById('popup_showItemCategory');
const popup_showItemPrice = document.getElementById('popup_showItemPrice');
const popup_shoItemPossible_time = document.getElementById('popup_shoItemPossible_time');

const popup_showItemLike = document.getElementById('popup_showItemLike');

function fillItemModal(data, dealRent, postId) {
    sessionStorage.setItem('itemData', [data, dealRent, postId])
    while (popup_showItemImgs.hasChildNodes()) {
        popup_showItemImgs.removeChild(popup_showItemImgs.firstChild);
    }
    
    if(dealRent == 1) {
        console.log(data.possible_time)
        if(data.possible_time != "") {
            popup_shoItemPossible_time.parentElement
            popup_shoItemPossible_time.innerText = data.possible_time;
        } else {
            popup_shoItemPossible_time.innerText = "";
        }
        popup_showItemImgs.innerHTML += `
        <li>
            <img src="${data.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';">
        </li>`
        popup_showItemImg.setAttribute('src', data.img);
    } else {
        popup_shoItemPossible_time.innerText = "";
        data.img.forEach((v, i) => {
            popup_showItemImgs.innerHTML += `
            <li>
                <img src="${v}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';">
            </li>`
        });
        popup_showItemImg.setAttribute('src', data.img[0]);
    }

    popup_showItemTitle.innerText = data.title;
    popup_showItemAuthor.innerText = data.author;
    popup_showItemCreatedAt.innerText = data.createdAt.substring(0, data.createdAt.indexOf('T'));
    popup_showItemContent.innerText = data.content;
    popup_showItemCategory.innerText = data.category;
    popup_showItemPrice.innerText = data.price;
    if(data.interest) {
        popup_showItemLike.setAttribute('onClick', `changeLike(${postId}, ${dealRent}, 1)`);
        popup_showItemLike.classList.add('popup-showItem_filledLike');
    } else {
        popup_showItemLike.setAttribute('onClick', `changeLike(${postId}, ${dealRent}, 0)`);
        popup_showItemLike.classList.remove('popup-showItem_filledLike');
    }
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
            fillItemModal(response.data, type, postId);
        } else if(response.status === 401) {
            console.log('itemClickedFail');
            reissuanceToken();
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

const popup_showItem = document.getElementById('popup_showItem');
const popup_showItemClose = document.getElementById('popup_showItemClose');

function popupOpen() {
    const mainPage_itemCarousel_content = document.querySelectorAll(".mainPage_itemCarousel_content");
    mainPage_itemCarousel_content.forEach((e) => {
        e.addEventListener('click', () => {
            popup_showItem.classList.remove("hidden");
        })
    })
}

popup_showItemClose.addEventListener('click', () => {
    popup_showItem.classList.add("hidden");
})

popup_showItem.addEventListener('click', () => {
    popup_showItem.classList.add("hidden");
})

document.getElementById("popup_showItemBox").addEventListener('click', () => {
    event.stopPropagation();
})

function changeLike(postId, type, likeType) {
    console.log("postId: " + postId, "type: " + type, localStorage.getItem("accessToken"))
    if(likeType == 0){
        axios.patch(`http://52.78.148.203/post/interest`, {
            "postId": postId,
            "type": type,
        }, {
            headers: {
                "Authorization": localStorage.getItem("accessToken"),
            }, 
        })
        .then((response) => {
            if(response.status === 200) {
                console.log('likeSuccess');
                popup_showItemLike.setAttribute('onClick', `changeLike(${postId}, ${type}, 1)`);
                popup_showItemLike.classList.add('popup-showItem_filledLike');
            } else if(response.status === 401) {
                console.log('likeFail');
                reissuanceToken();
            } else if(response.status === 410) {
                console.log('likeFail');

            } else {
                console.log(`Error: status code[${response.status}]`);

            }
        })
        .catch((reject) => {
            console.log("상품 관심표시에 실패하셨습니다." + reject + " and " + reject.response);

        })
    } else if(likeType == 1) {
        axios.patch(`http://52.78.148.203/post/uninterest`, {
            "postId": postId,
            "type": type,
        }, {
            headers: {
                "Authorization": localStorage.getItem("accessToken"),
            }, 
        })
        .then((response) => {
            if(response.status === 200) {
                console.log('likeSuccess');
                popup_showItemLike.setAttribute('onClick', `changeLike(${postId}, ${type}, 0)`);
                popup_showItemLike.classList.remove('popup-showItem_filledLike');
            } else if(response.status === 401) {
                console.log('likeFail');
                reissuanceToken();
            } else if(response.status === 410) {
                console.log('likeFail');

            } else {
                console.log(`Error: status code[${response.status}]`);

            }
        })
        .catch((reject) => {
            console.log("상품 관심취소에 실패하셨습니다." + reject + " and " + reject.response);

        })
    }
}






