import template from './users.template.html';
import { TemplateHelper } from "../../global/templateHelper.service";
import { Component } from "../../global/decorator/Component";
import { StandardList } from "../../global/decorator/StandardList";

@Component({
    inject: ['$ngConfirm', 'Notification', '$timeout', 'UserSettingService', '$state', 'TemplateHelper'],
    as: 'users',
    template: template
})
@StandardList({
    service: 'userSettingService',
    listModel: 'userList',
    delete: 'deleteUser',
    list: 'getUsers',
    addState: 'user.add',
    editState: 'user.edit',
    viewState: 'user.view',
})
export class UsersController {

    afterInjectHook() {
        this.userList = [];
        this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
        // console.error(666);
    }

    $onInitHook() {

    }

    tblOptDelete(id) {
        let that = this;
        this.$ngConfirm({
            icon: 'fa fa-warning',
            theme: 'material',
            type: 'orange',
            title: 'Delete?',
            animation: 'zoom',
            closeAnimation: 'zoom',
            animationSpeed: 200,
            content: 'This operation cannot be rollbacked',
            autoClose: 'cancel|5000',
            buttons: {
                deleteUser: {
                    text: 'YES',
                    btnClass: 'btn-orange',
                    action: function () {
                        let param = {
                            id: id
                        };
                        that.userSettingService.deleteUser(param).then(res => {
                            console.log(res);
                            that.queryPage();
                        }, err => {

                        });
                    }
                },
                cancel: {
                    text: 'NO',
                    action:  function () {

                    }
                }
            }
        });
    }
}

