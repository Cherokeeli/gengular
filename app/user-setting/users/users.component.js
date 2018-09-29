import template from './users.template.html';
import { TemplateHelper } from "../../global/templateHelper.service";
import { Component } from "../../global/decorator/Component";
import { StandardList } from "../../global/decorator/StandardList";
import { StandardCURD } from "../../global/decorator/StandardCURD";

@Component({
    inject: ['$ngConfirm', 'Notification', '$timeout', 'UserSettingService', '$state', 'TemplateHelper'],
    as: 'users',
    template: template
})
@StandardList({
    service: 'userSettingService',
    listModel: 'userList',
    list: 'getUsers'

})
@StandardCURD({
    addState: 'user.add',
    editState: 'user.edit',
    viewState: 'user.view',
    delete: 'deleteUser'
})
export class UsersController {

    // 自动注入后钩子函数
    afterInjectHook() {
        this.userList = [];
        this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
        // console.error(666);
    }

    // $onInit后钩子函数
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

