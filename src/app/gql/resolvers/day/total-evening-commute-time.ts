import moment from "moment";
import { TIME_FORMAT } from "../../constants";
import { getTimeFromMinutes } from "../../utils/get-time-from-minutes";
import {
  IDayTimetableRecord,
  ITotalEveningCommuteResolverResult,
} from "../../types";

const totalEveningCommuteTimeResolver = ({
  workLeaveTime,
  homeArriveTime,
}: IDayTimetableRecord): ITotalEveningCommuteResolverResult => {
  try {
    if (workLeaveTime && homeArriveTime) {
      const workLeaveTimeDate = moment(workLeaveTime, TIME_FORMAT);
      const homeArriveTimeDate = moment(homeArriveTime, TIME_FORMAT);
      const totalMinutesCommuting = homeArriveTimeDate.diff(
        workLeaveTimeDate,
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

export default totalEveningCommuteTimeResolver;
