import { IDayResult } from "../../types";

type DayTimetableQueryData = Pick<
  IDayResult,
  "totalMorningCommuteTime" | "totalEveningCommuteTime" | "totalTimeAtOffice"
>;

export interface IDayTotalQuery {
  Day: DayTimetableQueryData;
}
