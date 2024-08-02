// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to E-Court Filing System! Confirm your Email',
      template: './confirmation', // The template path
      context: { // Data to be sent to template
        token,
      },
    });
  }

  async sendRespondentNotification(email: string, caseId: number) {
    const signupLink = `https://your-app.com/signup?caseId=${caseId}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Case Filed Against You - E-Court Filing System',
      template: './respondent-notification',
      context: {
        signupLink,
        caseId,
      },
    });
  }

  async sendHearingNotification(email: string, caseId: string, hearingDate: string, recipientRole: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Hearing Date Set - E-Court Filing System',
      template: './hearing-notification',
      context: {
        caseId,
        hearingDate,
        recipientRole,
      },
    });
  }
}
