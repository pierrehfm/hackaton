-- Création de la table episodes_pollution
CREATE TABLE IF NOT EXISTS episodes_pollution (
    id SERIAL PRIMARY KEY,
    gid INTEGER,
    code_zone INTEGER,
    zone VARCHAR(255),
    date TIMESTAMP,
    date_dif TIMESTAMP,
    code_pol INTEGER,
    polluant VARCHAR(100),
    etat VARCHAR(100),
    niveau VARCHAR(50),
    com_court VARCHAR(100),
    commentaire TEXT,
    objectid INTEGER,
    shape_area FLOAT,
    shape_length FLOAT
);

-- Création de la table infrastructure_route
CREATE TABLE IF NOT EXISTS infrastructure_route (
    id SERIAL PRIMARY KEY,
    code_insee_commune VARCHAR(20),
    axe VARCHAR(50),
    x_deb FLOAT,
    y_deb FLOAT,
    x_fin FLOAT,
    y_fin FLOAT,
    longueur FLOAT,
    code_traficolor VARCHAR(20)
);

-- Création de la table comptage_trafic
CREATE TABLE IF NOT EXISTS comptage_trafic (
    id SERIAL PRIMARY KEY,
    positionne VARCHAR(255),
    distanceli INTEGER,
    nom VARCHAR(255),
    typecapteu VARCHAR(100),
    typepostem VARCHAR(100),
    nbvoies INTEGER,
    moyennejou FLOAT,
    debithorai FLOAT,
    horairedeb VARCHAR(10),
    identifian INTEGER,
    identifia0 INTEGER,
    anneerefer FLOAT,
    estvalide FLOAT,
    gid INTEGER
); 