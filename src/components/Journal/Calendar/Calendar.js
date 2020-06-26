import React, { Fragment } from 'react';
import HeatMapDate from "react-d3-heatmap";

const Calendar = props => {

  const colors = [];
  colors.push({ count: -1000, color: "#E50000" });
  colors.push({ count: -500, color: "#C11F00" });
  colors.push({ count: -250, color: "#D88B00" });
  colors.push({ count: 0, color: "#D2CA00" });
  colors.push({ count: 250, color: "#91CB00" });
  colors.push({ count: 500, color: "#4CC500" });
  colors.push({ count: 1000, color: "#0CBF00" });

  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2020, 11, 15);
  const data = [];

  props.heatmap.forEach((sessions, date, m) => {
    const count = sessions
      .map(s => {
        return s.count;
      })
      .reduce((sum, current) => sum + current, 0);

    data.push({ date, count });
  });

  const clickEntryHandler = (data, index) => {

    const sessionArray = props.heatmap.get(data.date.toDateString());

    if (sessionArray) {
      alert(sessionArray.map(session => session.id).concat(', '));
    }
  }

  return (
    <Fragment>
      <HeatMapDate
        startDate={startDate}
        endDate={endDate}
        data={data}
        colors={colors}
        onClick={clickEntryHandler}
      />
    </Fragment>

  );
}

export default Calendar;