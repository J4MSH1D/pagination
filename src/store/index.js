import { createStore } from "vuex";
import { instance, pagination, paginationFixer } from "../composables/api";

export const store = createStore({
  state: () => ({
    posts: null,
    total: null,
    paginations: null,
    currentPage: 1,
    limit: 10,
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setTotalPosts(state, total) {
      state.total = total;
    },
    setPaginations(state, paginations) {
      state.paginations = paginations;
    },
    setCurrentPage(state, page) {
      if (page < 1 || page > state.paginations) {
        return null;
      } else {
        state.currentPage = page;
      }
    },
    setLimit(state, limit) {
      state.limit = limit;
    }
  },
  actions: {
    async getPosts(context, { currentPage, limitOfPost }) {
      try {
        const response = await instance.get("/posts" + pagination(currentPage, limitOfPost));
        context.commit("setPosts", response.data);
        context.commit("setTotalPosts", response.headers["x-total-count"]);
        let aParam = Math.round(this.state.total / this.state.limit);
        let bParam = this.state.total / this.state.limit;
        context.commit("setPaginations", paginationFixer(aParam, bParam));
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});
