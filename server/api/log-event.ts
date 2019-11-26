import { NowRequest, NowResponse } from '@now/node';
import { DAY_FORMAT } from '../constants';
import moment from 'moment';
import { createDbClient } from './../lib/db';

export default async (request: NowRequest, response: NowResponse) => {
  const {
    body: { event, date },
  } = request;
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_FORMAT);

  if (!event) {
    return response.status(400).send({ error: 'Date is missing' });
  }

  if (!date) {
    return response.status(400).send({ error: 'Event is missing' });
  }

  try {
    const db = await createDbClient();

    await db.workTimetable.updateOne(
      { date: { $eq: day } },
      { $push: { events: event } },
      { upsert: true },
    );

    return response.status(200).end();
  } catch (exception) {
    return response.status(500).send({ error: exception });
  }
};
