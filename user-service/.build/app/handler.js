"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.verify = exports.login = exports.signup = void 0;
const register_user_dto_1 = require("./dtos/register-user.dto");
const errors_1 = require("./protocols/errors");
const instance_register_user_1 = require("./instances/user/instance-register-user");
const signup = async (event) => {
    if (!event.body) {
        return (0, errors_1.badRequest)([{
                property: 'body',
                constraints: {
                    isRequired: 'Body is required'
                }
            }]);
    }
    const controller = (0, instance_register_user_1.instanceOfRegisterUser)();
    const registerUserData = JSON.parse(event.body);
    const dto = Object.assign(new register_user_dto_1.RegisterUserDTO(), registerUserData);
    return await controller.handle(dto);
};
exports.signup = signup;
const login = (event) => {
    console.log('event', event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello World' }),
    };
};
exports.login = login;
const verify = (event) => {
    console.log('event', event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello World' }),
    };
};
exports.verify = verify;
const profile = (event) => {
    console.log('event', event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello World' }),
    };
};
exports.profile = profile;
