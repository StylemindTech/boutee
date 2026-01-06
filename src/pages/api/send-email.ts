// src/pages/api/send-email.ts
import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';

interface FormData {
  name: string;
  brandName: string;
  email: string;
  website: string;
  instagram: string;
  message: string;
  phone?: string;
  heardAboutUs?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: FormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.brandName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Name, email, and brand name are required' 
        }),
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        }),
        { status: 400 }
      );
    }

    const postmarkToken = getSecret('POSTMARK_SERVER_TOKEN');
    
    if (!postmarkToken) {
      console.error('POSTMARK_SERVER_TOKEN is not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured' 
        }),
        { status: 500 }
      );
    }

    // Send notification email to Boutee
    const notificationEmail = {
      From: 'info@boutee.co.uk',
      To: 'ethan@boutee.co.uk',
      ReplyTo: data.email,
      Subject: `New Jeweller Application: ${data.brandName}`,
      HtmlBody: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Jeweller Application</h2>
          
          <div style="background-color: #f8f9fa; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Brand Name:</strong> ${data.brandName}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p style="margin: 0 0 8px 0;"><strong>Website:</strong> ${data.website || 'Not provided'}</p>
            <p style="margin: 0 0 8px 0;"><strong>Instagram:</strong> ${data.instagram || 'Not provided'}</p>
            ${data.heardAboutUs ? `<p style="margin: 0 0 8px 0;"><strong>How they heard about us:</strong> ${data.heardAboutUs}</p>` : ''}
          </div>
          
          ${data.message ? `
            <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
              <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${data.message}</p>
            </div>
          ` : ''}
        </div>
      `,
      TextBody: `
New Jeweller Application

Name: ${data.name}
Brand Name: ${data.brandName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ''}Website: ${data.website || 'Not provided'}
Instagram: ${data.instagram || 'Not provided'}
${data.heardAboutUs ? `How they heard about us: ${data.heardAboutUs}\n` : ''}

${data.message ? `Message:\n${data.message}` : ''}
      `,
      MessageStream: 'outbound'
    };

    // Send confirmation email to jeweller
    const confirmationEmail = {
      From: 'info@boutee.co.uk',
      To: data.email,
      Subject: 'Thank you for your interest in Boutee',
      HtmlBody: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; margin-bottom: 16px;">Thank you for your interest in Boutee</h2>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 16px;">
            Hi ${data.name},
          </p>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 16px;">
            Thank you for introducing ${data.brandName} to our platform. We're excited to learn more about your work!
          </p>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 16px;">
            Our partnerships team will review your application and be in touch shortly to discuss next steps. 
            We typically respond within 2-3 business days.
          </p>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            In the meantime, feel free to explore our platform and see the incredible community of jewellers we're building.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>Your application details:</strong><br/>
              Brand: ${data.brandName}<br/>
              ${data.website ? `Website: ${data.website}<br/>` : ''}
              ${data.instagram ? `Instagram: ${data.instagram}<br/>` : ''}
              ${data.phone ? `Phone: ${data.phone}<br/>` : ''}
              ${data.heardAboutUs ? `How you heard about us: ${data.heardAboutUs}` : ''}
            </p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 8px;">
            Best regards,<br/>
            The Boutee Team
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            This email was sent because you submitted an application on boutee.co.uk
          </p>
        </div>
      `,
      TextBody: `
Hi ${data.name},

Thank you for introducing ${data.brandName} to our platform. We're excited to learn more about your work!

Our partnerships team will review your application and be in touch shortly to discuss next steps. We typically respond within 2-3 business days.

In the meantime, feel free to explore our platform and see the incredible community of jewellers we're building.

Your application details:
Brand: ${data.brandName}
${data.website ? `Website: ${data.website}` : ''}
${data.instagram ? `Instagram: ${data.instagram}` : ''}
${data.phone ? `\nPhone: ${data.phone}` : ''}
${data.heardAboutUs ? `\nHow you heard about us: ${data.heardAboutUs}` : ''}

Best regards,
The Boutee Team

---
This email was sent because you submitted an application on boutee.co.uk
      `,
      MessageStream: 'outbound'
    };

    // Send both emails via Postmark API
    const [notificationResponse, confirmationResponse] = await Promise.all([
      fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': postmarkToken
        },
        body: JSON.stringify(notificationEmail)
      }),
      fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': postmarkToken
        },
        body: JSON.stringify(confirmationEmail)
      })
    ]);

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.json();
      console.error('Postmark notification error:', errorData);
      throw new Error('Failed to send notification email');
    }

    if (!confirmationResponse.ok) {
      const errorData = await confirmationResponse.json();
      console.error('Postmark confirmation error:', errorData);
      // Don't throw here - notification was sent successfully
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Application submitted successfully' 
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending emails:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to send application. Please try again.' 
      }),
      { status: 500 }
    );
  }
};
