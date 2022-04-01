import axios from 'axios';
import jwt from 'jsonwebtoken';
import { withToken } from '../../../middlewares/withToken';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: 5 * 60 });

    try {
      await axios.post(
        `${process.env.SENTRY_WEBHOOK}/joinus/application`,
        req.body,
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      );
      res.status(201).json(req.body);
    } catch (err) {
      console.error(err);
      res.status(500).json('Internal server error');
    }
  }
};

export default withToken(handler);
