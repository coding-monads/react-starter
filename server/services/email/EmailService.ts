import { IUser } from "../../models/User";
import config from "config";
import nodemailer, {
  TransportOptions,
  Transport,
  Transporter,
  SendMailOptions
} from "nodemailer";

interface ITransporterAuth {
  user: string;
  pass: string;
}

export const sendVerificationEmail = (email: string, activationKey: string) => {
  const mailOptions = {
    from: "support <natripareact@gmail.com>",
    to: email,
    subject: "Account Activation",
    html: `
        To activate your account, click this link
        <a href="http://localhost:5000/api/users/activate/${activationKey}">Activate Account</a>
      `
  };
  sendEmail(mailOptions);
};

export const sendResetPasswordEmail = (email: string, resetKey: string) => {
  const mailOptions = {
    from: "support <natripareact@gmail.com>",
    to: email,
    subject: "Reset Password",
    html: `
        To reset your account password, click this link
        <a href="http://localhost:3000/password/update/${resetKey}">Reset Account Password</a>
      `
  };
  sendEmail(mailOptions);
};

const sendEmail = (mailOptions: SendMailOptions) => {
  const mailSettings: TransportOptions = config.get("mail.settings");
  const mailCredentials: ITransporterAuth = config.get("mail.credentials");

  const transporter = nodemailer.createTransport({
    ...mailSettings,
    auth: mailCredentials
  });
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) throw err;
  });
};
