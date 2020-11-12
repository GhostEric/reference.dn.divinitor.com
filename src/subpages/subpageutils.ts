import { Route } from 'vue-router';
import * as Globals from "@/globals";
import * as Constants from "@/constants";
import { Actions } from '@/storemutations';

/**
 * Configures the API route to use if the query param or localstorage value is present
 */
export const configureApiRoute = (dispatch: (a: string, v: any) => void) => {
    return (route: Route) => {
        const storedApiRoute = <string>window.localStorage.getItem(Constants.ApiPathKey);
        if (storedApiRoute || route.query[Constants.ApiPathKey]) {
            let apiRouteName = ((route.query[Constants.ApiPathKey] || storedApiRoute) ||
                Constants.DefaultApiPath);
            if (apiRouteName === 'local') {
                apiRouteName = 'http://localhost:8081/api';
                dispatch(Actions.SetRegion, 'local');
            }
            
            if (route.query[Constants.RegionOverrideKey]) {
                const region = route.query[Constants.RegionOverrideKey];
                dispatch(Actions.SetRegion, region);
            }

            if (!apiRouteName.startsWith("/") && !apiRouteName.startsWith("http")) {
                apiRouteName = "/" + apiRouteName;
            }

            Globals.ApiHttpClient.defaults.baseURL = apiRouteName;

            if (apiRouteName !== Constants.DefaultApiPath) {
                window.localStorage.setItem(Constants.ApiPathKey, apiRouteName);
            } else {
                window.localStorage.removeItem(Constants.ApiPathKey);
            }
        } else {
            Globals.ApiHttpClient.defaults.baseURL = Constants.DefaultApiPath;
        }
    };
};
