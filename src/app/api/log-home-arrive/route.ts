import { logTime } from "../../gql/utils/log-time";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function logHomeArriveHandler(request: NextRequest) {
  const { date } = await request.json();

  if (!date) {
    return NextResponse.json({ error: "Date is missing" }, { status: 400 });
  }

  try {
    await logTime(date, "homeArriveTime");

    return NextResponse.json({}, { status: 200 });
  } catch (exception) {
    return NextResponse.json({ error: exception }, { status: 500 });
  }
}

export { logHomeArriveHandler as POST };
