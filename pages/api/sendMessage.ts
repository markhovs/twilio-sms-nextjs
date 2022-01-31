import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
require('dotenv').config()

export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
  const token = <string>process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone, message } = req.body;
  // console.log(phone, message);

  console.log(process.env.PHONE_NUMBER);
  
  client.messages
    .create({
      body: message,
      from: process.env.PHONE_NUMBER,
      to: phone,
    })
    .then((message) =>
      res.json({
        success: true,
        sentMessage: message
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}