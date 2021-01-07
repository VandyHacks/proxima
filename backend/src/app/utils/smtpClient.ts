import { SMTPClient } from "smtp-client";

/**
 * Sends an email using TLS connection. Requires credentials in .env, which
 * are imported in config.ts.
 * @param recepient
 * @param subject
 * @param message
 */
async function send(recepient: string, subject: string, message: string) {
  const client = new SMTPClient({
    host: "mx.domain.com",
    port: 25,
  });

  try {
    await client.connect();
    await client.greet({ hostname: "mx.domain.com" }); // runs EHLO command or HELO as a fallback
    await client.authPlain({ username: "john", password: "secret" }); // authenticates a user
    await client.mail({ from: "from@sender.com" }); // runs MAIL FROM command
    await client.rcpt({ to: recepient }); // runs RCPT TO command (run this multiple times to add more recii)
    await client.data(message); // runs DATA command and streams email source
    await client.quit(); // runs QUIT command
  } catch (err) {
    console.error(err);
  }

  console.log(`Update of status email sent to ${recepient}`);

  await client.close();
}
export { send };
