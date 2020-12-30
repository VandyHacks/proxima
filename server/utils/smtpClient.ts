import { SmtpClient } from "../deps.ts"
import { config } from "../config/config.ts"


async function send(recepient: string, subject: string, message: string) {
    const client = new SmtpClient();
    await client.connect(config.smtp);

    await client.send({
        from: config.email,
        to: recepient,
        subject: subject,
        content: message,
      });
      
    await client.close();
}
export { send }