export class TemplateHelper {
    constructor() {
    }

    getPropValFromArray(list, prop) {
        if (Array.isArray(list)) {
            return list.map(item => {
                return item[prop];
            });
        }
    }

    minVal(param1, param2) {
        return Math.min(param1, param2);
    }

    maxVal(param1, param2) {
        return Math.max(param1, param2);
    }
}