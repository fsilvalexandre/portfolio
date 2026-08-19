// Carrega eventos do JSON
async function carregarEventos() {
    try {
        const response = await fetch('./data/eventos.json');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        return [];
    }
}

// Pega o próximo evento
async function getNextConcert() {
    const eventos = await carregarEventos();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const proximos = eventos.filter(e => {
        const data = new Date(e.date);
        data.setHours(0, 0, 0, 0);
        return data >= hoje;
    });
    
    proximos.sort((a, b) => new Date(a.date) - new Date(b.date));
    return proximos.length > 0 ? proximos[0] : null;
}
