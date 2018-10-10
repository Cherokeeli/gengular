/**
 * 接口基础类service
 */

export class AppBaseService {
    constructor($http, $q, AppConfig, AlertToasterService, FileUploader) {
        this.$http = $http;
        this.$q = $q;
        this.appConfig = AppConfig;
        this.alertToasterService = AlertToasterService;
        this._options = {
            timeout: AppConfig.requestTimeout,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        this.fileUploader = FileUploader;
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
                    // this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                let err = error.data || error;
                this.alertToasterService.popup("Error!", err).error();
                return this.$q.reject(error);
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
                    // this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                let err = error.data || error;
                this.alertToasterService.popup("Error!", err).error();
                return this.$q.reject(error);
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
                    // this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                let err = error.data || error;
                this.alertToasterService.popup("Error!", err).error();
                return this.$q.reject(error);
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
                    // this.alertToasterService.popup("Error!", response.englishTips).error();
                    return this.$q.reject(response.englishTips);
                }
            }).catch(error => {
                let err = error.data || error;
                this.alertToasterService.popup("Error!", err).error();
                return this.$q.reject(error);
            });
    }

    upload(url) {
        let uploader = new this.fileUploader({
            url: `/${this.appConfig.requestPrefix}${url}`,
            method: 'POST',
            removeAfterUpload: true,
            queueLimit: 1, //文件个数
            autoUpload: true
        });
        let pendingPop;
        uploader.onProgressItem = (fileItem, progress) => {
            pendingPop = this.alertToasterService.popup("Uploading", "Uploading data...").pending();
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onSuccessItem = (fileItem, response, status, headers) => {
            console.info('onSuccessItem', fileItem, response, status, headers);
            if(response.ok) {
                pendingPop.then(pop=>pop.kill());
                this.alertToasterService.popup("Success!", "Upload file successfully").success();
            }
        };
        return uploader;
    }

    downloadGet(url, param) {
        let $iframe = document.createElement('iframe');
        $iframe.setAttribute('id', 'down-file-iframe');
        let $form = document.createElement('form');
        $form.setAttribute('target', 'down-file-iframe');
        $form.setAttribute('method', 'GET');
        $form.setAttribute('action', `/${this.appConfig.requestPrefix}${url}`);
        let value = "";
        for (let key in param) {
            value = typeof(param[key])==='object'?JSON.stringify(param[key]).replace(/"/g,"'"):param[key];
            $form.innerHTML+= '<input type="hidden" name="' + key + '" value="' + value + '" />';
        }
        $iframe.appendChild($form);
        document.body.appendChild($iframe);
        $form.submit();
        $iframe.remove();
    }

    downloadPost(url, param) {
        let $iframe = document.createElement('iframe');
        $iframe.setAttribute('id', 'down-file-iframe');
        let $form = document.createElement('form');
        $form.setAttribute('target', 'down-file-iframe');
        $form.setAttribute('method', 'POST');
        $form.setAttribute('action', `/${this.appConfig.requestPrefix}${url}`);
        let value = "";
        for (let key in param) {
            value = typeof(param[key])==='object'?JSON.stringify(param[key]).replace(/"/g,"'"):param[key];
            $form.innerHTML+= '<input type="hidden" name="' + key + '" value="' + value + '" />';
        }
        $iframe.appendChild($form);
        document.body.appendChild($iframe);
        $form.submit();
        $iframe.remove();
    }

}

AppBaseService.$inject = ['$http', '$q', 'AppConfig', 'AlertToasterService', 'FileUploader'];