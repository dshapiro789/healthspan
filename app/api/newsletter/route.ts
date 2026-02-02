import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Add to Resend audience and send welcome email if configured
    if (resend) {
      // Add to audience/list if audience ID is configured
      if (process.env.RESEND_AUDIENCE_ID) {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      }

      // Send welcome email
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Healthspan Productions <hello@healthspanevents.com>',
        to: email,
        subject: 'Welcome to Healthspan Productions!',
        html: `
          <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0D1B2A; color: #F8F9FA; padding: 40px;">
            <h1 style="color: #00A896; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; margin-bottom: 24px;">Welcome to Healthspan Productions</h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Thank you for joining our community of longevity enthusiasts and health innovators.</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">You'll be the first to know about:</p>
            <ul style="font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
              <li>Upcoming summits and events</li>
              <li>Exclusive speaker announcements</li>
              <li>Early access to registration</li>
              <li>Insights from leading longevity experts</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6; color: #00A896;">Here's to your healthspan,</p>
            <p style="font-size: 16px; line-height: 1.6;"><strong>The Healthspan Productions Team</strong></p>
          </div>
        `,
      });
    } else {
      // Log for development when Resend is not configured
      console.log('Newsletter subscription (Resend not configured):', email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
