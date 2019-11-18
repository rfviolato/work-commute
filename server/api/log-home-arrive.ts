import { NowRequest, NowResponse } from '@now/node';
import { logDate } from './../utils/log-date';

export default async (request: NowRequest, response: NowResponse) => {
  const {
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send({ error: 'Date is missing' });
  }

  try {
    await logDate(date, 'homeArriveTime');

    return response.status(200).end();
  } catch (exception) {
    return response.status(500).send({ error: exception });
  }
};
