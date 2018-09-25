/**
 * 接口基础类service
 */

export class AppBaseService {
    constructor($http, $q, AppConfig) {
        this.$http = $http;
        this.$q = $q;
        this.appConfig = AppConfig;
        this._options = {
            timeout: AppConfig.requestTimeout,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    /**
     * get请求
     * @param url
     * @param params
     */
    get(url, params) {
        let options = this._options;
        let that = this;
        options.url = `/${this.appConfig.requestPrefix}${url}`;
        options.params = params;
        options.method = 'GET';
        return this.$http(options)
            .then(response => {
                if(response.ok) {
                    return that.$q.resolve(response.data);
                } else {
                    return this.$q.reject(response.tips);
                }
            });
    }

    /**
     *
     * @param url
     * @param data
     * @returns {angular.IPromise<T | never>}
     */
    post(url, data) {
        let options = this._options;
        let that = this;
        options.url = `/${this.appConfig.requestPrefix}${url}`;
        options.data = data;
        options.method = 'POST';
        return this.$http(options)
            .then(response => {
                if(response.ok) {
                    return that.$q.resolve(response);
                } else {
                    return this.$q.reject(response);
                }
            });

    }

    /**
     *
     * @param url
     * @param data
     * @returns {angular.IPromise<T | never>}
     */
    put(url, data) {
        let options = this._options;
        let that = this;
        options.url = `/${this.appConfig.requestPrefix}${url}`;
        options.data = data;
        options.method = 'PUT';
        return this.$http(options)
            .then(response => {
                if(response.ok) {
                    return that.$q.resolve(response.data);
                } else {
                    return this.$q.reject(response.tips);
                }
            });
    }

    /**
     *
     * @returns {angular.IPromise<T | never>}
     */
    delete(url, data) {
        let options = this._options;
        let that = this;
        options.url = `/${this.appConfig.requestPrefix}${url}`;
        options.data = data;
        options.method = 'DELETE';
        return this.$http(options)
            .then(response => {
                if(response.ok) {
                    return this.$q.resolve(response.data);
                } else {
                    return this.$q.reject(response.tips);
                }
            });
    }

}

AppBaseService.$inject = ['$http', '$q', 'AppConfig'];