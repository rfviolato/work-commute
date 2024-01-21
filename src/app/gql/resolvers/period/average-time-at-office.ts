import moment from "moment";
import { TIME_FORMAT } from "../../constants";
import { getTimeFromMinutes } from "../../utils/get-time-from-minutes";
import {
  IAverageTimeAtOfficeResolverResult,
  IDayTimetableRecord,
} from "../../types";

const averageTimeAtOfficeResolver = (
  timetables: IDayTimetableRecord[]
): IAverageTimeAtOfficeResolverResult => {
  try {
    const result = timetables.reduce(
      (accum, { workArriveTime, workLeaveTime }) => {
        // Removed unused variable 'day'
        if (workArriveTime && workLeaveTime) {
          const workArriveDate = moment(workArriveTime, TIME_FORMAT);
          const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);
          const minutesAtTheOffice = workLeaveDate.diff(
            workArriveDate,
            "minutes"
          );

          accum.workdayCount++;
          accum.minutesAtTheOffice += minutesAtTheOffice;
        }

        return accum;
      },
      { minutesAtTheOffice: 0, workdayCount: 0 }
    );

    const averageMinutesAtOffice =
      result.minutesAtTheOffice / result.workdayCount;

    if (isNaN(averageMinutesAtOffice) || averageMinutesAtOffice === Infinity) {
      return getTimeFromMinutes(0);
    }

    return getTimeFromMinutes(averageMinutesAtOffice);
  } catch (e) {
    const error = new Error(e as string);

    throw error;
  }
};

export default averageTimeAtOfficeResolver;
