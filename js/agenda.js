async function organizarEventos() {

    const eventos = await carregarEventos();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const proximosTimeline = document.querySelector('#proximos .timeline');
    const passadosCardsGrid = document.querySelector('#passados .cards-grid');

    // Verificar se os elementos existem
    if (!proximosTimeline || !passadosCardsGrid) {
        console.error('Elementos da agenda não encontrados.');
        return;
    }

    // Limpar eventos existentes
    proximosTimeline.innerHTML = '';
    passadosCardsGrid.innerHTML = '';

    const proximos = [];
    const passados = [];

    // Idioma atual
    const idioma =
        typeof currentLanguage !== 'undefined'
            ? currentLanguage
            : 'pt';


    // =====================================================
    // CRIAR EVENTOS
    // =====================================================

    eventos.forEach(evento => {

        const data = new Date(evento.date);
        data.setHours(0, 0, 0, 0);

        // Suporte para eventos antigos sem tradução
        const month = obterTexto(evento.month, idioma);
        const title = obterTexto(evento.title, idioma);
        const location = obterTexto(evento.location, idioma);
        const description = obterTexto(evento.description, idioma);

        const timelineItem = document.createElement('div');

        timelineItem.className = 'timeline-item';

        timelineItem.innerHTML = `
            <div class="timeline-content">

                <div class="event-date-badge">
                    <span class="day">${evento.day}</span>
                    <span class="month">${month}</span>
                </div>

                <h3 class="event-title">${title}</h3>

                <p class="event-time">${evento.time}</p>

                <p class="event-location">${location}</p>

                <p class="event-description">${description}</p>

            </div>
        `;


        // Evento futuro
        if (data >= hoje) {

            proximos.push({
                elemento: timelineItem,
                data: data
            });

        }

        // Evento passado
        else {

            passados.push({
                elemento: timelineItem,
                data: data
            });

        }

    });


    // =====================================================
    // ORDENAR
    // =====================================================

    // Próximos: mais próximo primeiro
    proximos.sort((a, b) => {
        return a.data - b.data;
    });

    // Passados: mais recente primeiro
    passados.sort((a, b) => {
        return b.data - a.data;
    });


    // =====================================================
    // MOSTRAR PRÓXIMOS
    // =====================================================

    proximos.forEach(item => {
        proximosTimeline.appendChild(item.elemento);
    });


    // =====================================================
    // MOSTRAR PASSADOS
    // =====================================================

    passados.forEach(item => {

        const card = item.elemento;

        card.classList.add('event-card');

        const badge = card.querySelector('.event-date-badge');
        const title = card.querySelector('.event-title');
        const time = card.querySelector('.event-time');
        const location = card.querySelector('.event-location');
        const description = card.querySelector('.event-description');


        // Limpar conteúdo
        card.innerHTML = '';


        // Data
        if (badge) {
            card.appendChild(badge);
        }


        // Conteúdo
        const content = document.createElement('div');

        content.className = 'event-card-content';


        if (title) {
            content.appendChild(title);
        }

        if (time) {
            content.appendChild(time);
        }

        if (location) {
            content.appendChild(location);
        }

        if (description) {
            content.appendChild(description);
        }


        card.appendChild(content);

        passadosCardsGrid.appendChild(card);

    });


    // =====================================================
    // SE NÃO HOUVER PRÓXIMOS EVENTOS
    // =====================================================

    if (proximos.length === 0) {

        document.getElementById('tab-passados').checked = true;

    }

}


// =========================================================
// OBTER TEXTO NO IDIOMA ATUAL
// =========================================================

function obterTexto(valor, idioma) {

    // Se for um objeto PT/EN
    if (
        valor &&
        typeof valor === 'object'
    ) {

        return valor[idioma] || valor.pt || '';

    }

    // Compatibilidade com eventos antigos
    return valor || '';
}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    'DOMContentLoaded',
    organizarEventos
);


// =========================================================
// ATUALIZAR QUANDO MUDA O IDIOMA
// =========================================================

document.addEventListener(
    'languageChanged',
    organizarEventos
);
