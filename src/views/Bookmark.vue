<template>
    <div class="bookmark-page">
        <div class="header">
            <input type="checkbox" v-model="headerChecked" @change="toggleAll" />
            <span class="title">북마크</span>
            <div class="actions">
                <div class="tooltip-wrapper">
                    <button class="header-button" @click="isModalOpen = true">
                        <img src = "@/assets/Add.svg" alt="추가" />
                    </button>
                    <div class="tooltip-text">추가</div>
                </div>
                <div class="tooltip-wrapper">
                    <button class="header-button" @click="deleteSelected">
                        <img src = "@/assets/Delete.svg" alt="선택삭제" />
                    </button>
                    <div class="tooltip-text">선택삭제</div>
                </div>
                <div class="tooltip-wrapper">
                    <button class="header-button" @click="showConfirmDeleteModal">
                        <img src = "@/assets/AllDelete.svg" alt="전체삭제" />
                    </button>
                    <div class="tooltip-text">전체삭제</div>
                </div>
            </div>
        </div>
        <hr>
        <br>
        <div class="bookmark-list">
            <div
                class="bookmark-item"
                v-for="(bookmark, index) in bookmarks"
                :key="index"
            >
                <input type="checkbox" v-model="checkedItems[index]" />

                <div class="bookmark-info">
                    <div class="nickname">{{ bookmark.nickname }}</div>
                    <div class="link">{{ bookmark.url }}</div>
                </div>
                
                <div class="button-group">
                    <div class="tooltip-wrapper">
                        <button class="go-button" @click="goToLink(bookmark.url)">
                            <img src = "@/assets/Go.svg" alt="이동" />
                        </button>
                        <span class="tooltip-text">이동</span>
                    </div>
                    <div class="tooltip-wrapper">
                        <button class="action-button">
                            <img src="@/assets/Newest.svg" alt="최신" />
                        </button>
                        <span class="tooltip-text">최신</span>
                    </div>
                    <div class="tooltip-wrapper">
                        <button class="action-button" @click="openEditModal(index)">
                            <img src="@/assets/Modify.svg" alt="수정" />
                        </button>
                        <span class="tooltip-text">수정</span>
                    </div>
                    <div class="tooltip-wrapper">
                        <button class="action-button" @click="deleteBookmark(index)">
                            <img src="@/assets/Close.svg" alt="삭제" />
                        </button>
                        <span class="tooltip-text">삭제</span>
                    </div>
                </div>
            </div>
        </div>
          <!-- 북마크 추가 모달 -->
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
            <div class="modal-box">
                <h3>{{ isEditMode ? '북마크 수정' : '북마크 추가' }}</h3>
                <input v-model="newNickname" type="text" placeholder="별명" />
                <input v-model="newUrl" type="text" placeholder="URL" />
                <div class="modal-actions">
                    <button @click="isEditMode ? saveEditedBookmark() : addBookmark()">
                        {{ isEditMode ? '수정' : '저장' }}
                    </button>
                    <button @click="closeModal">취소</button>
                </div>
            </div>
        </div>
        
        <!-- 전체 삭제 확인 모달 -->
        <div
          v-if="confirmDeleteModalOpen"
          class="modal-overlay"
          @click.self="cancelDeleteAll"
        >
            <div class="modal-box">
                <h3 style="font-weight: bold;">전체 삭제하시겠습니까?</h3>
                <div class="modal-actions">
                <button @click="confirmDeleteAll">확인</button>
                <button @click="cancelDeleteAll">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const isEditMode = ref(false)
const editIndex = ref<number | null>(null)


// 수정 버튼
const openEditModal = (index: number) => {
    const bookmark = bookmarks.value[index]
    newNickname.value = bookmark.nickname
    newUrl.value = bookmark.url
    editIndex.value = index
    isEditMode.value = true
    isModalOpen.value = true
}

const saveEditedBookmark = () => {
    if (editIndex.value !== null) {
      bookmarks.value[editIndex.value] = {
        nickname: newNickname.value,
        url: newUrl.value,
      }
      closeModal()
    }
}

