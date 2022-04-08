<script setup>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { selectFromAll, select } from "./composables/DOM.js";
const store = useStore();
const current = computed(() => store.state.currentPage);
const limit = computed(() => store.state.limit)
const setLimit = ref(store.state.limit)
store.dispatch("getPosts", {currentPage: current.value, limitOfPost: limit.value});
const paginations = computed(() => store.state.paginations)
const posts = computed(() => store.state.posts)
const toggleButtons = async (p) => {
  try {
    const currentData = p.target.getAttribute("data-page");
    store.commit("setCurrentPage", Number(currentData));
    await store.dispatch("getPosts", {currentPage: current.value, limitOfPost: limit.value});
    selectFromAll(".navbar", "div").forEach(elem => {elem.classList.remove("activePagination")})
    p.target.classList.add("activePagination");
  } catch (error) {
    console.log(error);
  }
}
const prev = async () => {
  try {
    store.commit("setCurrentPage", current.value - 1);
    await store.dispatch("getPosts", {currentPage: current.value, limitOfPost: limit.value});
    const activeButton = select(".activePagination")
    if(Number(activeButton.getAttribute("data-page")) < 1 ) {
      return null
    } else {
      activeButton.classList.remove("activePagination");
      select(`[data-page="${current.value}"]`).classList.add("activePagination");
    }
  } catch (error) {
    console.log(error.message);
  }
}
const next = async () => {
  try {
    store.commit("setCurrentPage", current.value + 1);
    await store.dispatch("getPosts", {currentPage: current.value, limitOfPost: limit.value});
    const activeButton = select(".activePagination")
    if(Number(activeButton.getAttribute("data-page")) > paginations.value ) {
      return null
    } else {
      activeButton.classList.remove("activePagination");
      select(`[data-page="${current.value}"]`).classList.add("activePagination");
    }
  } catch (error) {
    console.log(error.message);
  }
}
const setAndGet = async () => {
  try {
    store.commit("setLimit", setLimit.value);
    await store.dispatch("getPosts", {currentPage: current.value, limitOfPost: limit.value});
  } catch (error) {
    console.log(error.message);
  }
}
</script>


<template>
  <div class="app">
    <h1>Posts List</h1>
    <div class="limit">
      <div>Limit: <input type="number" v-model="setLimit" min="1" step="1"></div>
      <div><button @click="setAndGet">Set Limit</button></div>  
    </div>
    <div class="navbar">
      <div
        v-if="paginations"
        v-for="(pagination, index) in paginations"
        :key="index"
        :data-page="index + 1"
        :class="index === 0 ? 'activePagination' : ''"
        @click="toggleButtons"
      >
        {{ index + 1 }}
      </div>
    </div>
    <div class="buttons__field">
      <button @click="prev">&lt;&lt; Prev</button>
      <button @click="next">Next &gt;&gt;</button>
    </div>
    <div class="list">
      <div v-for="post in posts" :key="post.id">
      <div class="list__title"><span> Title: </span>{{post.title}}</div>
      <div><span> Body: </span>{{post.body}}</div>
      </div>
    </div>
  </div>
</template>
