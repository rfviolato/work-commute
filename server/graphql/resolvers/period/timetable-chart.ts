import { IDayTimetable } from '../../interface';
import getTotalTimeAtOffice from './../day/total-time-at-office';
import getTotalMorningCommuteTime from './../day/total-morning-commute-time';
import getTotalEveningCommuteTime from './../day/total-evening-commute-time';
import { ITimetableChartData } from './interface';

export default (timetables: IDayTimetable[]): ITimetableChartData[] => {
  return timetables.map((timetable) => {
    const totalMorningCommuteTime = getTotalMorningCommuteTime(timetable);
    const totalEveningCommuteTime = getTotalEveningCommuteTime(timetable);

    return {
      ...timetable,
      totalTimeAtOffice: getTotalTimeAtOffice(timetable),
      totalMorningCommuteTime,
      totalEveningCommuteTime,
    };
  });
};
