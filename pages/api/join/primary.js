export default handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await axios.post(process.env.DM_ENDPOINT, req.body);
      res.status(201).json(req.body);
    } catch (err) {
      console.error(err);
      res.status(500).json('Internal server error');
    }
  } else {
    res.status(405).json('Method not allowed');
  }
};
