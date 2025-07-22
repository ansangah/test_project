<template>
    <!-- 배경 오버레이 -->
    <transition name="fade">
        <div
            v-if="modelValue"
            class="overlay"
            @click.self="close"
        >
          <!-- 사이드 메뉴 영역 -->
            <transition name="slide">
                <div class="side-menu">
                    <!-- 닫기 버튼 -->
                    <button class="close-button" @click="close">×</button>
          
                    <!-- 메뉴 내용 -->
                    <div class="menu-content">
                        <h2 class="menu-title">메뉴</h2>
                        <hr>
                        <ul class="menu-list">
                            <li @click="navigate('/home')">홈</li>
                            <li @click="navigate('/bookmark')">북마크</li>
                            <li @click="navigate('/login')">로그인</li>
                            <li @click="navigate('/mypage')">마이페이지</li>
                            <li @click="navigate('/storage')">보관함</li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const close = () => {
    emit('update:modelValue', false)
}

const navigate = (path: string) => {
    router.push(path)
    close()
}
</script>

<style scoped>
/* 트랜지션 */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(-100%);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* 전체 배경 오버레이 */
.overlay {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
}

/* 사이드 메뉴 */
.side-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 260px;
    height: 100%;
    background: #fefefe;
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: flex;
    flex-direction: column;
}

/* 닫기 버튼 */
.close-button {
    align-self: flex-end;
    margin: 12px;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    transition: color 0.2s;
}
.close-button:hover {
    color: #ff9900;
}

/* 메뉴 내용 */
.menu-content {
    padding: 20px;
    color: #333;
}

.menu-title {
    font-size: 2.0rem;
    margin-bottom: 1rem;
    font-weight: bold;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.menu-list li {
    padding: 15px 0;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s;
    font-size: 21px;
}
.menu-list li:hover {
    color: #ff9900;
}
</style>