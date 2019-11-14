import { logDate } from './../utils/log-date';

export default async (request, response) => {
  const {
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send('NO_DATA_ERROR');
  }

  try {
    await logDate(date, 'workLeaveTime');

    return response.status(200).send();
  } catch (exception) {
    return response.status(500).send(new Error(exception));
  }
};
