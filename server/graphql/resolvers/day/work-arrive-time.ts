import { IDayTimetable, IGQLContext } from '../../interface';
import { IDayQueryParams } from '../query/interface';

export default async (
  { day }: IDayQueryParams,
  args: any,
  { dataLoaders }: IGQLContext,
): Promise<string> => {
  try {
    const { workArriveTime } = (await dataLoaders.dayQueryLoader.load(
      day,
    )) as IDayTimetable;

    return workArriveTime;
  } catch (e) {
    throw new Error(e);
  }
};
