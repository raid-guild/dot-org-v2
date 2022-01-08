import axios from 'axios';
import { withToken } from '../../../middlewares/withToken';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      await axios.post(
        `${process.env.SENTRY_WEBHOOK}/joinus/application`,
        req.body
      );
      res.status(201).json(req.body);
    } catch (err) {
      console.error(err);
      res.status(500).json('Internal server error');
    }
  }
};

export default withToken(handler);
