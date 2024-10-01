import { RegisterUserDTO } from "../../dtos/user/register-user.dto";
import { User } from "../../models/IUser";
import { IAccessManager } from "../../providers/access-manager";
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export class CognitoAccessManager implements IAccessManager {
    private cognito: CognitoIdentityServiceProvider;

    constructor() {
        this.cognito = new CognitoIdentityServiceProvider({ region: process.env.AWS_CONFIG_REGION});
    }

    async register({email, password, phone}: {email: string, password: string, phone: string}): Promise<{userId: string}> {
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Password: password,
            Username: email,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'phone_number',
                    Value: phone
                }
            ]
        };
    

        const { UserSub } = await this.cognito.signUp(params).promise();
        return { userId: UserSub };
    }

    async login({email, password}: {email: string, password: string}): Promise<string> {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                'USERNAME': email,
                'PASSWORD': password
            }
        };

        const { AuthenticationResult } = await this.cognito.initiateAuth(params).promise();
        return AuthenticationResult.AccessToken;
    }

    async getUser(userId: string): Promise<User> {
        const params = {
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: userId
        };

        const { UserAttributes } = await this.cognito.adminGetUser(params).promise();

        return {
            email: UserAttributes.find(attr => attr.Name === 'email').Value,
            phone: UserAttributes.find(attr => attr.Name === 'phone_number').Value
        };
    }

    async verifyToken(token: string): Promise<User> {
        const params = {
            AccessToken: token
        };

        const { Username } = await this.cognito.getUser(params).promise();
        return this.getUser(Username);
    }


    //generate refreshToken function for cognito
    async refreshToken(token: string): Promise<{accessToken: string, refreshToken: string}> {
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                'REFRESH_TOKEN': token
            }
        };

        const { AuthenticationResult } = await this.cognito.initiateAuth(params).promise();
        return { accessToken: AuthenticationResult.AccessToken || '', refreshToken: AuthenticationResult.RefreshToken || '' };
    }

}