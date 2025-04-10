import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Label,
} from 'recharts';
import dayjs from 'dayjs';

function Analyse() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/analyse`)
      .then((res) => res.json())
      .then((json) => {
        const formattedData = json.map(item => ({
          date: dayjs(item.date).format('YYYY-MM-DD'),
          pollution_detectee: parseInt(item.pollution_detectee),
          moyenne_journaliere: item.moyenne_journaliere,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '1rem', marginTop: '5rem' }}>Analyse de la polution et du trafic par jour</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barGap={0}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide>
            <Label value="Date" position="insideBottom" offset={-10} />
          </XAxis>
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'pollution_detectee') {
                return `${value} unités de pollution détectée`;
              }
              if (name === 'moyenne_journaliere') {
                return `${value.toLocaleString()} véhicules`;
              }
              return value;
            }}
            labelFormatter={(label) => `Date : ${label}`}
          />
          <Legend />
          <Bar dataKey="pollution_detectee" fill="#8884d8" yAxisId="left" barSize={20} />
          <Bar dataKey="moyenne_journaliere" fill="#82ca9d" yAxisId="right" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analyse;
