import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import {buildChartData} from "../utilities/util";
import {numeral} from 'numeral';
const options = {
    legend: { display: false },
    elements: {
        point: {
            radius: 0
        }
    },
    maintainAspectRation: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    }
}
function LineGraph() {
    const [data, setData] = useState({});

    useEffect(()=>{
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                    .then(response => response.json())
                    .then(data=>{
                        console.log(data);
                        const chartData = buildChartData(data);
                        setData(chartData);
                    });
    }, [])
    return (
        <div>
            <Line data={
                {
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, .5)",
                        borderColor: "#CC1034",
                        data:data
                    }]
                }
            }>
            
            </Line>
        </div>
    )
}

export default LineGraph
