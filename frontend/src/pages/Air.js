import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const etatLevels = [
  'PAS DE DEPASSEMENT',
  'INFORMATION ET RECOMMANDATION',
  'ALERTE SUR PERSISTANCE',
];

const etatToValue = (etat) => {
  return etatLevels.indexOf(etat);
};

const valueToEtat = (val) => {
  switch (val) {
    case 0:
      return 'OK';
    case 1:
      return 'MOYEN';
    case 2:
      return 'ALERTE';
    default:
      return '';
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('fr-FR');
};

function Air() {
  const [data, setData] = useState([]);
  const [selectedZone, setSelectedZone] = useState('Bassin Lyon Nord-Isère');
  const [zoneData, setZoneData] = useState([]);
  const [commentaire, setCommentaire] = useState('');
  const [email, setEmail] = useState('');
  const [emailsList, setEmailsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/air`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setSelectedZone('Bassin Lyon Nord-Isère');
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/emails`)
      .then((res) => res.json())
      .then((json) => setEmailsList(json));
  }, []);

  useEffect(() => {
    if (!selectedZone || data.length === 0) return;

    const filtered = data.filter((item) => item.zone === selectedZone);
    const result = {};
    let infoComment = '';

    filtered.forEach((item) => {
      const rawDate = item.date.split('T')[0];
      const date = formatDate(rawDate);

      if (!result[date]) {
        result[date] = {
          date,
          "Dioxyde d'azote": etatToValue('PAS DE DEPASSEMENT'),
          "Ozone": etatToValue('PAS DE DEPASSEMENT'),
          "Particules PM10": etatToValue('PAS DE DEPASSEMENT'),
        };
      }
      result[date][item.polluant] = etatToValue(item.etat);

      if (
        item.etat === 'INFORMATION ET RECOMMANDATION' &&
        item.commentaire &&
        item.commentaire.toLowerCase() !== 'aucun'
      ) {
        infoComment += `📍 ${date} - ${item.polluant} : ${item.commentaire}\n`;
      }
    });

    const sortedData = Object.values(result).sort(
      (a, b) =>
        new Date(a.date.split('/').reverse().join('-')) -
        new Date(b.date.split('/').reverse().join('-'))
    );
    
    const last7Days = sortedData.slice(-7);
    
    setZoneData(last7Days);
    setCommentaire(infoComment.trim());
  }, [selectedZone, data]);

  const zones = [...new Set(data.map((item) => item.zone).filter(Boolean))];

  const customTickFormatter = (val) => {
    switch (val) {
      case 0:
        return "OK";
      case 1:
        return "MOYEN";
      case 2:
        return "ALERTE";
      default:
        return "";
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/emails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (data.email) {
          setEmailsList([...emailsList, data]);
          setEmail('');
        } else {
          console.error('Erreur lors de l\'enregistrement de l\'email');
        }
      } catch (error) {
        console.error('Erreur lors de la requête', error);
      }
    } else {
      alert('Veuillez entrer une adresse email');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '1rem' }}>Qualité de l'air</h2>

      <label htmlFor="zone-select" style={{ marginRight: '1rem', fontWeight: 'bold' }}>
        Sélectionner une zone :
      </label>
      <select
        id="zone-select"
        value={selectedZone}
        onChange={(e) => setSelectedZone(e.target.value)}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          marginBottom: '2rem',
          fontSize: '16px',
        }}
      >
        {zones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={zoneData} margin={{ top: 50, right: 30, left: 20, bottom: 50 }}>
            
            <XAxis dataKey="date" />
            <YAxis
              domain={[0, 2]} 
              ticks={[0, 1, 2]} 
              tickFormatter={customTickFormatter}
            />
            <Tooltip
              formatter={(value) => valueToEtat(value)}
              labelFormatter={(label) => `Date : ${label}`}
            />
            <Legend />
            <Line type="monotone" dataKey="Dioxyde d'azote" stroke="#8884d8" />
            <Line type="monotone" dataKey="Ozone" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Particules PM10" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}>
        <h3>Inscrire une adresse email pour recevoir une alerte</h3>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre adresse email"
            style={{
              padding: '0.5rem',
              marginBottom: '1rem',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#5a67d8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Air;
