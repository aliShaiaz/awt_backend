// email.service.ts

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
        pass: ,
    },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'fsspring22@gmail.com', // Replace with your Gmail email
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
