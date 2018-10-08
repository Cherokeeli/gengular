export const userConfigJson = {
    controllerAs: 'user',
    listModelName: 'userList',
    subModelName: 'user',
    properties: [
        {
            propName: "Username",
            modelName: "username",
        },
        {
            propName: "Email",
            modelName: "email",
        },
        {
            propName: "Role",
            modelName: "roleNameList",
            join: ','
        },
    ],
    authorities: {
        create: "sys:user:save",
        update: "sys:user:update",
        read: "sys:user:info",
        delete: "sys:user:delete"
    }
};