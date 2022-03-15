import { verify } from 'jsonwebtoken';
import { hireTable } from '../../../config';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  const auth_header = req.headers.authorization;
  const token = auth_header && auth_header.split(' ')[1];

  if (token == null) return res.status(401).json('Not Authenticated.');

  let signerAddress = '';

  verify(token, process.env.JWT_SECRET, (err, address) => {
    if (err) return res.status(401).json('Invalid Token.');
    signerAddress = address;
  });

  try {
    const hire_table = await hireTable();
    const records = await hire_table
      .select({
        filterByFormula: `Address = "${signerAddress}"`
      })
      .firstPage();
    res.status(201).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error');
  }
};

export default handler;
