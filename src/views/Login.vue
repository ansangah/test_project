<template>
    <div class="login-page">
        <div class="login-box">
            <h1 class="logo-text" @click="goToHome">withAI</h1>
            <p class="description">AI 기술과 함께하는 스마트한 시작,<br>지금 바로 로그인하세요!</p>

            <div class="login-buttons">
                <button class="login-button kakao" @click="handleKakaoLogin">
                    <img src="https://smartnanumi.com/static/media/kakao.16f625b88c905a305ef9.png" alt="Kakao" />
                    <span class="text">카카오로 시작하기</span>
                </button>
                <button class="login-button google" @click="handleGoogleClick">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
                    <span class="text">구글로 시작하기</span>
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang = "ts">
import { useRouter } from 'vue-router'
const router = useRouter()

declare global {
    interface Window {
        Kakao: any
        google: any
    }
}
const google = window.google;


const KAKAO_API_KEY = '0e4d8dec31ed38015f4f5bf080c655d3'

const handleKakaoLogin = () => {
    if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_API_KEY)
        }
        window.Kakao.Auth.login({
            scope: 'profile_nickname',
            success: function (authObj: any) {
                console.log(authObj)
                alert('카카오 로그인 성공')
            },
            fail: function (err: any) {
                console.error(err)
            }
        })
    }
}

const GOOGLE_CLIENT_ID = '415496370992-bpo5p46bqv9uv33tc07pgf6bo5i1cg4l.apps.googleusercontent.com'

const handleGoogleClick = () => {
    const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email openid',
        callback: (tokenResponse: any) => {
            console.log('Google Token Response:', tokenResponse)

            // 사용자 정보 가져오기
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                }
            })
            .then(res => res.json())
            .then(userInfo => {
                  console.log('User Info:', userInfo)
                  alert(`${userInfo.name}님 구글 로그인 성공`)
            })
        }
    })

    client.requestAccessToken()
}

const goToHome = () => {
    router.push('/home')
}
</script>


<style scoped>
.login-page {
    position: fixed; /* absolute → fixed */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999; /* 충분히 큰 값으로 */
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-box {
    background-color: #fafafa;
    border-radius: 20px;
    padding: 3rem 4rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    width: 400px;
    height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo-text {
    font-size: 2.5rem;
    color: #fa7000;
    font-weight: bold;
    margin-bottom: 1rem;
}

.description {
    color: #524438;
    font-size: 1rem;
    margin-bottom: 2rem;
}

.login-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    position: relative;
}

.login-button {
    position: relative;
    width: 63px;
    height: 63px;
    border-radius: 999px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    white-space: nowrap;
    padding-left: 48px;
    padding-right: 1rem;
}

.login-button img {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);
    flex-shrink: 0;
    left: 22px;
}

.login-button:hover {
    width: 220px;
    justify-content: center;
}

.login-button:hover .text {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.1s;
}

.text {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    font-size: 15px;
    font-weight: 500;
    color: #333;
    margin-right: 0.5rem;
}

.login-button.kakao {
    background-color: #FEE500;
}

.login-button.google {
    background-color: white;
}

.login-button.kakao .text {
    color: #3C1E1E;
}

.login-button:not(:hover) .text {
    transition-delay: 0s;
}
</style>