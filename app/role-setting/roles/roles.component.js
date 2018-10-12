import style from './roles.style.less';
// import template from './roles.template.html';
import {OPT_TYPE} from "../../global/global.enum";
import {objectIndexOf} from "../../utils/utils";
import {Component} from "../../global/decorator/Component";
import {StandardList} from "../../global/decorator/StandardList";
import {StandardCURD} from "../../global/decorator/StandardCURD";
import * as template from '../../global/template/table.template.ejs';
import roleConfig from '../../global/json/roleConfig.json';

@Component({
    inject: ['$timeout', 'RoleSettingService', '$state', 'AlertToasterService'],
    as: 'roles',
    template: template(roleConfig)
})
@StandardList({
    service: 'roleSettingService',
    listModel: 'roleList',
    list: 'getRoles',
    delete: 'deleteRole'
})
@StandardCURD({
    addState: 'role.add',
    editState: 'role.edit',
    viewState: 'role.view',
})
export class RolesController {
    afterInjectHook() {
        this.roleList = [];
        this.checkedids = [];
        // this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
        console.log(this.addtool, this.checktool);
    }
    /*constructor($ngConfirm, Notification, $timeout, Store, RoleSettingService, $state) {
        this.$ngConfirm = $ngConfirm;
        this.style = style;
        this.notification = Notification;
        this.$timeout = $timeout;
        this.roleSettingService = RoleSettingService;
        // this.itemsPerPage = 2;
        this.$state = $state;
        this.globalData = Store.data;
        this.roleList = [];
        this.checkedids = [];
        // this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
        console.log(this.addtool, this.checktool);
    }

    queryPage() {
        console.log(this.checkedids);

        let param = {
            pageNo: this.bigCurrentPage,
            pageSize: this.itemsperpage || 10
        };
        this.roleSettingService.getRoles(param).then(res => {
            this.roleList = res.records;
            if(Array.isArray(this.inputids)) {
                this.inputids.map(id => {
                    let index = objectIndexOf(this.roleList, 'id', id);
                    if(index > -1) {
                        this.roleList[index].checked = true;
                    }
                });
            }
            this.totalCount = res.total;
        }, err => {
            console.info(err);
        });
    }

    tblOptAdd() {
        // console.log(id);
        this.$state.go('role.add', {opt: OPT_TYPE.ADD});
    }

    tblOptEdit(id) {
        // console.log(id);
        this.$state.go('role.edit', {id: id, opt: OPT_TYPE.EDIT});
    }

    tblOptView(id) {
        this.$state.go('role.view', {id: id, opt: OPT_TYPE.VIEW});
    }*/

    /*
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
                        that.roleSettingService.deleteRole(param).then(res => {
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
    }*/

}

/*
RolesController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store', 'RoleSettingService', '$state'];

export const roles = {
    controller: RolesController,
    controllerAs: 'roles',
    bindings: {
        checkable: '<',
        checkedids: '=',
        inputids: '<',
        checktool: '<',
        edittool: '<',
        viewtool: '<',
        deletetool: '<',
        addtool: '<',
        searchtool: '<',
        pagesizetool: '<',
        itemsperpage: '<'
    },
    template: template
};*/
