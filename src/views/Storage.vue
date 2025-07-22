<template>
    <v-app>
        <div class="storage-page">
        <!-- 페이지 상단 -->
            <header class="storage-header">
            <span class="title">보관함</span>
            <button class="add-folder-button" @click="openModal">
                <img src="@/assets/AddFolder.svg" alt="폴더 추가" />
            </button>
            </header>
            <hr />
  
            <!-- 폴더 리스트 -->
            <div class="folder-grid">
                <button
                    class="folder-item"
                    v-for="(folder, index) in folders"
                    :key="index"
                >
                <img src="@/assets/Folder.svg" alt="폴더" class="folder-icon" />
                <div class="folder-name">{{ folder }}</div>
                </button>
            </div>
        </div>
    </v-app>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const newFolderName = ref('')
const folders = ref<string[]>([])

const openModal = () => {
dialog.value = true
newFolderName.value = ''
}
</script>

<style scoped>  

.storage-page {
    margin-top: 60px;
    padding: 2rem;
    background-color: #f8f8f8;
    color: #1e1e1e;
    width: 100%;
    min-height: 100vh;
    font-family: "Pretendard", sans-serif;
}

.storage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.title {
    font-size: 2.0rem;
    font-weight: bold;
    margin-right: auto;
}
.add-folder-button {
    border: none;
    padding: 0.5rem 0.8rem;
    border-radius: 45%;
    cursor: pointer;
}
.add-folder-button:hover {
    background-color: rgba(255, 153, 0, 0.6);
    backdrop-filter: blur(10px)
}

.folder-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 20px;
}

.folder-item {
    border : none;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: #fafafa;
    border-radius: 10px;
    transition: transform 0.2s ease;
    cursor: pointer;
}

.folder-item:hover .folder-name {
    background-color: rgba(255, 153, 0, 0.6);;
}

.folder-icon {
    width: 64px;
    height: 64px;
}

.folder-name {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    word-break: break-all;
}

img {
    margin-top: 3px;
}
</style>