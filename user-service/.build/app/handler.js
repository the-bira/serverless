"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.verify = exports.login = exports.signup = void 0;
const signup = (event) => {
    console.log('event', event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello World' }),
    };
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
