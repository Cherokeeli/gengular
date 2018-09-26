export class QuartzSettingService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }

    getTasks() {
        let url = '/sys/schedule';
        return this.appBaseService.get(url, {});
    }

    deleteTask(param) {
        let url = '/sys/schedule';
        return this.appBaseService.delete(url, param);
    }

    addTask(param) {
        let url = '/sys/schedule';
        return this.appBaseService.post(url, param);
    }

    updateTask(param) {
        let url = '/sys/schedule';
        return this.appBaseService.put(url, param);
    }

    pauseTask(param) {
        let url = '/sys/schedule/pause';
        return this.appBaseService.post(url, param);
    }

    resumeTask(param) {
        let url = '/sys/schedule/resume';
        return this.appBaseService.post(url, param);
    }

    runTask(param) {
        let url = '/sys/schedule/run';
        return this.appBaseService.post(url, param);
    }

    getTaskById(id) {
        let url = `/sys/schedule/info/${id}`;
        return this.appBaseService.get(url, {});
    }

}

QuartzSettingService.$inject = ['AppBaseService'];