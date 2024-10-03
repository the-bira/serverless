import { IAuthProvider } from '../providers/auth';
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from 'crypto';

export class CognitoAuth implements IAuthProvider {

  private client: CognitoIdentityProviderClient

  constructor() {
    this.client = new CognitoIdentityProviderClient({ region: process.env.AWS_CONFIG_REGION });
  }

  private calculateSecretHash(username: string): string {
    return crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET!)
      .update(username + process.env.COGNITO_CLIENT_ID!)
      .digest('base64');
  }

  async register(email: string, password: string, phone: string): Promise<{id: string}> {
    const secretHash = this.calculateSecretHash(email);

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      SecretHash: secretHash,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'phone_number',
          Value: phone
        },
        {
          Name: 'email',
          Value: email
        }
      ]
    });

    const response = await this.client.send(command);
    const id = response.UserSub!;
    return { id };
  }
}