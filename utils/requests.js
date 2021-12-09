import axios from 'axios';
import jwt from 'jsonwebtoken';
// import sgMail from '@sendgrid/mail';

import { formatJoinUsData } from './helpers';

export const submitApplicationToMongo = async (state, signature) => {
  const formattedData = formatJoinUsData(state, 'mongo');
  const signedToken = jwt.sign(signature, process.env.NEXT_PUBLIC_JWT_SECRET);

  await axios.post('/api/join/primary', formattedData, {
    headers: {
      Authorization: 'Bearer ' + signedToken
    }
  });
};

export const submitApplicationToAirtable = async (state, signature) => {
  const formattedData = formatJoinUsData(state, 'airtable');
  const signedToken = jwt.sign(signature, process.env.NEXT_PUBLIC_JWT_SECRET);

  await axios.post('/api/join/secondary', formattedData, {
    headers: {
      Authorization: 'Bearer ' + signedToken
    }
  });
};

export const notifyApplicationSubmission = async (state, signature) => {
  const formattedData = formatJoinUsData(state, 'discord');
  const signedToken = jwt.sign(signature, process.env.NEXT_PUBLIC_JWT_SECRET);

  await axios.post('/api/join/notify', formattedData, {
    headers: {
      Authorization: 'Bearer ' + signedToken
    }
  });
};

// export const applicationConfirmationEmail = async (name, email) => {
//   sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY);
//   try {
//     const msg = {
//       to: email,
//       from: process.env.NEXT_PUBLIC_FROM_MAIL,
//       template_id: process.env.NEXT_PUBLIC_SENDGRID_JOINUS_TEMPLATE_ID,
//       dynamic_template_data: {
//         name
//       }
//     };
//     sgMail.send(msg);
//   } catch (err) {
//     console.log(err);
//   }
// };
