import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? '';
  let name = '';
  let email = '';
  let message = '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    name = String(body?.name ?? '').trim();
    email = String(body?.email ?? '').trim();
    message = String(body?.message ?? '').trim();
  } else {
    const formData = await request.formData();
    name = String(formData.get('name') ?? '').trim();
    email = String(formData.get('email') ?? '').trim();
    message = String(formData.get('message') ?? '').trim();
  }

  if (!name || !emailPattern.test(email) || message.length < 10) {
    return new Response(JSON.stringify({ error: 'Invalid form submission.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.RESEND_TO_EMAIL;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

  if (!apiKey || !toEmail) {
    return new Response(JSON.stringify({ error: 'Email service is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
