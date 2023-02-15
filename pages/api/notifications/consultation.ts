import { NextApiRequest, NextApiResponse } from 'next';

const { CONSULTATION_WEBHOOK_URL } = process.env;

export const consultation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  const response = await fetch(CONSULTATION_WEBHOOK_URL || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: body.title,
          url: body.url,
          color: 14625343,
          fields: [
            {
              name: 'Project Type',
              value: body.projectType || 'None provided',
            },
            {
              name: 'Specs Link',
              value: body.specsLink || 'None provided',
            },
            {
              name: 'Budget Range',
              value: body.budgetRange || 'None provided',
            },
            {
              name: 'Services Required',
              value: body.servicesRequired || 'None provided',
            },
            {
              name: 'Discord',
              value: body.discord || 'None provided',
            },
          ],
          author: {
            name: body.author,
          },
          timestamp: new Date(),
        },
      ],
      attachments: [],
    }),
  });

  if (!response.ok) {
    console.error('Error sending message to Discord');
  }
  res.end();
};

export default consultation;
