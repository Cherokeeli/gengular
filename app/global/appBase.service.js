/**
 * 接口基础类service
 */

export class AppBaseService {
    constructor($http, $q, AppConfig) {
        this.$http = $http;
        this.$q = $q;
        this._options = {
            timeout: AppConfig.requestTimeout,
            headers: {
                'Content-Type': undefined
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
        options.url = url;
        options.params = params;
        // options.method = 'GET';
        return this.$http.get(url, options)
            .then((response) => {
                return that.$q.resolve(response);
            })
            .catch((err) => {
                throw new Error(JSON.stringify(err));
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
        options.url = url;
        options.data = data;
        // options.method = 'POST';
        return this.$http.post(url, options)
            .then((response) => {
                return that.$q.resolve(response);
            })
            .catch((err) => {
                throw new Error(JSON.stringify(err));
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
        options.url = url;
        options.data = data;
        // options.method = 'POST';
        return this.$http.put(url, options)
            .then((response) => {
                return that.$q.resolve(response);
            })
            .catch((err) => {
                throw new Error(JSON.stringify(err));
            });
    }

    /**
     *
     * @returns {angular.IPromise<T | never>}
     */
    delete() {
        let options = this._options;
        let that = this;
        options.url = url;
        options.data = data;
        // options.method = 'POST';
        return this.$http.delete(url, options)
            .then((response) => {
                return that.$q.resolve(response);
            })
            .catch((err) => {
                throw new Error(JSON.stringify(err));
            });
    }

}

AppBaseService.$inject = ['$http', '$q', 'AppConfig'];