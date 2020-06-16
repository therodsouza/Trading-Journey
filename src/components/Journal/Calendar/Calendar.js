import React, { Fragment } from 'react';
import HeatMapDate from "react-d3-heatmap";

const Calendar = props => {


    const startDate = new Date(2020, 2, 1);
    const endDate = new Date(2020, 6, 15);
    const data = setData(startDate, endDate, 50);

    const colors = [];
    colors.push({ count: 1, color: "#cc66ff" });
    colors.push({ count: 3, color: "#ff9966" });
    colors.push({ count: 2, color: "#003399" });
    colors.push({ count: 5, color: "#990000" });
    colors.push({ count: 9, color: "#00cc00" });

    return (
        <Fragment>
            <HeatMapDate
                startDate={startDate}
                endDate={endDate}
                data={data}
                colors={colors}
            />
        </Fragment>

    );
}

export const setData = (dateStart, dateEnd, nb) => {
    const data = [];
    const dates = [];
    for (let i = 0; i < nb; i++) {
      let date = randomDate(dateStart, dateEnd);
      while (dates.includes(dates)) {
        date = randomDate(dateStart, dateEnd);
      }
      dates.push(date);
      const count = Math.floor(Math.random() * 14);
      data.push({ date: new Date(date), count });
    }
    return data;
  };
  
  const randomDate = (start, end) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

export default Calendar;