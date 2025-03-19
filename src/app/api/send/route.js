import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const personalEmail = "ouma.godwin10@gmail.com";

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [personalEmail],
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      react: (
        <>
          <h1>{subject}</h1>
          <p>You have received a new message from your portfolio website:</p>
          <p><strong>From:</strong> {email}</p>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Message:</strong></p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: error.message || "An error occurred" });
  }
}
