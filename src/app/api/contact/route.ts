import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '0e99d951-1e56-418f-9911-fb8b9aa8e827';

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `Portfolio Inquiry: ${subject}`,
        message: `Sender: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        botcheck: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Web3Forms server error:', response.status, errorText);
      return NextResponse.json(
        { success: false, message: 'Server delivery failed. Sending directly from client.' },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: data.message || 'Form submitted successfully!' });
    } else {
      return NextResponse.json({ success: false, message: data.message || 'Form submission failed' }, { status: 400 });
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Contact API Error:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error occurred' }, { status: 500 });
  }
}

