import { https } from './index';
import { logDate } from './log-date.util';

const NO_DATA_ERROR = new Error('Error: Date is missing');

export const logHomeLeave = https.onRequest(async (request, response) => {
  const {
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATA_ERROR);
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
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATA_ERROR);
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
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATA_ERROR);
  }

  try {
    await logDate(date, 'workLeaveTime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});

export const logWorkArrive = https.onRequest(async (request, response) => {
  const {
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send(NO_DATA_ERROR);
  }

  try {
    await logDate(date, 'workArriveTime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});
