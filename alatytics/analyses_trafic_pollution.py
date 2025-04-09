import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import geopandas as gpd
from datetime import datetime
import numpy as np
from scipy import stats

# Configuration du style des graphiques
plt.style.use('default')
sns.set_theme()

def charger_donnees():
    """Charge et prépare les données de trafic et de pollution"""
    # Chargement des données
    trafic_df = pd.read_csv('data/output/pvo_patrimoine_voirie_pvocomptagecriter_nettoye.csv')
    pollution_df = pd.read_csv('data/output/episodes_de_pollution_nettoyes.csv')
    
    # Conversion des dates
    pollution_df['date'] = pd.to_datetime(pollution_df['date'])
    
    return trafic_df, pollution_df

def analyse_correlation_trafic_pollution(trafic_df, pollution_df):
    """Analyse la corrélation entre le volume de trafic et les niveaux de pollution"""
    # Préparation des données
    trafic_moyen = trafic_df.groupby('positionne')['moyennejou'].mean().reset_index()
    
    # Création du graphique
    plt.figure(figsize=(12, 6))
    sns.scatterplot(data=trafic_moyen, x='positionne', y='moyennejou')
    plt.title('Distribution du trafic moyen par position')
    plt.xlabel('Position du capteur')
    plt.ylabel('Trafic moyen journalier')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('output_croisement_trafic_pollution/correlation_trafic.png')
    plt.close()

def analyse_pics_pollution(trafic_df, pollution_df):
    """Analyse les pics de pollution en fonction des heures de pointe"""
    # Extraction de l'heure à partir de la chaîne (format "08h00")
    trafic_df['heure'] = trafic_df['horairedeb'].str.extract('(\d+)').astype(float)
    
    # Création du graphique
    plt.figure(figsize=(12, 6))
    sns.boxplot(data=trafic_df, x='heure', y='debithorai')
    plt.title('Distribution du trafic par heure')
    plt.xlabel('Heure de la journée')
    plt.ylabel('Débit horaire')
    plt.tight_layout()
    plt.savefig('output_croisement_trafic_pollution/pics_trafic.png')
    plt.close()

def analyse_spatiale(trafic_df, pollution_df):
    """Analyse la distribution spatiale du trafic et de la pollution"""
    # Création d'une carte de chaleur du trafic
    plt.figure(figsize=(15, 10))
    sns.kdeplot(data=trafic_df, x='distanceli', y='moyennejou', cmap='YlOrRd')
    plt.title('Distribution spatiale du trafic')
    plt.xlabel('Distance')
    plt.ylabel('Trafic moyen journalier')
    plt.tight_layout()
    plt.savefig('output_croisement_trafic_pollution/distribution_spatiale.png')
    plt.close()

def analyse_tendances(trafic_df, pollution_df):
    """Analyse les tendances temporelles"""
    # Analyse par type de polluant
    pollution_by_type = pollution_df.groupby(['polluant', 'etat']).size().unstack(fill_value=0)
    
    plt.figure(figsize=(12, 6))
    pollution_by_type.plot(kind='bar', stacked=True)
    plt.title('Distribution des épisodes de pollution par type de polluant')
    plt.xlabel('Type de polluant')
    plt.ylabel('Nombre d\'épisodes')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('output_croisement_trafic_pollution/tendances_pollution.png')
    plt.close()

def main():
    # Chargement des données
    print("Chargement des données...")
    trafic_df, pollution_df = charger_donnees()
    
    # Exécution des analyses
    print("Analyse de la corrélation trafic-pollution...")
    analyse_correlation_trafic_pollution(trafic_df, pollution_df)
    
    print("Analyse des pics de pollution...")
    analyse_pics_pollution(trafic_df, pollution_df)
    
    print("Analyse spatiale...")
    analyse_spatiale(trafic_df, pollution_df)
    
    print("Analyse des tendances...")
    analyse_tendances(trafic_df, pollution_df)
    
    print("Analyses terminées ! Les graphiques ont été sauvegardés dans le dossier 'output_croisement_trafic_pollution'")

if __name__ == "__main__":
    main() 