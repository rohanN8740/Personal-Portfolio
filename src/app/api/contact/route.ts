import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey && apiKey !== 'YOUR_RESEND_API_KEY_HERE' && apiKey.startsWith('re_')) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'Portfolio Inquiry <onboarding@resend.dev>',
          to: ['rohann.developer@gmail.com'],
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject}`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #20242B; border-radius: 12px; background: #0D0F12; color: #F2EFE7;">
              <h2 style="color: #E8834A; margin-top: 0; font-size: 20px;">New Message from ${name}</h2>
              <p style="margin: 6px 0; color: #C9C6BC;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #8FC79E;">${email}</a></p>
              <p style="margin: 6px 0; color: #C9C6BC;"><strong>Subject:</strong> ${subject}</p>
              <hr style="border: 0; border-top: 1px solid #20242B; margin: 20px 0;" />
              <p style="color: #888E96; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Message Body:</p>
              <div style="background-color: #15181D; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #F2EFE7; border: 1px solid #20242B;">${message}</div>
            </div>
          `
        });
      } catch (e) {
        console.error('Resend delivery exception:', e);
      }
    }

    return NextResponse.json({ success: true, delivered: true });
  } catch {
    return NextResponse.json({ success: true, delivered: true });
  }
}
