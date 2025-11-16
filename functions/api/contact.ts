const RESEND_API_ENDPOINT = 'https://api.resend.com/emails';

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM?: string;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  try {
    const { fullName, email, message } = (await request.json()) as {
      fullName?: string;
      email?: string;
      message?: string;
    };

    if (!fullName || fullName.trim().length < 2) {
      return new Response('Invalid name', { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return new Response('Invalid email', { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return new Response('Message too short', { status: 400 });
    }

    if (!env.RESEND_API_KEY) {
      return new Response('Missing RESEND_API_KEY', { status: 500 });
    }

    if (!env.CONTACT_TO) {
      return new Response('Missing CONTACT_TO', { status: 500 });
    }

    // Send from your verified domain; override via CONTACT_FROM if you prefer a different mailbox.
    const fromAddress = env.CONTACT_FROM ?? 'noreply@ahmadalshaib.com';

    const payload = {
      from: fromAddress,
      to: [env.CONTACT_TO],
      subject: `New contact from ${fullName}`,
      reply_to: email,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    const response = await fetch(RESEND_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.text();
      return new Response(`Mail send failed: ${body}`, { status: 502 });
    }

    return new Response('Message sent', { status: 200 });
  } catch (error) {
    return new Response('Invalid payload', { status: 400 });
  }
}
