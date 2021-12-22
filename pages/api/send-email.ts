
import { NextApiRequest, NextApiResponse } from 'next';
import NodeMailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, message } = req.body

    let transporter = NodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailData = {
        from: process.env.SMTP_EMAIL,
        to: process.env.TARGET_EMAIL,
        subject: `New inquiry - ${email}`,
        html: `
<pre>
Name: ${name}
Email: ${email}
Message: ${message}
</pre>
          `
    }

    let output;
    let isError = false
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            output = err
            isError = true
            console.log("Error", err)
        } else {
            console.log("Success", info)
            output = info
        }
    })

    return res.status(isError ? 500 : 200).json(output)
}