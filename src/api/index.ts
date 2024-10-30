const api = {

    /**
     * Try to login the user based on email/password
     * @param email
     * @param password
     */
    login(email: string, password: string) {
        return this.post("login", {email, password});
    },

    getAccount() {
        return this.get("account");
    },

    get(url: string) {
        return this.request("GET", url);
    },

    post(url: string, data: object) {
        return this.request("POST", url, data);
    },

    url(endpoint: string) {
        return import.meta.env.VITE_APP_API_URL + "/api/" + endpoint;
    },

    async request(method: string, url: string, data = {}) {

        let params: RequestInit = {
            method: method,
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
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
