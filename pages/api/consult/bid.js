import { hireTable } from '../../../config';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const submissions_table = await hireTable();
      await submissions_table.update(req.body.id, {
        'Bid Hash': req.body.bid_hash,
        'Bid Amount': req.body.bid_amount
      });
      res.status(201).json(req.body);
    } catch (err) {
      console.log(err);
      res.status(500).json('Internal server error');
    }
  }
};

export default handler;
