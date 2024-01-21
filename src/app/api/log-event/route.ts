import moment from "moment";
import { createDbClient } from "../../gql/lib/db";
import { DAY_FORMAT } from "../../gql/constants";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function logEventHandler(request: NextRequest) {
  const { date, event } = await request.json();
  const momentDate = moment(date).utc();

  if (!event) {
    return NextResponse.json({ error: "Date is missing" }, { status: 400 });
  }

  if (!date) {
    return NextResponse.json({ error: "Event is missing" }, { status: 400 });
  }

  try {
    const db = await createDbClient();
    const day = momentDate.format(DAY_FORMAT);

    await db.workTimetable.updateOne(
      { day: { $eq: day } },
      {
        $push: { events: event },
        $setOnInsert: {
          date: new Date(momentDate.toISOString()),
          day,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({}, { status: 200 });
  } catch (exception) {
    return NextResponse.json({ error: exception }, { status: 500 });
  }
}

export { logEventHandler as POST };
