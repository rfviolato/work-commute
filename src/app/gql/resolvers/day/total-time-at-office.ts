import moment from "moment";
import { getTimeFromMinutes } from "../../utils/get-time-from-minutes";
import { TIME_FORMAT } from "../../constants";
import {
  ITotalTimeAtOfficeResolverResult,
  IDayTimetableRecord,
} from "../../types";

const calculateTotalTimeAtOffice = ({
  workArriveTime,
  workLeaveTime,
}: IDayTimetableRecord): ITotalTimeAtOfficeResolverResult => {
  try {
    if (workArriveTime && workLeaveTime) {
      const workArriveDate = moment(workArriveTime, TIME_FORMAT);

      const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);

      return getTimeFromMinutes(workLeaveDate.diff(workArriveDate, "minutes"));
    }

    if (workArriveTime && !workLeaveTime) {
      const workArriveDate = moment(workArriveTime, TIME_FORMAT);
      const workLeaveDate = moment();

      return getTimeFromMinutes(workLeaveDate.diff(workArriveDate, "minutes"));
    }

    return getTimeFromMinutes(0);
  } catch (e) {
    const error = new Error(e as string);
    throw error;
  }
};

export default calculateTotalTimeAtOffice;
