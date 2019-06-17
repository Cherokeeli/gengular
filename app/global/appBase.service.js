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
     * get请求，获取操作
     * @param url
     * @param params
     * @param isMock
     */
    get(url, params, isMock) {
        let exceptionUrl = ['/sysUsers/authorities'];
        let options = this._options;
        let that = this;
        let pendingPop;
        options.url = !isMock?`/${this.appConfig.requestPrefix}${url}`:url;
        options.params = params;
        options.method = 'GET';
        // 一些要频繁请求的接口设为例外，不显示fetching
        if (exceptionUrl.indexOf(url) === -1) {
            pendingPop = this.alertToasterService.popup("Fetching", "Fetching data...").pending();
        }
        return this.$http(options)
            .then(response => {
                if (pendingPop) {
                    pendingPop.then(pop => pop.kill());
                }
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
     * post请求，新增操作
     * @param url
     * @param data
     * @param isMock
     * @returns {angular.IPromise<T | never>}
     */
    post(url, data, isMock) {
        let options = this._options;
        let that = this;
        options.url = !isMock?`/${this.appConfig.requestPrefix}${url}`:url;
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
     * put请求，更新操作
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
     * delete请求，删除操作
     * @param url
     * @param data
     * @return {Promise<T | void>}
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

    /**
     * 上传文件
     * @param url
     * @return {FileUploader}
     */
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

    /**
     * get请求下载
     * @param url
     * @param param
     */
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

    /**
     * post请求下载
     * @param url
     * @param param
     */
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
