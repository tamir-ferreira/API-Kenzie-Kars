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
        console.log("Email enviado com sucesso");
      })
      .catch((err) => {
        console.log(err);
        throw new AppError("Erro ao enviar email, tente novamente", 500);
      });
  }

  resetPasswordTemplate(
    userName: string,
    userEmail: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Cardealership",
        link: "https://dealer-vehicles.vercel.app/",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "Você recebeu esse email pois uma requisição para alteração de senha foi feita.",
        action: {
          instructions: "Clique no botão abaixo para alterar a senha:",
          button: {
            color: "#4529E6",
            text: "Altere sua senha",
            link: `https://dealer-vehicles.vercel.app/changePassword/${resetToken}`,
          },
        },
        outro:
          "Se você não realizou a requisição, não é necessário realizar nenhum tipo de ação.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Resetar senha",
      text: emailBody,
    };

    return emailTemplate;
  }
}

const emailService = new EmailService();

export { emailService };
