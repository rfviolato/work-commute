import getTotalTimeAtOffice from "./../day/total-time-at-office";
import getTotalMorningCommuteTime from "./../day/total-morning-commute-time";
import getTotalEveningCommuteTime from "./../day/total-evening-commute-time";
import {
  ITimetableChartResolverResult,
  IDayTimetableRecord,
} from "../../types";

export default (
  timetables: IDayTimetableRecord[]
): ITimetableChartResolverResult => {
  try {
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
  } catch (e) {
    throw new Error(e);
  }
};
