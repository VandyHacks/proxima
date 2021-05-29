import * as nodemailer from 'nodemailer';
import * as nodemailerSendgrid from 'nodemailer-sendgrid';

async function send(email: string, subject: string, emailHtml: string) {
  const transporter = await nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY
    })
  );

  const msgInfo = {
    from: '"VandyHacks" <info@vandyhacks.org>',
    to: email,
    // replyTo: // consider allowing user to input this field (starting convo w/ specific committee members) on frontend IF they're being accepted or interviewed,
    subject: subject,
    html: emailHtml
  };

  await transporter.sendMail(msgInfo, function (err: any) {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent to ' + email);
    }
  });
}

export { send };