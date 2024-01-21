import React from "react";
import { TimeDisplay } from "../TimeDisplay";
import { IconLabel } from "../IconLabel";
import { useQuery } from "@apollo/client";
import query from "./query";
import {
  IAveragesQueryData,
  IAveragesComponentProps,
  IAveragesProps,
} from "./interface";
import { Root } from "./styled";

export const Averages: React.FC<IAveragesProps> = ({
  periodStart,
  periodEnd,
}) => {
  const { loading, data, error } = useQuery<IAveragesQueryData>(query, {
    variables: {
      periodStart,
      periodEnd,
    },
  });

  if (data && data.Period) {
    const {
      Period: { averageTimeCommuting, averageTimeAtOffice },
    } = data;

    return (
      <AveragesComponent
        averageTimeCommuting={averageTimeCommuting}
        averageTimeAtOffice={averageTimeAtOffice}
      />
    );
  }

  return <AveragesComponent hasError={!!error} isLoading={loading} />;
};

const DEFAULT_TIME_PROP = { hours: 0, minutes: 0 };

export const AveragesComponent: React.FC<IAveragesComponentProps> = ({
  averageTimeCommuting = DEFAULT_TIME_PROP,
  averageTimeAtOffice = DEFAULT_TIME_PROP,
  isLoading,
  hasError,
}) => {
  return (
    <Root>
      <IconLabel
        hasError={hasError}
        icon={<i className="fas fa-train" />}
        label="Time commuting"
      >
        <TimeDisplay isLoading={isLoading} {...averageTimeCommuting} />
      </IconLabel>

      <IconLabel
        hasError={hasError}
        icon={<i className="fas fa-briefcase" />}
        label="Time at the office"
      >
        <TimeDisplay isLoading={isLoading} {...averageTimeAtOffice} />
      </IconLabel>
    </Root>
  );
};
