import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

const { MINISTER_SENTRY_API_URL, JWT_SECRET } = process.env;

export const ministerSentry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  try {
    if (!MINISTER_SENTRY_API_URL) {
      throw new Error('Invalid/Missing environment variable: "MINISTER_SENTRY_API_URL"');
    }

    if (!JWT_SECRET) {
      throw new Error('Invalid/Missing environment variable: "JWT_SECRET"');
    }

    if (!body) {
      throw new Error('Invalid request body');
    }

    const token = sign(body, JWT_SECRET);

    const response = await fetch(`${MINISTER_SENTRY_API_URL}/${body.endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Error sending message to Minister Sentry');
    }

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export default ministerSentry;
