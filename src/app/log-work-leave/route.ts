import type { NextApiRequest, NextApiResponse } from "next";
import { logTime } from "../gql/utils/log-time";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    body: { date },
  } = request;

  if (!date) {
    return response.status(400).send({ error: "Date is missing" });
  }

  try {
    await logTime(date, "workLeaveTime");

    return response.status(200).end();
  } catch (exception) {
    return response.status(500).send({ error: exception });
  }
}
