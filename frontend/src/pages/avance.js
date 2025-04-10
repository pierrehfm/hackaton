function Avance() {
    const styles = {
        container: {
            marginTop: '7rem',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#444',
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            gridTemplateColumns: 'repeat(2, 1fr)',
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
            },
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>
                Analyses plus approfondies
            </h2>
            <div style={styles.gridContainer}>
                {[
                    '/chart/analyse_spatiale.png',
                    '/chart/boxplots_numeriques.png',
                    '/chart/correlation_matrix.png',
                    '/chart/distributions_numeriques.png',
                    '/chart/evolution_temporelle.png',
                    '/chart/valeurs_aberrantes.png',
                ].map((url, idx) => (
                    <div key={idx} style={styles.card}>
                        <img
                            src={url}
                            alt={`Image ${idx + 1}`}
                            style={styles.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Avance;
