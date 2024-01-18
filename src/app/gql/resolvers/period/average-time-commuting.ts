import moment from "moment";
import { TIME_FORMAT } from "../../constants";
import { getTimeFromMinutes } from "./../../utils/get-time-from-minutes";
import {
  IDayTimetableRecord,
  IAverageTimeCommutingResolverResult,
} from "../../types";

const averageTimeCommutingResolver = (
  timetables: IDayTimetableRecord[]
): IAverageTimeCommutingResolverResult => {
  try {
    const result = timetables.reduce(
      (
        accum,
        { homeLeaveTime, workArriveTime, workLeaveTime, homeArriveTime }
      ) => {
        const hasMorningCommute = homeLeaveTime && workArriveTime;
        const hasEveningCommute = workLeaveTime && homeArriveTime;

        if (hasMorningCommute) {
          const homeLeaveDate = moment(homeLeaveTime, TIME_FORMAT);
          const workArriveDate = moment(workArriveTime, TIME_FORMAT);
          const morningCommuteMinutes = workArriveDate.diff(
            homeLeaveDate,
            "minutes"
          );

          accum.minutesCommuting += morningCommuteMinutes;
          accum.commuteCount++;
        }

        if (hasEveningCommute) {
          const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);
          const homeArriveDate = moment(homeArriveTime, TIME_FORMAT);
          const eveningCommuteInMinutes = homeArriveDate.diff(
            workLeaveDate,
            "minutes"
          );

          accum.minutesCommuting += eveningCommuteInMinutes;
          accum.commuteCount++;
        }

        return accum;
      },
      { minutesCommuting: 0, commuteCount: 0 }
    );

    const averageMinutesCommuting =
      result.minutesCommuting / result.commuteCount;

    if (
      isNaN(averageMinutesCommuting) ||
      averageMinutesCommuting === Infinity
    ) {
      return getTimeFromMinutes(0);
    }

    return getTimeFromMinutes(averageMinutesCommuting);
  } catch (e) {
    const error = new Error(e as string);

    throw error;
  }
};

export default averageTimeCommutingResolver;
