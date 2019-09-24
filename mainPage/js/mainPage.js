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
    axios.get(`http://52.78.148.203//user/nick`, {
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
        "refresh_token": localStorage.getItem("refreshToken"),
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






