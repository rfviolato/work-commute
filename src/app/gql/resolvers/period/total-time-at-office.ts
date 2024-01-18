import moment from "moment";
import { TIME_FORMAT } from "../../constants";
import { getTimeFromMinutes } from "../../utils/get-time-from-minutes";
import {
  ITotalTimeAtOfficeResolverResult,
  IDayTimetableRecord,
} from "../../types";

const calculateTotalTimeAtOffice = (
  timetables: IDayTimetableRecord[]
): ITotalTimeAtOfficeResolverResult => {
  try {
    const totalMinutesAtOffice = timetables.reduce(
      (accum, { workArriveTime, workLeaveTime, day }) => {
        if (workArriveTime && workLeaveTime) {
          const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);

          const workArriveDate = moment(workArriveTime, TIME_FORMAT);

          return (accum += workLeaveDate.diff(workArriveDate, "minutes"));
        }

        return accum;
      },
      0
    );

    return getTimeFromMinutes(totalMinutesAtOffice);
  } catch (e) {
    const error = new Error(e as string);

    throw error;
  }
};

export default calculateTotalTimeAtOffice;
