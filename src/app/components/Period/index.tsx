"use client";
import React from "react";
import moment, { Moment } from "moment";
import { Card } from "../Card";
import { PeriodBarChart } from "../PeriodBarChart";
import { MonthPicker } from "../MonthPicker";
import { IMonthPickerValue } from "../MonthPicker/interface";
import { Averages } from "../Averages";
import { ChartContainer, Root, MonthPickerContainer } from "./styled";
import { DATE_FORMAT, MONTH_DATE_FORMAT } from "../../constants";

const PERIOD_QUERY_STRING = "p";

interface IPeriodProps {}

const getPeriodEnd = (date: Moment): Moment =>
  moment(date).endOf("month").add(1, "day");

const getPeriodStart = (date: Moment): Moment => moment(date).startOf("month");

const today = moment();
let defaultPeriodStartDate = getPeriodStart(today);
let defaultPeriodEndDate = getPeriodEnd(today);

if (typeof window !== "undefined") {
  const urlParams = new URLSearchParams(window.location.search);

  for (const queryStringEntry of urlParams.entries()) {
    if (queryStringEntry[0] === PERIOD_QUERY_STRING) {
      const date = moment(queryStringEntry[1], MONTH_DATE_FORMAT);

      if (date.isValid()) {
        defaultPeriodStartDate = getPeriodStart(date);
        defaultPeriodEndDate = getPeriodEnd(date);
      }
    }
  }
}

export const Period: React.FC<IPeriodProps> = () => {
  const [periodStart, setPeriodStart] = React.useState(
    defaultPeriodStartDate.format(DATE_FORMAT)
  );
  const [periodEnd, setPeriodEnd] = React.useState(
    defaultPeriodEndDate.format(DATE_FORMAT)
  );
  const [currentSelectedMonth, setCurrentSelectedMonth] = React.useState(
    defaultPeriodStartDate.format("MM")
  );
  const [currentSelectedYear, setCurrentSelectedYear] = React.useState(
    defaultPeriodStartDate.format("YYYY")
  );
  const onPeriodSwitch = React.useCallback(
    ({ year, month }: IMonthPickerValue) => {
      const newPeriodStartDate = moment(`${year}-${month}-01`, DATE_FORMAT);
      const newPeriodEndDate = moment(newPeriodStartDate).endOf("month");

      setPeriodStart(newPeriodStartDate.format(DATE_FORMAT));
      setPeriodEnd(newPeriodEndDate.add(1, "day").format(DATE_FORMAT));
      setCurrentSelectedMonth(newPeriodStartDate.format("MM"));
      setCurrentSelectedYear(newPeriodStartDate.format("YYYY"));
    },
    []
  );

  return (
    <Root>
      <Card>
        <MonthPickerContainer>
          <MonthPicker
            maxYear={today.format("YYYY")}
            maxMonth={today.format("MM")}
            currentMonth={currentSelectedMonth}
            currentYear={currentSelectedYear}
            onSwitch={onPeriodSwitch}
          />
        </MonthPickerContainer>

        <ChartContainer>
          <PeriodBarChart periodStart={periodStart} periodEnd={periodEnd} />
        </ChartContainer>

        <Averages periodStart={periodStart} periodEnd={periodEnd} />
      </Card>
    </Root>
  );
};