const closeModal = () => {
    isModalOpen.value = false
    isEditMode.value = false
    editIndex.value = null
    newNickname.value = ''
    newUrl.value = ''
}


const bookmarks = ref<{ nickname: string; url: string }[]>([])

const isModalOpen = ref(false)
const newNickname = ref('')
const newUrl = ref('')

// 북마크 추가
const addBookmark = () => {
    if (newNickname.value && newUrl.value) {
        bookmarks.value.push({
            nickname: newNickname.value,
            url: newUrl.value,
        })
        newNickname.value = ''
        newUrl.value = ''
        isModalOpen.value = false
    }
}

const goToLink = (url: string) => {
    window.open(url, '_blank')
}

const headerChecked = ref(false)
const checkedItems = ref<boolean[]>([])

watch(
    () => bookmarks.value,
    (newList: any) => {
        checkedItems.value = newList.map(() => false)
    },
    { deep: true }
)

// 헤더 체크박스 클릭 → 전체 선택/해제
const toggleAll = () => {
    checkedItems.value = checkedItems.value.map(() => headerChecked.value)
}

// 선택된 북마크만 삭제
const deleteSelected = () => {
    bookmarks.value = bookmarks.value.filter((_, i) => !checkedItems.value[i])
    checkedItems.value = bookmarks.value.map(() => false)
    headerChecked.value = false
}


// 개별 북마크 삭제 함수
const deleteBookmark = (index: number) => {
    bookmarks.value.splice(index, 1)
    checkedItems.value.splice(index, 1)
}
// 전체 삭제 확인 모달 상태
const confirmDeleteModalOpen = ref(false)

// 전체 삭제 버튼 클릭 시 모달 열기
const showConfirmDeleteModal = () => {
    confirmDeleteModalOpen.value = true
}

// 모달 내 "확인" 버튼 → 실제 삭제 실행
const confirmDeleteAll = () => {
    headerChecked.value = true
    checkedItems.value = bookmarks.value.map(() => true)
    deleteSelected()
    confirmDeleteModalOpen.value = false
}

// 모달 내 "취소" 버튼
const cancelDeleteAll = () => {
    confirmDeleteModalOpen.value = false
}

</script>


<style scoped>
img {
    margin-top: 3px;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: #ff8a00;
    cursor: pointer;
}

.bookmark-page {
    margin-top: 60px;
    padding: 2rem;
    background-color: #f8f8f8;
    color: #1e1e1e;
    width: 100%;
    min-height: 100vh;
    font-family: "Pretendard", sans-serif;
}

.header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.title {
    font-size: 2.0rem;
    font-weight: bold;
    margin-right: auto;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.header-button {
    border: none;
    padding: 0.5rem 0.8rem;
    border-radius: 45%;
    cursor: pointer;
}

.header-button:hover {
    background-color: rgba(255, 153, 0, 0.6);
    backdrop-filter: blur(10px)
}

.bookmark-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.bookmark-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #fefefe;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.bookmark-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex-grow: 1;
}

.nickname {
    font-weight: bold;
    font-size: 1rem;
}

.link {
    font-size: 0.9rem;
    color: #666;
}

.go-button {
    font-size: 1rem;
    background-color: white;
    border: none;
    border-radius: 50%;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    margin-top: 5px;
}

.go-button:hover {
    background-color: rgba(255, 153, 0, 0.6);
}

.button-group {
    display: flex;
    gap: 0.3rem;
}

.action-button {
    background-color: #ffd9a0;
    border: none;
    border-radius: 999px;
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
    cursor: pointer;
    margin-top: 5px;
}
.action-button:hover {
    background-color: #ff8a00;
}

.tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip-text {
    visibility: hidden;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* 버튼 위에 표시 */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
}

.tooltip-wrapper:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}


/* 모달 스타일 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-box {
    background-color: white;
    color: #1e1e1e;
    padding: 2rem;
    border-radius: 12px;
    width: 320px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal-box input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.modal-actions button {
    background-color: rgba(255, 153, 0, 0.6);
    color: #1e1e1e;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
}
.modal-actions button:hover {
    background-color: #ff8a00;
    color: #1e1e1e;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
}
</style>