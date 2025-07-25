import { env } from '@/config/env.config'
import nodeMailer from 'nodemailer'
import { ErrorResponse } from '@/lib/http/ErrorResponse'

const transporter = nodeMailer.createTransport({
  service: env.MAIL_SERVICE,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASSWORD,
  },
})

async function sendMail(
  senderAddress: string,
  subject: string,
  description: string
): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: `"${senderAddress}" <${env.MAIL_USER}>`,
      to: env.MAIL_RECEIVER,
      subject: subject,
      html: `from : ${senderAddress} <br> ${description}`,
    })

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    throw new ErrorResponse.InternalServer('Failed send email')
  }
}

export const MailSmpt = {
  sendMail,
}
