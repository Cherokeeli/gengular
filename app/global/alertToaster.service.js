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
                        replaceMessage: true,
                        delay: 99999999,
                        message: `<div class="alert alert-info alert-dismissible">
                                <h4><i class="icon fa fa-cog fa-spin"></i>${title || 'Error!'}</h4>
                                 ${content || ''}</div>`
                    });
            }
        };
    }

    dialog(title, content) {
        let that = this;
        return {
            confirmation(confirm, cancel) {
                that.$ngConfirm({
                    icon: 'fa fa-warning',
                    theme: 'material',
                    type: 'orange',
                    title: title || 'Delete?',
                    animation: 'zoom',
                    closeAnimation: 'zoom',
                    animationSpeed: 200,
                    content: content || 'This operation cannot be rollbacked',
                    autoClose: 'cancel|5000',
                    buttons: {
                        deleteItem: {
                            text: 'YES',
                            btnClass: 'btn-orange',
                            action: confirm
                        },
                        cancel: {
                            text: 'NO',
                            action:  cancel
                        }
                    }
                });
            }
        }

    }

}

AlertToasterService.$inject = ['$ngConfirm', 'Notification'];