export class AlertToasterService {
    constructor($ngConfirm, Notification) {
        this.$ngConfirm = $ngConfirm;
        this.Notification = Notification;
    }

    popup(title, content) {
        let that = this;
        return {
            success() {
                return that.Notification(
                    {
                        replaceMessage: true,
                        message: `<div class="alert alert-success alert-dismissible">
                                <h4><i class="icon fa fa-check"></i>${title || 'Success!'}</h4>
                                 ${content || ''}</div>`
                    });
            },

            warning() {
                return that.Notification(
                    {
                        replaceMessage: true,
                        message: `<div class="alert alert-warning alert-dismissible">
                                <h4><i class="icon fa fa-info"></i>${title || 'Warning!'}</h4>
                                 ${content || ''}</div>`
                    });
            },

            error() {
                return that.Notification(
                    {
                        replaceMessage: true,
                        message: `<div class="alert alert-danger alert-dismissible">
                                <h4><i class="icon fa fa-close"></i>${title || 'Error!'}</h4>
                                 ${content || ''}</div>`
                    });
            },

            pending() {
                return that.Notification(
                    {
                        delay: 99999999,
                        message: `<div class="alert alert-info alert-dismissible">
                                <h4><i class="icon fa fa-cog fa-spin"></i>${title || 'Error!'}</h4>
                                 ${content || ''}</div>`
                    });
            }
        };
        /*switch (type) {
            case "success":
                return this.Notification(
                    {
                        replaceMessage: true,
                        message: `<div class="alert alert-success alert-dismissible">
                                <h4><i class="icon fa fa-check"></i>${title || 'Success!'}</h4>
                                 ${content || ''}</div>`
                    });
            case "warning":
                return this.Notification(
                    {
                        replaceMessage: true,
                        message: `<div class="alert alert-warning alert-dismissible">
                                <h4><i class="icon fa fa-info"></i>${title || 'Warning!'}</h4>
                                 ${content || ''}</div>`
                    });
            case "error":
                return this.Notification(
                    {
                        replaceMessage: true,
                        message: `<div class="alert alert-danger alert-dismissible">
                                <h4><i class="icon fa fa-close"></i>${title || 'Error!'}</h4>
                                 ${content || ''}</div>`
                    });
            case "pending":
                return this.Notification(
                    {
                        delay: 99999999,
                        message: `<div class="alert alert-info alert-dismissible">
                                <h4><i class="icon fa fa-cog fa-spin"></i>${title || 'Error!'}</h4>
                                 ${content || ''}</div>`
                    });
        }*/
    }

    dialog(type, title, content) {

    }

}

AlertToasterService.$inject = ['$ngConfirm', 'Notification'];