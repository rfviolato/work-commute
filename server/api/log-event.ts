import { NowRequest, NowResponse } from '@vercel/node';
import moment from 'moment';
import { createDbClient } from './../lib/db';
import { DAY_FORMAT } from '../constants';

export default async (request: NowRequest, response: NowResponse) => {
  const {
    body: { event, date },
  } = request;
  const momentDate = moment(date).utc();

  if (!event) {
    return response.status(400).send({ error: 'Date is missing' });
  }

  if (!date) {
    return response.status(400).send({ error: 'Event is missing' });
  }

  try {
    const db = await createDbClient();
    const day = momentDate.format(DAY_FORMAT);

    await db.workTimetable.updateOne(
      { day: { $eq: day } },
      {
        $push: { events: event },
        $setOnInsert: {
          date: new Date(momentDate.toISOString()),
          day,
        },
      },
      { upsert: true },
    );

    return response.status(200).end();
  } catch (exception) {
    return response.status(500).send({ error: exception });
  }
};
