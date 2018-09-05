import appTemplate from './app.html';

class AppController {
    constructor() {
        console.info("AppController");
    }
}

export const app = {
    controller: AppController,
    template: appTemplate
};