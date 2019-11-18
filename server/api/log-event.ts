import { NowRequest, NowResponse } from '@now/node';
import {
  DAY_REF_FORMAT,
  TIMETABLE_REF,
  EVENTS_REF,
} from './../config/constants';
import { db } from './../config/firebase';
import moment from 'moment';

export default async (request: NowRequest, response: NowResponse) => {
  const {
    body: { event, date },
  } = request;
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_REF_FORMAT);

  if (!event) {
    return response.status(400).send({ error: 'Date is missing' });
  }

  if (!date) {
    return response.status(400).send({ error: 'Event is missing' });
  }

  try {
    await db
      .ref(TIMETABLE_REF)
      .child(day)
      .child(EVENTS_REF)
      .push(event);

    return response.status(200).end();
  } catch (exception) {
    return response.status(500).send({ error: exception });
  }
};
