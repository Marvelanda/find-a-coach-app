import jwtInterceptor from '@/services/jwtInterceptors';

export default {
  state() {
    return {
      coaches: [],
      filters: ['frontend', 'backend', 'career'],
      isLoading: false,
      error: null,
      lastFetch: null,
    };
  },
  actions: {
    changeFilters(context, payload) {
      context.commit('changeCoachFilters', payload);
    },
    async getCoaches(context) {
      if (!context.getters.shouldCoachesUpdate) {
        return;
      }

      try {
        context.state.isLoading = true;

        const { data, statusText, status } = await jwtInterceptor(
          'https://coaches-project-98f93-default-rtdb.firebaseio.com/coaches.json'
        );

        if (statusText !== 'OK' && status !== 200) {
          const error = new Error(data || 'Failed to fetch');
          throw error;
        }

        context.commit('addCoaches', data);
        context.commit('setFetchTimestamp');
      } catch (e) {
        context.state.error = e.message;
        console.log(e);
      } finally {
        context.state.isLoading = false;
      }
    },
    async saveCoach(context, payload) {
      const userId = context.rootGetters.currentUserId;

      const token = context.rootGetters.token || localStorage.getItem('token');

      const { statusText, status } = await jwtInterceptor(
        `https://coaches-project-98f93-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ ...payload.coach, userId }),
        }
      );

      if (statusText === 'OK' || status === 200) {
        context.commit('addToCoaches', { ...payload.coach, id: userId });
      }
    },
    clearError(context) {
      context.commit('clearErrorMessage');
    },
  },
  mutations: {
    addCoaches(state, payload) {
      state.coaches = Object.keys(payload).map((key) => {
        return {
          id: key,
          ...payload[key],
        };
      });
    },
    changeCoachFilters(state, payload) {
      state.filters = state.filters.includes(payload.type)
        ? state.filters.filter((filter) => filter !== payload.type)
        : (state.filters = [...state.filters, payload.type]);
    },
    addToCoaches(state, payload) {
      state.coaches = [...state.coaches, payload];
    },
    clearErrorMessage(state) {
      state.error = null;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return !!state.coaches.length;
    },
    filters(state) {
      return state.filters;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const currentUserId = rootGetters.currentUserId;

      return coaches.find((coach) => coach.id === currentUserId);
    },
    coachListIsLoading(state) {
      return state.isLoading;
    },
    error(state) {
      return state.error;
    },
    shouldCoachesUpdate(state) {
      const lastFetch = state.lastFetch;

      if (!lastFetch) {
        return true;
      }

      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
    },
  },
};
