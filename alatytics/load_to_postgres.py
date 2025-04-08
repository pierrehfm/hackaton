import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Configuration de la connexion PostgreSQL
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME')

# Création de l'URL de connexion
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Création du moteur SQLAlchemy
engine = create_engine(DATABASE_URL)

# Fonction pour charger un fichier CSV dans une table PostgreSQL
def load_csv_to_postgres(csv_file, table_name):
    try:
        # Lecture du fichier CSV
        df = pd.read_csv(f"data/output/{csv_file}")
        
        # Chargement dans PostgreSQL
        df.to_sql(
            name=table_name,
            con=engine,
            if_exists='replace',
            index=False
        )
        print(f"✅ {csv_file} chargé avec succès dans la table {table_name}")
    except Exception as e:
        print(f"❌ Erreur lors du chargement de {csv_file}: {str(e)}")

# Chargement des fichiers
files_to_load = {
    'episodes_de_pollution_nettoyes.csv': 'episodes_pollution',
    'infra_route_refdir.csv': 'infrastructure_route',
    'pvo_patrimoine_voirie_pvocomptagecriter_nettoye.csv': 'comptage_trafic'
}

for csv_file, table_name in files_to_load.items():
    load_csv_to_postgres(csv_file, table_name) 