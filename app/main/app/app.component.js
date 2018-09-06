import appTemplate from './app.template.html';

class AppController {
    constructor() {
        console.info("AppController");
    }
}

export const app = {
    controller: AppController,
    template: appTemplate
};