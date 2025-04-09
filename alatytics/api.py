from flask import Flask, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from analyses_trafic_pollution import charger_donnees, analyse_correlation_trafic_pollution, analyse_pics_pollution, analyse_spatiale, analyse_tendances

app = Flask(__name__)
CORS(app)  # Permet les requêtes cross-origin

def fig_to_base64(fig):
    """Convertit une figure matplotlib en base64"""
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

@app.route('/api/data/trafic', methods=['GET'])
def get_trafic_data():
    trafic_df, _ = charger_donnees()
    return jsonify({
        'positions': trafic_df['positionne'].tolist(),
        'trafic_moyen': trafic_df['moyennejou'].tolist(),
        'debit_horaire': trafic_df['debithorai'].tolist(),
        'heures': trafic_df['horairedeb'].tolist()
    })

@app.route('/api/data/pollution', methods=['GET'])
def get_pollution_data():
    _, pollution_df = charger_donnees()
    return jsonify({
        'dates': pollution_df['date_prevision'].dt.strftime('%Y-%m-%d').tolist(),
        'types_polluants': pollution_df['lib_pol'].tolist(),
        'etats': pollution_df['etat'].tolist(),
        'zones': pollution_df['lib_zone'].tolist()
    })

@app.route('/api/graphs/correlation', methods=['GET'])
def get_correlation_graph():
    trafic_df, pollution_df = charger_donnees()
    fig = plt.figure(figsize=(12, 6))
    analyse_correlation_trafic_pollution(trafic_df, pollution_df)
    return jsonify({'image': fig_to_base64(fig)})

@app.route('/api/graphs/pics', methods=['GET'])
def get_pics_graph():
    trafic_df, pollution_df = charger_donnees()
    fig = plt.figure(figsize=(12, 6))
    analyse_pics_pollution(trafic_df, pollution_df)
    return jsonify({'image': fig_to_base64(fig)})

@app.route('/api/graphs/spatial', methods=['GET'])
def get_spatial_graph():
    trafic_df, pollution_df = charger_donnees()
    fig = plt.figure(figsize=(15, 10))
    analyse_spatiale(trafic_df, pollution_df)
    return jsonify({'image': fig_to_base64(fig)})

@app.route('/api/graphs/tendances', methods=['GET'])
def get_tendances_graph():
    trafic_df, pollution_df = charger_donnees()
    fig = plt.figure(figsize=(12, 6))
    analyse_tendances(trafic_df, pollution_df)
    return jsonify({'image': fig_to_base64(fig)})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 