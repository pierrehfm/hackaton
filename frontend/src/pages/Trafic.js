import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

function Trafic() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trafic`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => {
          const [h, m] = item.horairedeb.replace('H', ':').split(':').map(Number);
          return h >= 6 && h <= 23;
        });
      
        const sorted = filtered.sort((a, b) => {
          const [ha, ma] = a.horairedeb.replace('H', ':').split(':').map(Number);
          const [hb, mb] = b.horairedeb.replace('H', ':').split(':').map(Number);
          return ha * 60 + ma - (hb * 60 + mb);
        });
      
        setStats(sorted);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Trafic horaire (somme des débits)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="horairedeb" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#5a67d8" name="Nombre de véhicules" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Trafic;