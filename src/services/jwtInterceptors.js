import axios from 'axios';
import store from '../store/index';

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        await store.dispatch('logout');

        return Promise.reject(error);
      }

      const payload = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      };

      const response = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`,
        payload
      );

      const { data } = response;

      localStorage.setItem('currentUser', data.user_id);
      localStorage.setItem('token', data.id_token);
      localStorage.setItem('refreshToken', data.refresh_token);

      await store.commit('setUser', {
        idToken: data.id_token,
        localId: data.user_id,
        isAuth: true,
      });

      const newUrl = error.config.url.replace(/(?<=auth=).*/gm, data.id_token);
      error.config.url = newUrl;
      error.config.headers['Authorization'] = `bearer ${data.id_token}`;

      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
