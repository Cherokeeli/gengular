/**
 * global模块请求拦截器，拦截所有请求
 */

export const globalInterceptor = ['$q', 'AppConfig', '$state', ($q, AppConfig, $state) => {
    return {
        request(config) {
            // console.log(config);
            return config;
        },

        requestError(response) {
            console.log(response);
            return $q.reject(response);
        },

        response(response) {

            let { data, status, headers, config, statusText, xhrStatus } = response;
            if (config.url.indexOf(AppConfig.requestPrefix) > -1) {
                if (data.ok) {
                    return response.data;
                } else {
                    if (data.relogin) {
                        $state.go('login', null, {reload: true});
                    }

                    return response.data;
                    // throw new Error("response is not ok");
                }
            } else {
                return response;
            }
        },

        responseError(response) {
            console.log(response);
            return $q.reject(response);
        }
    }
}];