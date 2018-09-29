import template from './quartz.template.html';
import style from './quartz.style.less';
import {objectIndexOf} from "../../utils/utils";
import {OPT_TYPE} from "../../global/global.enum";
import {Component} from "../../global/decorator/Component";
import {StandardList} from "../../global/decorator/StandardList";
import {StandardCURD} from "../../global/decorator/StandardCURD";

@Component({
    inject: ['$ngConfirm', 'Notification', '$timeout', 'QuartzSettingService', '$state'],
    as: 'quartz',
    template: template
})
@StandardList({
    service: 'quartzSettingService',
    list: 'getTasks',
    listModel: 'taskList'
})
@StandardCURD({
    addState: 'quartz.add',
    editState: 'quartz.edit',
    viewState: 'quartz.view',
    delete: 'deleteTask'
})
export class QuartzController {
    /*constructor($ngConfirm, Notification, $timeout, Store, QuartzSettingService, $state) {
        this.$ngConfirm = $ngConfirm;
        this.style = style;
        this.notification = Notification;
        this.$timeout = $timeout;
        this.quartzSettingService = QuartzSettingService;
        // this.itemsPerPage = 2;
        this.$state = $state;
        this.globalData = Store.data;
        this.taskList = [];
        // this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
        console.log(this.addtool, this.checktool);
    }*/

    afterInjectHook() {
        this.taskList = [];
        // this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
    }

    /*queryPage() {
        console.log(this.checkedids);

        let param = {
            pageNo: this.bigCurrentPage,
            pageSize: this.itemsperpage || 10
        };
        this.quartzSettingService.getTasks(param).then(res => {
            this.taskList = res.records;
            if(Array.isArray(this.checkedids)) {
                this.checkedids.map(id => {
                    let index = objectIndexOf(this.taskList, 'id', id);
                    if(index > -1) {
                        this.taskList[index].checked = true;
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
        this.$state.go('quartz.add', {opt: OPT_TYPE.ADD});
    }

    tblOptEdit(id) {
        // console.log(id);
        this.$state.go('quartz.edit', {id: id, opt: OPT_TYPE.EDIT});
    }

    tblOptView(id) {
        this.$state.go('quartz.view', {id: id, opt: OPT_TYPE.VIEW});
    }*/

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
                        that.quartzSettingService.deleteUser(param).then(res => {
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

    /*$onInit() {
        this.queryPage();
    }


    checkItem(node) {
        console.log(this);
        if(!Array.isArray(this.checkedids)) {
            this.checkedids = []
        }
        let index = this.checkedids.indexOf(node.id);
        if (node.checked) {
            if (index === -1) {
                this.checkedids.push(node.id);
            }
        } else {
            if (index > -1) {
                this.checkedids.splice(index, 1);
            }
        }
    }*/

    quartzOptRun(task) {
        this.quartzSettingService.runTask(task).then(res => {
            console.log(res);
            this.$state.reload();
        }, err => {
            console.log(err);
        });
    }

    quartzOptResume(task) {
        this.quartzSettingService.resumeTask(task).then(res => {
            console.log(res);
            this.$state.reload();
        }, err => {
            console.log(err);
        });
    }

    quartzOptPause(task) {
        this.quartzSettingService.pauseTask(task).then(res => {
            console.log(res);
            this.$state.reload();
        }, err => {
            console.log(err);
        });
    }
}

/*
QuartzController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store', 'QuartzSettingService', '$state'];

export const quartz = {
    controller: QuartzController,
    controllerAs: 'quartz',
    bindings: {
        checkable: '<',
        checkedids: '=',
        checktool: '<',
        edittool: '<',
        viewtool: '<',
        deletetool: '<',
        addtool: '<',
        searchtool: '<',
        pagesizetool: '<',
        itemsperpage: '<'
    },
    template: template,
};*/
