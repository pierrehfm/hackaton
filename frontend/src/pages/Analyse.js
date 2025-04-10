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
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/avance');
  };

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

  // Styles moved to a variable at the bottom
  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f6f8',
    },
    paragraph: {
      textAlign: 'left',
      marginBottom: '2rem',
      marginTop: '5rem',
    },
    highlightText: {
      good: { color: '#48bb78' },
      acceptable: { color: '#ecc94b' },
      alert: { color: '#e53e3e' },
    },
    card: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#444',
    },
    selectWrapper: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    selectLabel: {
      marginRight: '1rem',
      fontWeight: 'bold',
      color: '#444',
    },
    select: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      minWidth: '250px',
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#5a67d8',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '300px',
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.paragraph}>
        Le graphique ci-dessus présente l'évolution du trafic routier et de la qualité de l’air au cours des derniers jours. Chaque barre représente la densité du trafic (en nombre de véhicules) pour un jour spécifique, tandis que la couleur de la barre vous indique l'état de la qualité de l'air à ce moment-là.
      </p>
      <p>
        La qualité de l'air est <strong style={styles.highlightText.good}>bonne</strong>. Aucun dépassement des niveaux recommandés n’a été observé pour les polluants principaux (particules PM10, dioxyde d'azote, etc.).
      </p>
      <p>
        La qualité de l'air est <strong style={styles.highlightText.acceptable}>acceptable</strong>, mais certains polluants ont atteint des niveaux qui recommandent des actions préventives pour la santé. Cela signifie qu'il y a des informations et recommandations à suivre pour minimiser l'exposition.
      </p>
      <p>
        <strong style={styles.highlightText.alert}>Alerte</strong> sur la qualité de l'air : un ou plusieurs polluants ont dépassé les niveaux de sécurité, ce qui pourrait affecter la santé. Une attention particulière est recommandée, surtout pour les personnes sensibles.
      </p>
      <p>
        Ces informations sont cruciales pour comprendre la relation entre le trafic routier et la qualité de l'air, et pour prendre des décisions éclairées afin de protéger votre santé et l’environnement.
      </p>

      <div style={styles.card}>
        <h2 style={styles.header}>Trafic routier & qualité de l’air par jour</h2>

        <div style={styles.selectWrapper}>
          <label htmlFor="zone-select" style={styles.selectLabel}>
            Choisir une zone :
          </label>
          <select
            id="zone-select"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            style={styles.select}
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

      <button onClick={handleClick} style={styles.button}>
        Voir des analyses plus approfondies
      </button>
    </div>
  );
}

export default Analyse;
