import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';

admin.initializeApp();

const db = admin.database();

export const logHomeLeave = functions.https.onRequest(
  async (request, response) => {
    const {
      body: { date }
    } = request;

    console.log({ date });

    if (!date) {
      return response.status(400).send(new Error('Date is missing!'));
    }

    const momentDate = moment(date);
    const today = momentDate.format('DD-MM-YYYY');
    const homeLeaveTime = momentDate.format('hh:mm:ss');

    try {
      await db
        .ref('/')
        .child(today)
        .set({ homeLeaveTime });

      return response.status(200).send();
    } catch (exception) {
      return response.status(500).send(new Error(exception));
    }
  }
);
