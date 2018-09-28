import {copyPropertiesTo, objectIndexOf} from "../../utils/utils";

export function StandardCURD(options) {
    return (targetClass) => {
        let bindings = {
            inputids: '<',
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
        };


        copyPropertiesTo(bindings, targetClass.prototype, 'bindings');
        // return targetClass;
    }
}