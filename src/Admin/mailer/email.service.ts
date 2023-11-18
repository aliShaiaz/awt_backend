import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fsspring22@gmail.com',
        pass: 'uaim jssz jkac unrj',
    },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'fsspring22@gmail.com', 
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
