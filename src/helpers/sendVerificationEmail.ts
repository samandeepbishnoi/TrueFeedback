import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'TrueFeedback Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError: any) { // Type error as `any` if it's not well defined
    console.error('Error sending verification email:', emailError.message || emailError);
    return { success: false, message: 'Failed to send verification email.', error: emailError.message || emailError };
  }
}
