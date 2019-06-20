import nodemailer, { TransportOptions, SendMailOptions } from "nodemailer";

export interface ITransporterAuth {
  user: string;
  pass: string;
}

export type VerificationMessage = {
  email: string;
  activationKey: string;
};

export type ResetPasswordMessage = {
  email: string;
  resetKey: string;
};

function isVerificationMessage(
  message: VerificationMessage | ResetPasswordMessage
): message is VerificationMessage {
  return (<VerificationMessage>message).activationKey !== undefined;
}

function isResetPasswordMessage(
  message: VerificationMessage | ResetPasswordMessage
): message is ResetPasswordMessage {
  return (<ResetPasswordMessage>message).resetKey !== undefined;
}

export interface SendMessageService {
  sendMessage(message: VerificationMessage | ResetPasswordMessage): void;
}

export class SendMessageServiceImpl implements SendMessageService {
  mailSettings: TransportOptions;
  mailCredentials: ITransporterAuth;

  constructor(
    mailSettings: TransportOptions,
    mailCredentials: ITransporterAuth
  ) {
    this.mailSettings = mailSettings;
    this.mailCredentials = mailCredentials;
  }

  sendMessage(message: VerificationMessage | ResetPasswordMessage): void {
    if (isVerificationMessage(message)) {
      this.sendVerificationEmail(message.email, message.activationKey);
    } else {
      this.sendResetPasswordEmail(message.email, message.resetKey);
    }
  }

  private sendVerificationEmail(email: string, activationKey: string) {
    const mailOptions = {
      from: "support <natripareact@gmail.com>",
      to: email,
      subject: "Account Activation",
      html: `
          To activate your account, click this link
          <a href="http://localhost:5000/api/users/activate/${activationKey}">Activate Account</a>
        `
    };
    this.sendEmail(mailOptions);
  }

  private sendResetPasswordEmail(email: string, resetKey: string) {
    const mailOptions = {
      from: "support <natripareact@gmail.com>",
      to: email,
      subject: "Reset Password",
      html: `
          To reset your account password, click this link
          <a href="http://localhost:3000/password/update/${resetKey}">Reset Account Password</a>
        `
    };
    this.sendEmail(mailOptions);
  }

  private sendEmail(mailOptions: SendMailOptions) {
    const transporter = nodemailer.createTransport({
      ...this.mailSettings,
      auth: this.mailCredentials
    });
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) throw err;
    });
  }
}
