import Airtable from 'airtable';

const createIssue = async ({ name, email, message }) => {
  const key = process.env.AIRTABLE_API_KEY;
  const base = new Airtable({ apiKey: key }).base('appan4cEKUZROFR7a');
  return new Promise((resolve, reject) => {
    base('TypgingGuru-Issues').create(
      [
        {
          fields: {
            Name: name,
            Email: email,
            Message: message,
          },
        },
      ],
      (err, record) => {
        if (err) {
          reject(err);
        } else {
          resolve(record);
        }
      }
    );
  });
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);
    await createIssue(req.body);
    // res.status(200).send('Success');
    res.send({ message: 'Success' });

    // Process a POST request
  }
  res.send({ message: `nothing to see here` });
  // Handle any other HTTP method
};

export default handler;
