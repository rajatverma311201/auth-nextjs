import nodemailer from "nodemailer";

class Mail {
    _domain = process.env.APP_URL;

    constructor(private readonly toEmail: string) {}

    async sendPasswordResetEmail(token: string) {
        const resetLink = `${this._domain}/auth/new-password?token=${token}`;

        await this.sendMail(
            "Reset your password",
            `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        );
    }

    async sendVerificationEmail(token: string) {
        const confirmLink = `${this._domain}/auth/new-verification?token=${token}`;

        await this.sendMail(
            "Confirm your email",
            `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
        );
    }

    private async sendMail(subject: string, content: string) {
        const transporter = nodemailer.createTransport({
            service: process.env.NODEMAILER_GMAIL_SERVICE,
            auth: {
                user: process.env.NODEMAILER_GMAIL_EMAIL,
                pass: process.env.NODEMAILER_GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `🔐 Auth-NextJS <${process.env.NODEMAILER_GMAIL_EMAIL}>`,
            to: this.toEmail,
            subject: subject,
            html: content,
        };

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }
}

export default Mail;
