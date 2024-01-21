import moment from "moment";
import { TIME_FORMAT } from "../../constants";
import { getTimeFromMinutes } from "../../utils/get-time-from-minutes";
import {
  ITotalMorningCommuteResolverResult,
  IDayTimetableRecord,
} from "../../types";

const totalMorningCommuteTimeResolver = ({
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
    const error = new Error(e as string);

    throw error;
  }
};

export default totalMorningCommuteTimeResolver;
