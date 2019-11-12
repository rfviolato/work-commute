import * as moment from 'moment';
import { https } from './index';
import { db } from './db';
import { TIMETABLE_REF, EVENTS_REF, DAY_REF_FORMAT } from './constants';

const NO_DATE_ERROR = new Error('Error: Date is missing');
const NO_EVENT_ERROR = new Error('Error: Event is missing');

export const logEvent = https.onRequest(async (request, response) => {
  const {
    body: { event, date }
  } = request;
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_REF_FORMAT);

  if (!event) {
    return response.status(400).send(NO_DATE_ERROR);
  }

  if (!date) {
    return response.status(400).send(NO_EVENT_ERROR);
  }

  try {
    await db
      .ref(TIMETABLE_REF)
      .child(day)
      .child(EVENTS_REF)
      .push(event);

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});
