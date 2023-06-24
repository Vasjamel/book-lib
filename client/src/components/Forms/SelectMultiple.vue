<template>
    <div class="multiselect">
        <div class="selected-items" v-if="selectedItems.length">
            <div class="selected-item" v-for="(item, index) in selectedItems" :key="index">
                {{ item }}
                <button class="remove-btn" @click="removeItem(index)">&times;</button>
            </div>
        </div>
        <div class="dropdown">
            <input type="text" class="search-input" v-model="searchTerm" @focus="showDropdown = true" @blur="onBlur"
                placeholder="Search and select...">
            <ul v-if="showDropdown">
                <li v-for="(option, index) in filteredOptions" :key="index" @click="toggleSelection(option)">
                    <input type="checkbox" :value="option" v-model="selectedItems">
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { ref, computed } from 'vue'
const options = ref(["Option 1", "Option 2", "Option 3", "Option 4"])
const selectedItems = ref([])
const searchTerm = ref("")
const showDropdown = ref(false)

const filteredOptions = computed(() => options.value.filter((option) =>
    option.toLowerCase().includes(searchTerm.value.toLowerCase())
))
const toggleSelection = (option) => {
    if (!selectedItems.value.includes(option)) {
        selectedItems.value.push(option);
    } else {
        const index = selectedItems.value.indexOf(option);
        selectedItems.value.splice(index, 1);
    }
}
const removeItem = (index) => {
    selectedItems.value.splice(index, 1);
}
const onBlur = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200);
}
</script>

<style scoped>
.multiselect {
    position: relative;
    display: inline-block;
}

.selected-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.selected-item {
    display: flex;
    align-items: center;
    background-color: #e2e8f0;
    padding: 3px 5px;
    margin: 2px;
    border-radius: 3px;
}

.remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.search-input {
    width: 200px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.dropdown ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    list-style-type: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0;
    margin: 0;
}

.dropdown li {
    padding: 5px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: #f2f2f2;
}
</style>