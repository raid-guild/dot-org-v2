import axios from 'axios';
import { sign } from 'jsonwebtoken';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const token = sign(req.body, process.env.JWT_SECRET);
      await axios.patch(
        `${process.env.DM_ENDPOINT}/update/consultation`,
        req.body,
        {
          headers: {
            Authorization: 'Bearer ' + token
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

export default handler;
