/**
 * global模块请求拦截器
 */

export const globalInterceptor = ['$q', ($q) => {
    return {
        request(config) {
            console.log(config);
        },

        response(...response) {
            let [ data, status, headers, config, statusText, xhrStatus ] = [...response];
            console.log(...response);
            if (data.ok) {
                $q.resolve(...response);
            } else {
                $q.reject(new Error("response is not ok"));
            }
        }
    }
}];