import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Configuration de l'affichage
plt.style.use('default')
sns.set_theme()
pd.set_option('display.max_columns', None)
pd.set_option('display.width', 150)

# Lecture du fichier CSV
print("Lecture du fichier CSV...")
df = pd.read_csv('data/pvo_patrimoine_voirie_pvocomptagecriter.csv')

# Nettoyage initial des données
print("\n=== Nettoyage initial des données ===")
# Conversion des colonnes numériques
numeric_columns = ['distanceli', 'nbvoies', 'moyennejou', 'debithorai', 'anneerefer']
for col in numeric_columns:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# 1. Analyse de corrélation
print("\n=== Analyse de corrélation entre les variables numériques ===")
correlation_matrix = df[numeric_columns].corr()
print("\nMatrice de corrélation :")
print(correlation_matrix)

# Visualisation de la matrice de corrélation
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Matrice de corrélation des variables numériques')
plt.tight_layout()
plt.savefig('data/correlation_matrix.png')
plt.close()

# 2. Analyse temporelle
print("\n=== Analyse temporelle ===")
# Analyse par année
yearly_stats = df.groupby('anneerefer').agg({
    'moyennejou': ['mean', 'std', 'count'],
    'debithorai': ['mean', 'std']
}).round(2)
print("\nStatistiques par année :")
print(yearly_stats)

# Visualisation de l'évolution temporelle
plt.figure(figsize=(12, 6))
sns.boxplot(data=df, x='anneerefer', y='moyennejou')
plt.title('Distribution du trafic moyen journalier par année')
plt.xlabel('Année')
plt.ylabel('Trafic moyen journalier')
plt.tight_layout()
plt.savefig('data/evolution_temporelle.png')
plt.close()

# 3. Analyse spatiale
print("\n=== Analyse spatiale ===")
# Statistiques par nombre de voies
spatial_stats = df.groupby('nbvoies').agg({
    'moyennejou': ['mean', 'std', 'count'],
    'debithorai': ['mean', 'std'],
    'distanceli': ['mean', 'std']
}).round(2)
print("\nStatistiques par nombre de voies :")
print(spatial_stats)

# Visualisation de la relation entre distance et trafic
plt.figure(figsize=(10, 6))
plt.scatter(df['distanceli'], df['moyennejou'], alpha=0.5)
plt.title('Relation entre distance et trafic moyen journalier')
plt.xlabel('Distance (m)')
plt.ylabel('Trafic moyen journalier')
plt.tight_layout()
plt.savefig('data/analyse_spatiale.png')
plt.close()

# 4. Détection des valeurs aberrantes
print("\n=== Détection des valeurs aberrantes ===")
def detect_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)][column]
    return len(outliers), lower_bound, upper_bound

for col in numeric_columns:
    n_outliers, lower, upper = detect_outliers(df, col)
    print(f"\nValeurs aberrantes dans {col}:")
    print(f"Nombre de valeurs aberrantes: {n_outliers}")
    print(f"Seuil inférieur: {lower:.2f}")
    print(f"Seuil supérieur: {upper:.2f}")

# Visualisation des valeurs aberrantes
plt.figure(figsize=(15, 10))
for i, col in enumerate(numeric_columns, 1):
    plt.subplot(2, 3, i)
    sns.boxplot(data=df, y=col)
    plt.title(f'Valeurs aberrantes - {col}')
plt.tight_layout()
plt.savefig('data/valeurs_aberrantes.png')
plt.close()

# 5. Statistiques avancées
print("\n=== Statistiques avancées ===")
for col in numeric_columns:
    print(f"\nTests statistiques pour {col}:")
    # Test de normalité
    stat, p_value = stats.normaltest(df[col].dropna())
    print(f"Test de normalité (D'Agostino-Pearson):")
    print(f"p-value: {p_value:.4f}")
    print(f"Distribution {'normale' if p_value > 0.05 else 'non normale'}")
    
    # Asymétrie et aplatissement
    print(f"Asymétrie (skewness): {stats.skew(df[col].dropna()):.4f}")
    print(f"Aplatissement (kurtosis): {stats.kurtosis(df[col].dropna()):.4f}")

print("\nVisualisations sauvegardées sous :")
print("- data/correlation_matrix.png")
print("- data/evolution_temporelle.png")
print("- data/analyse_spatiale.png")
print("- data/valeurs_aberrantes.png") 