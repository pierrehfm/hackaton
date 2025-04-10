import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import dayjs from 'dayjs';

function Trafic() {
  const [dataHeure, setDataHeure] = useState([]);
  const [dataJour, setDataJour] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trafic`)
      .then((res) => res.json())
      .then((json) => {
        const filtered = json.filter((item) => {
          const h = item.horairedeb;
          return (
            h &&
            /^[0-2][0-9]h00$/.test(h) &&
            parseInt(h.substring(0, 2)) >= 6 &&
            parseInt(h.substring(0, 2)) <= 23
          );
        });
        setDataHeure(filtered);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/traficday`)
      .then((res) => res.json())
      .then((json) => {
        const sorted = [...json]
          .filter((item) => item.date && item.total)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 30)
          .reverse();
        setDataJour(sorted);
      });
  }, []);

  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f6f8',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '600px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      marginTop: '5rem',
    },
    heading: {
      marginBottom: '1rem',
      textAlign: 'center',
      color: '#2d3748',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Trafic routier moyen par heure
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataHeure} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="horairedeb" angle={-45} textAnchor="end" />
            <YAxis />
            <Tooltip
              formatter={(value) => `${value.toLocaleString()} véhicules`}
              labelFormatter={(label) => `Heure : ${label}`}
            />
            <Bar dataKey="total" fill="#5a67d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>
          Trafic routier par jour (30 derniers jours)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataJour} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => dayjs(date).format('DD MMM')}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip
              formatter={(value) => `${value.toLocaleString()} véhicules`}
              labelFormatter={(label) => `Date : ${dayjs(label).format('DD MMM YYYY')}`}
            />
            <Bar dataKey="total" fill="#5a67d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Trafic;
