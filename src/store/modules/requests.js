import jwtInterceptor from '@/services/jwtInterceptors';
import store from '@/store';
import router from '@/router';

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
      isLoading: false,
      error: null,
    };
  },
  actions: {
    async getRequests(context) {
      const token = context.rootGetters.token;

      try {
        context.state.isLoading = true;

        const { data, statusText, status } = await jwtInterceptor(
          `https://coaches-project-98f93-default-rtdb.firebaseio.com/requests/${context.rootGetters.currentUserId}.json?auth=${token}`
        );

        if (statusText !== 'OK' && status !== 200) {
          const error = new Error(data.error || 'Failed to fetch');
          throw error;
        }

        context.commit('addRequests', data || context.getters.requests);
      } catch (e) {
        console.log(e);
        if (!e.message.includes('401')) {
          context.state.error = e.message;
        } else {
          await store.dispatch('logout');
          await router.push(`${window.location.href}/coaches`);
        }
      } finally {
        context.state.isLoading = false;
      }
    },
    async addRequest(context, payload) {
      try {
        const { data, statusText, status } = await jwtInterceptor(
          `https://coaches-project-98f93-default-rtdb.firebaseio.com/requests/${payload.request.coachId}.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload.request),
          }
        );

        if (statusText !== 'OK' && status !== 200) {
          const error = new Error(data.message || 'Failed to fetch');
          throw error;
        }

        const { name: id } = data;

        context.commit('addToRequests', { ...payload.request, id });
      } catch (e) {
        context.state.error = 'Failed to fetch';
        console.log(e);
      }
    },
    clearError(context) {
      context.commit('clearErrorMessage');
    },
  },
  mutations: {
    addRequests(state, payload) {
      state.requests = Object.keys(payload).map((key) => {
        return {
          id: key,
          ...payload[key],
        };
      });
    },
    addToRequests(state, payload) {
      state.requests = [...state.requests, payload];
    },
    clearErrorMessage(state) {
      state.error = null;
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    isLoading(state) {
      return state.isLoading;
    },
    error(state) {
      return state.error;
    },
  },
};
