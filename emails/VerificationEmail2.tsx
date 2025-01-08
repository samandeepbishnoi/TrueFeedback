export default function VerificationEmail({
  username,
  otp,
}: {
  username: string;
  otp: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Verification Code</title>
      </head>
      <body>
        <h1>Hello, ${username}</h1>
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>Please use this code to complete your verification process.</p>
      </body>
    </html>
  `;
}
