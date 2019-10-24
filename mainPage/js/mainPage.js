window.addEventListener('load', () => {
    isUserLogin();
    setBackground();
})

function isUserLogin() {
    axios.get(`https://dsm-market.ga/auth/login`, {
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
    axios.get(`https://dsm-market.ga/user/nick`, {
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
    axios.get(`https://dsm-market.ga/token`, {
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
function fillItemCarousel(type, data) {
    if(type == 'deal') {
        data.forEach((v) => {
            let mainPage_itemCarousel_content = document.createElement('div');
            mainPage_itemCarousel_content.setAttribute('class', 'mainPage_itemCarousel_content');
            mainPage_itemCarousel_content.addEventListener('click', () => {
                itemClicked(v.postId, 0);
                popup_showItem.classList.remove("hidden");
            })
            mainPage_itemCarousel_content.innerHTML += `
                <div class="mainPage_itemCarousel_content_image"><img src="${v.img}" onError="this.src='https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg';"></div>
                <div class="mainPage_itemCarousel_content_namePrice">
                    <h6 class="mainPage_itemCarousel_content_name">${v.title}</h6>
                    <p class="mainPage_itemCarousel_content_price">${v.price}</p>
                </div>
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

function getDealList() {
    axios.get(`https://dsm-market.ga/list/deal`, {
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

const popup_showItem = document.getElementById('popup_showItem');
const popup_showItemClose = document.getElementById('popup_showItemClose');

// function popupOpen() {
//     const mainPage_itemCarousel_content = document.querySelectorAll(".mainPage_itemCarousel_content");
//     mainPage_itemCarousel_content.forEach((e) => {
//         e.addEventListener('click', () => {
//             popup_showItem.classList.remove("hidden");
//         })
//     })
// }

popup_showItemClose.addEventListener('click', () => {
    popup_showItem.classList.add("hidden");
})

popup_showItem.addEventListener('click', () => {
    popup_showItem.classList.add("hidden");
})

document.getElementById("popup_showItemBox").addEventListener('click', () => {
    event.stopPropagation();
})

function itemClicked(postId, type) {
    axios.get(`https://dsm-market.ga/post`, {
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

let itemData = {
    responseData: [],
    type: 0,
    postId: 0
};

function fillItemModal(data, type, postId) {
    itemData.responseData = data;
    itemData.type = type;
    itemData.postId = postId;
    while (popup_showItemImgs.hasChildNodes()) {
        popup_showItemImgs.removeChild(popup_showItemImgs.firstChild);
    }
    
    if(type == 1) {
        console.log(data.possible_time)
        if(data.possible_time != "") {
            popup_shoItemPossible_time.parentElement
            popup_shoItemPossible_time.innerText = data.possible_time;
        } else {
            popup_shoItemPossible_time.innerText = "";
        }
        let imgBox = document.createElement('li');
        let img = document.createElement('img');
        img.setAttribute('src', data.img);
        img.setAttribute('onError', 'this.src="https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg";');
        imgBox.appendChild(img);
        popup_showItemImgs.appendChild(imgBox);
        popup_showItemImg.setAttribute('src', data.img);
    } else {
        popup_shoItemPossible_time.innerText = "";
        data.img.forEach((v) => {
            let imgBox = document.createElement('li');
            let img = document.createElement('img');
            img.setAttribute('src', v);
            img.setAttribute('onError', 'this.src="https://cdn-images-1.medium.com/max/1200/1*6kEev2FT9fMgGqWhNJSfPg.jpeg";');
            imgBox.appendChild(img);
            imgBox.addEventListener('click', () => {
                popup_showItemImg.setAttribute('src', v);
            })
            popup_showItemImgs.appendChild(imgBox);
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
        popup_showItemLike.setAttribute('onClick', `changeLike(true)`);
        popup_showItemLike.classList.add('popup-showItem_filledLike');
    } else {
        popup_showItemLike.setAttribute('onClick', `changeLike(false)`);
        popup_showItemLike.classList.remove('popup-showItem_filledLike');
    }
    getComments();
}

function getComments() {
    axios.get(`https://dsm-market.ga/comment`, {
        params: {
            "postId": itemData.postId,
            "type": itemData.type,
        },
        headers: {
            "Authorization" : localStorage.getItem("accessToken"),
        }
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('9(refer success)');
            fillComment(response.data.list);
        } else if(response.status === 410) {
            console.log('11(non-existent)');
        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("댓글조회에 실패하셨습니다." + reject + " and " + reject.response);
    })
}

const popup_showItemComment = document.getElementById('popup_showItemComment');

function fillComment(data) {
    popup_showItemComment.innerHTML = '';
    if(data.length > 0) {
        data.forEach((v) => {
            popup_showItemComment.innerHTML += `
                <div class="popup-showItem_comment">
                    <div>
                        <p>${v.nick}</p>
                        <div>
                            <p>${v.createdAt.substring(0, v.createdAt.indexOf('T'))}</p>
                            <a></a>
                        </div>
                    </div>
                    <div>${v.content}</div>
                </div>
            `
        })
    } else {
        popup_showItemComment.innerHTML = `
            <div class="popup-showItem_comment">
                <div></div>
                <div>댓글이 없습니다.</div>
            </div>
        `
    }
}

const popup_showItemAddCommentB = document.getElementById('popup_showItemAddCommentB');

popup_showItemAddCommentB.addEventListener('click', () => {
    let popup_showItemAddComment = document.createElement('textarea');
    popup_showItemAddComment.setAttribute('id', 'popup_showItemAddComment');
    popup_showItemAddComment.addEventListener('keydown', (e) => {
        if(e.keyCode === 13 && popup_showItemAddComment.value != "") {
            event.preventDefault();
            addComment(popup_showItemAddComment.value);
        }
    })
    popup_showItemComment.prepend(popup_showItemAddComment);
})

function addComment(content) {
    axios.post(`https://dsm-market.ga/post/comment`, {
        "postId": itemData.postId,
        "content": content,
        "type": itemData.type,
    }, {
        headers: {
            "Authorization": localStorage.getItem("accessToken"),
        }, 
    })
    .then((response) => {
        if(response.status === 200) {
            console.log('12(comment adding success)');
            getComments();
        } else {
            console.log(`Error: status code[${response.status}]`);

        }
    })
    .catch((reject) => {
        console.log("댓글등록에 실패하셨습니다." + reject + " and " + reject.response);

    })
}

function changeLike(licked) {
    if(licked){
        axios.patch(`https://dsm-market.ga/post/uninterest`, {
            "postId": itemData.postId,
            "type": itemData.type,
        }, {
            headers: {
                "Authorization": localStorage.getItem("accessToken"),
            }, 
        })
        .then((response) => {
            if(response.status === 200) {
                console.log('likeSuccess');
                popup_showItemLike.setAttribute('onClick', `changeLike(false)`);
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
    } else {
        axios.patch(`https://dsm-market.ga/post/interest`, {
            "postId": itemData.postId,
            "type": itemData.type,
        }, {
            headers: {
                "Authorization": localStorage.getItem("accessToken"),
            }, 
        })
        .then((response) => {
            if(response.status === 200) {
                console.log('likeSuccess');
                popup_showItemLike.setAttribute('onClick', `changeLike(true)`);
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
    }
}

const popup_showItemReport = document.getElementById('popup_showItemReport');
const popup_itemReport = document.getElementById('popup_itemReport');

popup_showItemReport.addEventListener('click', () => {
    popup_itemReport.classList.remove('hidden');
})



const popup_showImg = document.getElementById('popup_showImg');
const popup_showImgImage = document.getElementById('popup_showImgImage');

popup_showItemImg.addEventListener('click', () => {
    popup_showImg.classList.remove('hidden');
    let imgSrc = popup_showItemImg.getAttribute('src');
    popup_showImgImage.setAttribute('src', imgSrc);
    popup_showImgImage.style.height = popup_showItemImg.naturalHeight;
})

popup_showImg.addEventListener('click', () => {
    popup_showImg.classList.add('hidden');
})

const aside_chatting = document.getElementById('aside_chatting');

document.getElementById('aside_chatting_show').addEventListener('click', () => {
    aside_chatting.classList.toggle('goRight');
})

document.getElementById('popup_showItemChatting').addEventListener('click', () => {
    popup_showItem.classList.add('hidden');
    aside_chatting.classList.remove('goRight');
});