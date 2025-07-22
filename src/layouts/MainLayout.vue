<template>
    <div class="main-layout">
        <!-- 상단 헤더 -->
        <header class="header">
            <button class="menu-button" @click="onMenuClick">
                <img src="@/assets/Menu.svg" alt="메뉴" />
            </button>
            <h1 class="logo-text" @click="goToHome">withAI</h1>
            <div class="header-buttons">
                <button class="login-button" @click="goToLogin">
                    <img src="@/assets/Login.svg" alt="로그인" />
                </button>
                <button class="mypage-button" @click="goToMyPage">
                    <img src="@/assets/Profile.svg" alt="마이페이지" />
                </button>
            </div>
        </header>

        <!-- 사이드 메뉴 -->
        <SideMenu v-model="drawer" />

        <!-- 본문 영역 -->
        <v-app>
            <v-main class="main-layout">
                <router-view />
            </v-main>
        </v-app>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SideMenu from '@/components/SideMenu.vue'

const router = useRouter()
const drawer = ref(false)

const onMenuClick = () => {
    drawer.value = !drawer.value
}

const goToMyPage = () => {
    router.push('/mypage')
}
const goToLogin = () => {
    router.push('/login')
}
const goToHome = () => {
    router.push('/home')
}
</script>

<style scoped>
.main-layout {
    background-color: #fafafa;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
}

/* 상단 헤더 */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 153, 0, 0.6);
    backdrop-filter: saturate(180%) blur(10px);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px 20px;
    height: 60px;
    color: #1a1a1a;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1001; /* <-- side-menu보다 높게 설정 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 메뉴 버튼 (왼쪽) */
.menu-button {
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
}

img {
    width: 40px;
    height: 40px;
}

/* 로고 (가운데 정렬) */
.logo-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    color: #524438;
    font-weight: bold;
}

.header-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
}

/* 마이페이지 버튼 (오른쪽) */
.mypage-button {
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.login-button {
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
