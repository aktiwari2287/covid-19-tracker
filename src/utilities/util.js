export const sortData = (data) => {
   return [...data].sort((a,b) => a.cases>b.cases?-1:1);
}

export const buildChartData = (data, casesType='cases') => {
    const chartData = [];
    let lastDataPoint;
   for(let date in data.cases )
   {
        if(lastDataPoint) {
             const newDataPoint  = {x: date, y: data[casesType][date] - lastDataPoint};
             chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    };
    return chartData;
}