import * as moment from 'moment';
import { https } from './index';
import { db } from './db';
import { TIMETABLE_REF, DAY_REF_FORMAT, TIME_FORMAT } from './constants';

// const NO_DATE_ERROR = new Error('Error: Date is missing');
// const NO_EVENT_ERROR = new Error('Error: Event is missing');

export const getWorkedHours = https.onRequest(async (request, response) => {
  // const {
  //   body: { periodStart, periodEnd },
  // } = request;

  //temp
  const periodStart = '01-11-2019';
  const periodEnd = '10-11-2019';

  try {
    let workedMinutesInPeriod = 0;
    const snapshot = await db.ref(TIMETABLE_REF).once('value');
    const dateFormat = `${DAY_REF_FORMAT}T${TIME_FORMAT}`;

    snapshot.forEach(childSnapshot => {
      const day = childSnapshot.key;

      if (day) {
        const isInPeriod = moment(day).isBetween(periodStart, periodEnd);

        if (isInPeriod) {
          const dayTimeTable = childSnapshot.val();
          const workLeaveTime = moment(
            `${day}T${dayTimeTable.workLeaveTime}`,
            dateFormat,
          );
          const workArriveTime = moment(
            `${day}T${dayTimeTable.workArriveTime}`,
            dateFormat,
          );

          workedMinutesInPeriod += workLeaveTime.diff(
            workArriveTime,
            'minutes',
          );
        }
      }
    });

    const hours = Math.floor(workedMinutesInPeriod / 60);
    const minutes = workedMinutesInPeriod % 60;

    return response
      .status(200)
      .send({ amountWorkedInPeriod: { hours, minutes } });
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
});
