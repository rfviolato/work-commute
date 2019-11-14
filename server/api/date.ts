import { NowRequest, NowResponse } from '@now/node';
import { db } from './../config/firebase';

export default async (req: NowRequest, res: NowResponse) => {
  const snapshot = await db.ref('/workDayTimetables/10-11-2019').once('value');
  const dayTimetable = snapshot.val();

  res.send(dayTimetable.workArriveTime);
};
