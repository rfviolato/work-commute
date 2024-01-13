import moment from "moment";
import { TIME_FORMAT } from "../../constants";
import { getTimeFromMinutes } from "../../utils/get-time-from-minutes";
import {
  ITotalMorningCommuteResolverResult,
  IDayTimetableRecord,
} from "../../types";

export default ({
  homeLeaveTime,
  workArriveTime,
}: IDayTimetableRecord): ITotalMorningCommuteResolverResult => {
  try {
    if (homeLeaveTime && workArriveTime) {
      const homeLeaveTimeDate = moment(homeLeaveTime, TIME_FORMAT);
      const workArriveTimeDate = moment(workArriveTime, TIME_FORMAT);
      const totalMinutesCommuting = workArriveTimeDate.diff(
        homeLeaveTimeDate,
        "minutes"
      );

      return getTimeFromMinutes(totalMinutesCommuting);
    }

    return getTimeFromMinutes(0);
  } catch (e) {
    throw new Error(e);
  }
};
