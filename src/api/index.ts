import store from "../includes/store.ts";

const api = {

    /**
     * Try to login the user based on email/password
     * @param email
     * @param password
     */
    login(email: string, password: string): Promise<NavigationPreloadState> {
        return this.post("login", {email, password});
    },

    getStates(): Promise<NavigationPreloadState> {
        return this.get("states");
    },

    getCities(stateId: string): Promise<NavigationPreloadState> {
        return this.get("states/" + stateId + "/cities");
    },

    getSavedLocations(): Promise<NavigationPreloadState> {
        return this.get("locations/saved");
    },

    getLocationDetails(stateId: string, cityId: string): Promise<NavigationPreloadState> {
        return this.get("locations/" + stateId + "/" + cityId);
    },

    addToSavedLocations(stateId: string, cityId: string): Promise<NavigationPreloadState> {
        return this.post("locations/" + stateId + "/" + cityId + "/save", {});
    },

    removeFromSavedLocations(stateId: string, cityId: string): Promise<NavigationPreloadState> {
        return this.delete("locations/" + stateId + "/" + cityId);
    },

    get(url: string): Promise<NavigationPreloadState> {
        return this.request("GET", url);
    },

    post(url: string, data: object): Promise<NavigationPreloadState> {
        return this.request("POST", url, data);
    },

    delete(url: string): Promise<NavigationPreloadState> {
        return this.request("DELETE", url);
    },

    url(endpoint: string) {
        return import.meta.env.VITE_APP_API_URL + "/api/" + endpoint;
    },

    async request(method: string, url: string, data = {}) {
        const access_token = store.getters.accessToken;

        let params: RequestInit = {
            method: method,
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + access_token
            },
        };

        if (method !== "GET" && method !== "HEAD") {
            params.body = JSON.stringify(data);
        }

        try {
            let response = await fetch(this.url(url), params);
            return await response.json();

        } catch (error) {
            console.log("Error " + error);
            throw new Error();
        }
    },

};

export default api;
