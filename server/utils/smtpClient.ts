import { SmtpClient } from "../deps.ts"
import { config } from "../config/config.ts"


export default async function send(recepient: string, title: string, message: string) {
    const client = new SmtpClient();
    await client.connect(config.smtp);

    await client.send({
        from: "mailaddress@163.com",
        to: recepient,
        subject: "Mail Title",
        content: message,
      });
      
      await client.close();
}