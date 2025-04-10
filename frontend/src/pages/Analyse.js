import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import dayjs from 'dayjs';

function Analyse() {
  const [data, setData] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/analyse`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.length) {
          setSelectedZone(json[0].zone);
        }
      });
  }, []);

  const zones = useMemo(() => {
    const allZones = data.map((item) => item.zone);
    return Array.from(new Set(allZones));
  }, [data]);

  const groupedData = useMemo(() => {
    const filtered = data.filter((d) => d.zone === selectedZone);
    const map = {};

    filtered.forEach((item) => {
      const date = dayjs(item.date).format('YYYY-MM-DD');
      if (!map[date]) {
        map[date] = {
          date: dayjs(item.date).format('DD MMM'),
          sum: 0,
          polluants: [],
          etats: [],
        };
      }
      map[date].sum += item.sum || 0;
      map[date].polluants.push(item.polluant);
      map[date].etats.push(`${item.polluant}: ${item.etat}`);
      map[date].etatRaw = map[date].etatRaw || [];
      map[date].etatRaw.push(item.etat);
    });

    return Object.values(map)
      .map((d) => {
        let color = '#48bb78';
        if (d.etatRaw.includes('ALERTE SUR PERSISTANCE')) {
          color = '#e53e3e'; 
        } else if (d.etatRaw.includes('INFORMATION ET RECOMMANDATION')) {
          color = '#ecc94b';
        }
        return { ...d, fill: color };
      })
      .sort((a, b) => dayjs(a.date, 'DD MMM') - dayjs(b.date, 'DD MMM'));
  }, [data, selectedZone]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f4f6f8' }}>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          marginTop: '5rem',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#444' }}>
          Trafic routier & qualité de l’air par jour
        </h2>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <label htmlFor="zone-select" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#444' }}>
            Choisir une zone :
          </label>
          <select
            id="zone-select"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              minWidth: '250px',
            }}
          >
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={groupedData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [`${value.toLocaleString()} véhicules`]}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      background: 'white',
                      padding: '10px',
                      border: '1px solid #ccc',
                    }}
                  >
                    <strong>{label}</strong>
                    <br />
                    <span>Trafic : {data.sum.toLocaleString()} véhicules</span>
                    <br />
                    <br />
                    {data.etats.map((e, i) => (
                      <div key={i} style={{ fontSize: '0.9rem' }}>{e}</div>
                    ))}
                  </div>
                );
              }}
            />
            <Bar dataKey="sum" fill="#8884d8">
              {groupedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#444' }}>
          Analyses plus approfondies
        </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        gridTemplateColumns: 'repeat(2, 1fr)',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
        }
      }}>
  {['/chart/analyse_spatiale.png',
    '/chart/boxplots_numeriques.png',
    '/chart/correlation_matrix.png',
    '/chart/distributions_numeriques.png',
    '/chart/evolution_temporelle.png',
    '/chart/valeurs_aberrantes.png'].map((url, idx) => (
      <div
      key={idx}
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={url}
        alt={`Image ${idx + 1}`}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  ))}
</div>

    </div>
  );
}

export default Analyse;
