import pandas as pd

# Charger le fichier
print("Chargement du fichier de pollution...")
df_pollution = pd.read_csv("data/episodes_de_pollution_prevus_ou_constates.csv", sep=",", encoding="utf-8")

# Nettoyage de base
print("\n=== Nettoyage de base ===")
df_pollution.columns = df_pollution.columns.str.strip()  # Nettoyer noms de colonnes
df_pollution = df_pollution.drop_duplicates()  # Retirer les doublons
df_pollution['date_prevision'] = pd.to_datetime(df_pollution['date_prevision'], errors='coerce')  # Convertir dates
df_pollution = df_pollution.dropna(subset=["date_prevision", "lib_zone", "lib_pol"])  # Supprimer les lignes incomplètes

# Nettoyer les chaînes de caractères
print("\n=== Nettoyage des chaînes de caractères ===")
for col in ['lib_zone', 'lib_pol', 'etat', 'com_court', 'com_long']:
    if col in df_pollution.columns:
        df_pollution[col] = df_pollution[col].astype(str).str.strip()

# Renommage clair
print("\n=== Renommage des colonnes ===")
df_pollution = df_pollution.rename(columns={
    "lib_zone": "zone",
    "date_prevision": "date",
    "lib_pol": "polluant",
    "etat": "etat",
    "couleur": "niveau",
    "com_long": "commentaire"
})

# Affichage des informations
print("\n=== Informations sur le dataset nettoyé ===")
print(f"Nombre de lignes : {len(df_pollution)}")
print(f"Nombre de colonnes : {len(df_pollution.columns)}")
print("\nColonnes :")
print(df_pollution.columns.tolist())
print("\nAperçu des données :")
print(df_pollution.head())

# Sauvegarde du fichier nettoyé
output_file = "data/episodes_de_pollution_nettoyes.csv"
df_pollution.to_csv(output_file, index=False, encoding='utf-8')
print(f"\nFichier nettoyé sauvegardé sous : {output_file}") 