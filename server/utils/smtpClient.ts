import { SmtpClient } from "../deps.ts"
import { config } from "../config/config.ts"

/**
 * Sends an email using TLS connection. Requires credentials in .env, which 
 * are imported in config.ts.
 * @param recepient 
 * @param subject 
 * @param message 
 */
async function send(recepient: string, subject: string, message: string) {
    const client = new SmtpClient();

    await client.connectTLS(config.smtp);

    await client.send({
        from: config.email,
        to: recepient,
        subject: subject,
        content: message,
      });
    
    console.log(`Update of status email sent to ${recepient}`);

    await client.close();
}
export { send }