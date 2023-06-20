import { createTransport } from "nodemailer";
import { EmailRequest } from "../interfaces/users.interfaces";
import { AppError } from "../errors";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: EmailRequest) {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter
      .sendMail({
        from: "cardealershipt14g10@gmail.com",
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("Email sent with successfully");
      })
      .catch((err) => {
        console.log(err);
        throw new AppError("Error sending email, try again later", 500);
      });
  }

  resetPasswordTemplate(userName: string, userEmail: string, resetToken: string) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Cardealership",
        link: "http://localhost:5173/",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#4529E6",
            text: "Reset your password",
            link: `http://localhost:5173/changePassword/${resetToken}`,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Reset password",
      text: emailBody,
    };

    return emailTemplate;
  }
}

const emailService = new EmailService();

export { emailService };
