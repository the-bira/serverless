import { IMailer } from '../providers/mailer';
import { resend } from './mail/resend-client';

export class ResendMailer implements IMailer {
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: body,
    });
  }
}