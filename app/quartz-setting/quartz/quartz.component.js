import template from './quartz.template.html';
import style from './quartz.style.less';
import {objectIndexOf} from "../../utils/utils";
import {OPT_TYPE} from "../../global/global.enum";
import {Component} from "../../global/decorator/Component";
import {StandardList} from "../../global/decorator/StandardList";
import {StandardCURD} from "../../global/decorator/StandardCURD";

@Component({
    inject: ['$timeout', 'QuartzSettingService', '$state', 'AlertToasterService'],
    as: 'quartz',
    template: template
})
@StandardList({
    service: 'quartzSettingService',
    list: 'getTasks',
    delete: 'deleteTask',
    listModel: 'taskList'
})
@StandardCURD({
    addState: 'quartz.add',
    editState: 'quartz.edit',
    viewState: 'quartz.view',
})
export class QuartzController {

    afterInjectHook() {
        this.taskList = [];
        // this.totalCount = this.userList.length;
        // this.bigCurrentPage = 1;
    }

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
