/**
 * 接口基础类service
 */

export class AppBaseService {
    constructor($http, $q, AppConfig, AlertToasterService) {
        this.$http = $http;
        this.$q = $q;
        this.appConfig = AppConfig;
        this.alertToasterService = AlertToasterService;
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
        let pendingPop = this.alertToasterService.popup("Fetching", "Fetching data...").pending();
        return this.$http(options)
            .then(response => {
                pendingPop.then(pop=>pop.kill());
                if(response.ok) {
                    // this.alertToasterService.popup("Success!", "Fetch data successfully").success();
                    return that.$q.resolve(response.data);
                } else {
                    this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                this.alertToasterService.popup("Error!", error.data).error();
                return this.$q.reject(error.data);
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
        let pendingPop = this.alertToasterService.popup("Submitting", "Submitting data...").pending();
        return this.$http(options)
            .then(response => {
                pendingPop.then(pop=>pop.kill());
                if(response.ok) {
                    this.alertToasterService.popup("Success!", "Submit data successfully").success();
                    return that.$q.resolve(response);
                } else {
                    this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                this.alertToasterService.popup("Error!", error.data).error();
                return this.$q.reject(error.data);
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
        let pendingPop = this.alertToasterService.popup("Updating", "Updating data...").pending();
        return this.$http(options)
            .then(response => {
                pendingPop.then(pop=>pop.kill());
                if(response.ok) {
                    this.alertToasterService.popup("Success!", "Update data successfully").success();
                    return that.$q.resolve(response.data);
                } else {
                    this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                this.alertToasterService.popup("Error!", error.data).error();
                return this.$q.reject(error.data);
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
        let pendingPop = this.alertToasterService.popup("Deleting", "Deleting data...").pending();
        return this.$http(options)
            .then(response => {
                pendingPop.then(pop=>pop.kill());
                if(response.ok) {
                    this.alertToasterService.popup("Success!", "Delete data successfully").success();
                    return this.$q.resolve(response.data);
                } else {
                    this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                this.alertToasterService.popup("Error!", error.data).error();
                return this.$q.reject(error.data);
            });
    }

}

AppBaseService.$inject = ['$http', '$q', 'AppConfig', 'AlertToasterService'];