import { writable } from 'svelte/store';
import createAuth0Client from "@auth0/auth0-spa-js";

const AUTH_CONFIG = {
    domain: "dev-56ziprzw.us.auth0.com",
    client_id: "JYZCMRms5MEugNZgsh5Aw89bYSgPolcE",
    cacheLocation: 'localstorage',
    audience: 'https://dev-56ziprzw.us.auth0.com/api/v2/'
};

export const authStore = createAuthStore();

function createAuthStore() {
    const loading = writable(true);
    const authenticated = writable(false);
    const user = writable(null);
    let auth0 = null;
    const token = writable(null);

    
    async function init(){
        auth0 = await createAuth0Client(AUTH_CONFIG);
        // update store
        user.set(await auth0.getUser());       
        loading.set(false);
        authenticated.set(true);

        // put token
        const jwt = await auth0.getTokenSilently();
        token.set(jwt);
    }

    async function signin() {
        //display popup
        await auth0.loginWithPopup({
          display: 'page'
        });

        //update store
        user.set(await auth0.getUser());
        authenticated.set(true);
    }

    async function signout() {
        // logout
        await auth0.logout({
          returnTo: 'process.DOMAIN_URL'
        });

        // update store
        user.set(await auth0.getUser());
        authenticated.set(false);
    }

    return { loading, authenticated, user, auth0, signin, signout, init, token };
}