import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';

admin.initializeApp();
const db = admin.database();

const logDate = async (date: string, dbKey: string) => {
  const momentDate = moment(date).utc();
  const today = momentDate.format('DD-MM-YYYY');
  const time = momentDate.format('HH:mm:ssZ');

  await db
    .ref('/')
    .child(today)
    .update({ [dbKey]: time });
};

export const logHomeLeave = functions.https.onRequest(
  async (request, response) => {
    const {
      body: { date }
    } = request;

    if (!date) {
      return response.status(400).send(new Error('Date is missing!'));
    }

    try {
      await logDate(date, 'homeLeaveTime');

      return response.status(200).send();
    } catch (exception) {
      return response.status(500).send(new Error(exception));
    }
  }
);

export const logHomeArrive = functions.https.onRequest(
  async (request, response) => {
    const {
      body: { date }
    } = request;

    if (!date) {
      return response.status(400).send(new Error('Date is missing!'));
    }

    try {
      await logDate(date, 'homeArriveTime');

      return response.status(200).send();
    } catch (exception) {
      return response.status(500).send(new Error(exception));
    }
  }
);

export const logWorkLeave = functions.https.onRequest(
  async (request, response) => {
    const {
      body: { date }
    } = request;

    if (!date) {
      return response.status(400).send(new Error('Date is missing!'));
    }

    try {
      await logDate(date, 'workLeaveLime');

      return response.status(200).send();
    } catch (exception) {
      return response.status(500).send(new Error(exception));
    }
  }
);

export const logWorkArrive = functions.https.onRequest(
  async (request, response) => {
    const {
      body: { date }
    } = request;

    if (!date) {
      return response.status(400).send(new Error('Date is missing!'));
    }

    try {
      await logDate(date, 'workArriveTime');

      return response.status(200).send();
    } catch (exception) {
      return response.status(500).send(new Error(exception));
    }
  }
);
