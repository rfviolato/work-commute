import { IDayResult } from "../../types";

type DayTimetableQueryData = Pick<
  IDayResult,
  "homeArriveTime" | "homeLeaveTime" | "workArriveTime" | "workLeaveTime"
>;
export interface IDayTimetableQuery {
  Day: DayTimetableQueryData;
}
