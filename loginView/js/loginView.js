const loginView_center = document.querySelector('.loginView_center');

function loginView_center_logSignChanging() {
    loginView_center.classList.toggle('logSignChanging');
}

function loginView_center_findPassChanging() {
    loginView_center.classList.toggle('findPassChanging');
}

const login_id = document.getElementById('login_id');
const login_password = document.getElementById('login_password');
const signup_id = document.getElementById('signup_id');
const signup_password = document.getElementById('signup_password');
const signup_checkPassword = document.getElementById('signup_checkPassword');
const signup_nickName = document.getElementById('signup_nickName');
const signup_grade = document.getElementById('signup_grade');
const signup_gender = document.getElementById('signup_gender');
const findPass_email = document.getElementById('findPass_email');
const findPass_confirm = document.getElementById('findPass_confirm');

function loginButton_pressed() {
    if(login_id.value === "") {
        alert("아이디를 입력해주세요.");

    } else if(!(login_id.value.includes("@") && login_id.value.includes("."))) {
        alert("올바른 이메일 형식이 아닙니다.");

    } else if(login_password.value === "") {
        alert("비밀번호를 입력해주세요.");

    } else {
        axios.post(`https://dsm-market.ga/auth/login`, {
            "email": login_id.value,
            "password": login_password.value
        })
        .then((response) => {
            if(response.status === 200) {
                alert('login success');
                // console.log(`${typeof response.data.access_token}: ${response.data.access_token}, ${typeof response.data.refresh_token}: ${response.data.refresh_token}`);
                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("refreshToken", response.data.refresh_token);
                window.location.href = '../mainPage/mainPage.html';
            } else if(response.status === 403) {
                alert('incorrect email or password');

            } else if(response.status === 401) {
                alert('invalid access token');

            } else {
                alert(`Error: status code[${response.status}]`);

            }
        })
        .catch((reject) => {
            alert("로그인에 실패하셨습니다." + reject + " and " + reject.response)

        })

    }
    
}

function signupButton_pressed() {
    if(signup_id.value === "") {
        alert("이메일을 입력해주세요.");

    } else if(!(signup_id.value.includes("@") && signup_id.value.includes("."))) {
        alert("올바른 이메일 형식이 아닙니다.");

    } else if(signup_password.value === "") {
        alert("비밀번호를 적어주세요.");

    } else if(signup_password.value !== signup_checkPassword.value) {
        alert("비밀번호가 같지 않습니다.");

    } else if(signup_nickName.value === "") {
        alert("닉네임을 적어주세요.");

    } else if(signup_grade.value === "undefined") {
        alert("학년을 선택하지 않으셨습니다.");

    } else if(signup_gender.value === "undefined") {
        alert("학년을 선택하지 않으셨습니다.");

    } else {
        axios.post(`https://dsm-market.ga/account/join`, {
            email: signup_id.value,
            password: signup_password.value,
            nick: signup_nickName.value,
            grade: parseInt(signup_grade.value),
            gender: signup_gender.value,
        })
        .then((response) => {
            if(response.status === 200) {
                alert('join success');
                loginView_center_logSignChanging()
            } else if(response.status === 403) {
                alert('existent email or existent nick');

            } else {
                alert(`Error: status code[${response.status}]`);

            }
        })
        .catch((reject) => {
            alert("회원가입에 실패하셨습니다." + reject + " and " + reject.response);

        })

    }

}

const loginView_findPassP = document.querySelector('.loginView_findPassP');
let findPassEmailAfterCheck = true;

function findPassButton_pressed() {
    if(findPass_email.value === "" && findPassEmailAfterCheck) {
        alert("이메일을 입력해주세요.");

    } else if(!(findPass_email.value.includes("@") && findPass_email.value.includes(".")) && findPassEmailAfterCheck) {
        alert("올바른 이메일 형식이 아닙니다.");

    } else if(findPass_email.value !== "" && findPass_confirm.value === "" && findPassEmailAfterCheck) {
        // findPassEmailAfterCheck = false;
        axios.post(`https://dsm-market.ga/auth/mail`, {
            email: findPass_email.value,
        })
        .then((response) => {
            if(response.status === 200) {
                console.log('send success');
                loginView_center.classList.toggle('findPassEmailAfter');
            } else {
                console.log(`Error: status code[${response.status}]`);

            }
        })
        .catch((reject) => {
            alert("이메일 인증코드 보내기를 실패하셨습니다." + reject + " and " + reject.response)

        })

    } /*else if(findPass_confirm.value === "") {
        alert("인증번호를 적어주세요.");

    } else {
        axios.post(`/mail/confirm`, {
            email: findPass_email.value,
            code: parseInt(findPass_confirm.value),
        })
        .then((response) => {
            if(response.status === 200) {
                alert('confirm success');
                

            } else if(response.status === 403) {
                alert('incorrect code');

            } else {
                alert(`Error: status code[${response.status}]`);

            }
        })
        .catch((reject) => {
            alert("인증코드 보내기를 실패하셨습니다." + reject + " and " + reject.response);

        })

    }*/
    
}

function loginView_onKeyDown(a) {
    let key_code = event.keyCode;
    if(key_code == '13') {
        switch(a) {
            case 1: loginButton_pressed(); break;
            case 2: signupButton_pressed(); break;
            case 3: findPassButton_pressed(); break;
        }
    }
}
