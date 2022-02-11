import jwtInterceptor from '@/services/jwtInterceptors';

export default {
  state() {
    return {
      currentUserId: null,
      isAuth: false,
      token: null,
      authError: null,
      isLoading: false,
      timer: null,
    };
  },
  actions: {
    async auth(context, payload) {
      context.state.isLoading = true;
      const url =
        payload.data.type === 'signup'
          ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`
          : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`;

      try {
        const { data, statusText, status } = await jwtInterceptor(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            ...payload.data,
            returnSecureToken: true,
          }),
        });

        if (statusText !== 'OK' && status !== 200) {
          const error = new Error(data.message || data || 'Failed');
          throw error;
        }

        localStorage.setItem('currentUser', data.localId);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        context.commit('setUser', {
          ...data,
          isAuth: true,
        });

        return statusText || status;
      } catch (e) {
        console.log(e);
        context.commit('setError', e.message);
      } finally {
        context.state.isLoading = false;
      }
    },
    clearAuthError(context) {
      context.commit('setError', null);
    },
    checkAuth(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('currentUser');

      if (!token || !userId) {
        return;
      }

      context.commit('setUser', {
        localId: userId,
        isAuth: true,
        idToken: token,
      });
    },
    logout(context) {
      localStorage.clear();

      context.commit('setUser', {
        localId: null,
        isAuth: false,
        idToken: null,
      });
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.idToken;
      state.currentUserId = payload.localId;
      state.isAuth = payload.isAuth;
    },
    setError(state, payload) {
      state.authError = payload;
    },
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
    token(state) {
      return state.token;
    },
    currentUserId(state) {
      return state.currentUserId;
    },
    authError(state) {
      return state.authError;
    },
    isAuthLoading(state) {
      return state.isLoading;
    },
  },
};
