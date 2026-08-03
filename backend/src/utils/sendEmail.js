const nodemailer = require('nodemailer');

/**
 * Build the HTML email body for OTP delivery.
 */
const buildHtml = (otp) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:28px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                SkillSwapp
              </h1>
              <p style="margin:4px 0 0;color:#bfdbfe;font-size:13px;">
                Password Reset Request
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
                We received a request to reset the password for your SkillSwapp account.
                Use the one-time code below to continue:
              </p>
              <!-- OTP Box -->
              <div style="text-align:center;margin:28px 0;">
                <div style="display:inline-block;background:#eff6ff;border:1.5px dashed #93c5fd;
                            border-radius:14px;padding:16px 36px;">
                  <span style="font-size:36px;font-weight:800;letter-spacing:10px;
                               color:#2563eb;font-family:monospace;">
                    ${otp}
                  </span>
                </div>
              </div>
              <p style="margin:0 0 8px;color:#64748b;font-size:13px;line-height:1.5;">
                ⏱ This code expires in <strong>10 minutes</strong>.
              </p>
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                If you did not request this, you can safely ignore this email.
                Your password will not be changed.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #f1f5f9;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">
                SkillSwapp — Connect, Share, Learn &nbsp;|&nbsp; Do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/**
 * Create a real Nodemailer transporter from env SMTP config.
 */
const createSmtpTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

/**
 * Create an Ethereal test transporter (dev-only).
 * Ethereal is a fake SMTP service — emails are captured and viewable
 * at a preview URL printed in the console. No account setup needed.
 */
const createEtherealTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  return { transporter, testAccount };
};

/**
 * Send OTP email.
 * Priority:
 *   1. Real SMTP (SMTP_HOST / SMTP_USER / SMTP_PASS set in .env)
 *   2. Ethereal preview  (dev fallback — shows a clickable preview URL)
 *   3. Console log only  (if Ethereal also fails for any reason)
 *
 * @param {Object} options
 * @param {string} options.to        - Recipient email address
 * @param {string} options.subject   - Email subject line
 * @param {string} options.otp       - 6-digit OTP code
 */
const sendEmail = async ({ to, subject, otp }) => {
  const html = buildHtml(otp);
  const text = `Your SkillSwapp password reset OTP is: ${otp}\nThis code expires in 10 minutes.`;
  const mailSubject = subject || 'SkillSwapp — Your Password Reset Code';
  const from = process.env.EMAIL_FROM || 'SkillSwapp <noreply@skillswapp.com>';

  // ── Always print OTP to console (handy safety net) ──────────────────────
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log(`║  OTP DISPATCH  →  To: ${to}`);
  console.log(`║  CODE          →  ${otp}`);
  console.log('╚══════════════════════════════════════════════╝\n');

  // ── 1. Try real SMTP if configured ──────────────────────────────────────
  const smtpTransporter = createSmtpTransporter();
  if (smtpTransporter) {
    try {
      await smtpTransporter.sendMail({ from, to, subject: mailSubject, text, html });
      console.log(`[Nodemailer ✓] Email delivered to ${to} via SMTP`);
      return { success: true, mode: 'smtp' };
    } catch (err) {
      console.error(`[Nodemailer ✗] SMTP failed: ${err.message}`);
      console.log('[Nodemailer] Falling back to Ethereal preview...');
    }
  }

  // ── 2. Ethereal dev preview (auto-creates a free test account) ───────────
  try {
    const { transporter, testAccount } = await createEtherealTransporter();
    const info = await transporter.sendMail({ from, to, subject: mailSubject, text, html });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('');
    console.log('┌─────────────────────────────────────────────────────┐');
    console.log('│  📧  ETHEREAL EMAIL PREVIEW (DEV MODE)               │');
    console.log(`│  Open this URL to view the email in your browser:    │`);
    console.log(`│  ${previewUrl}`);
    console.log('└─────────────────────────────────────────────────────┘');
    console.log('');
    console.log(`[Ethereal ✓] Preview account: ${testAccount.user}`);
    return { success: true, mode: 'ethereal', previewUrl };
  } catch (err) {
    console.error(`[Ethereal ✗] Failed: ${err.message}`);
  }

  // ── 3. Pure console fallback ─────────────────────────────────────────────
  console.log('[sendEmail] Console-only fallback active. OTP is printed above.');
  return { success: true, mode: 'console' };
};

module.exports = sendEmail;
