import { joinTable } from '../../../config';
import { withToken } from '../../../middlewares/withToken';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const submissions_table = await joinTable();
      await submissions_table.create(req.body);
      res.status(201).json(req.body);
    } catch (err) {
      console.error(err);
      res.status(500).json('Internal server error');
    }
  }
};

export default withToken(handler);
