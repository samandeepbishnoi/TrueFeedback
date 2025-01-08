import VerificationEmail from "../../emails/VerificationEmail2";
import { ApiResponse } from "@/types/ApiResponse";
import * as sgMail from "@sendgrid/mail";
import { renderToStaticMarkup } from "react-dom/server";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Set the API key for SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Construct the email message
    const msg = {
      from: "samandeepbishnoi@gmail.com",
      to: email,
      subject: "TrueFeedback Verification Code",
      html: VerificationEmail({ username, otp: verifyCode }), // Render HTML content
    };

    // Send the email and await its completion
    await sgMail.send(msg);

    // Return success response
    return { success: true, message: "Verification email sent successfully." };
  } catch (error: any) {
    // Handle and log errors
    console.error("Error sending verification email:", error.message || error);

    return {
      success: false,
      message: "Failed to send verification email.",
      error: error.message || error,
    };
  }
}
