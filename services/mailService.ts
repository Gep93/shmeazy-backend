import nodemailer from "nodemailer";

export default async function sendMail(
  from,
  to,
  subject,
  text = "",
  html = ""
) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "",
      pass: "",
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

export function getUserValidationBody(token: string): string {
  return `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
          <div style="margin: 0 auto; width: 70%; padding: 50px; background: gray">
          <h1>Thank you for registering!</h1>
          <p>Please click on the verification link below to verify your account.</p>
          <p>Verification link: <a href="http://localhost:5000/verification/${token}">Verify me</a></p>
      </div>
          </body>
        </html>`;
}
