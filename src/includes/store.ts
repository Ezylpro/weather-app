import {createStore} from "vuex";

interface State {
    accessToken: string | null;
}

const store = createStore<State>({
    state: {
        accessToken: localStorage.getItem('access-token') || null,
    },
    mutations: {
        /**
         * Set Access token for any future requests
         * @param state
         * @param accessToken
         */
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
            localStorage.setItem('access-token', accessToken);
        },

        /**
         * Remove Access token
         * @param state
         */
        logout(state) {
            state.accessToken = null;
            localStorage.removeItem('access-token');
        }
    },
    getters: {
        accessToken: (state: State) => state.accessToken,
    }
});

export default store;