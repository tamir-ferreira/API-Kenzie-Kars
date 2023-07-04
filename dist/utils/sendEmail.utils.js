"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = require("nodemailer");
const errors_1 = require("../errors");
const mailgen_1 = __importDefault(require("mailgen"));
class EmailService {
    sendEmail({ to, subject, text }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, nodemailer_1.createTransport)({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            yield transporter
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
                throw new errors_1.AppError("Erro ao enviar email, tente novamente", 500);
            });
        });
    }
    resetPasswordTemplate(userName, userEmail, resetToken) {
        const mailGenerator = new mailgen_1.default({
            theme: "default",
            product: {
                name: "Cardealership",
                link: "http://localhost:5173/",
            },
        });
        const email = {
            body: {
                name: userName,
                intro: "Você recebeu esse email pois uma requisição para alteração de senha foi feita.",
                action: {
                    instructions: "Clique no botão abaixo para alterar a senha:",
                    button: {
                        color: "#4529E6",
                        text: "Altere sua senha",
                        link: `http://localhost:5173/changePassword/${resetToken}`,
                    },
                },
                outro: "Se você não realizou a requisição, não é necessário realizar nenhum tipo de ação.",
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
exports.emailService = emailService;
