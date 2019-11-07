import { https } from './index';
import { logDate } from './log-date';

const NO_DATE_ERROR = new Error('Date is missing!');

export const logHomeLeave = https.onRequest(async (request, response) => {
  const {
    body: { date }
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATE_ERROR);
  }

  try {
    await logDate(date, 'homeLeaveTime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});

export const logHomeArrive = https.onRequest(async (request, response) => {
  const {
    body: { date }
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATE_ERROR);
  }

  try {
    await logDate(date, 'homeArriveTime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});

export const logWorkLeave = https.onRequest(async (request, response) => {
  const {
    body: { date }
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATE_ERROR);
  }

  try {
    await logDate(date, 'workLeaveLime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});

export const logWorkArrive = https.onRequest(async (request, response) => {
  const {
    body: { date }
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATE_ERROR);
  }

  try {
    await logDate(date, 'workArriveTime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});
