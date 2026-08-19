async function organizarEventos() {
    const eventos = await carregarEventos();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const proximosTimeline = document.querySelector('#proximos .timeline');
    const passadosCardsGrid = document.querySelector('#passados .cards-grid');
    
    const proximos = [];
    const passados = [];
    
    eventos.forEach(evento => {
        const data = new Date(evento.date);
        data.setHours(0, 0, 0, 0);
        
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="event-date-badge">
                    <span class="day">${evento.day}</span>
                    <span class="month">${evento.month}</span>
                </div>
                <h3 class="event-title">${evento.title}</h3>
                <p class="event-time">${evento.time}</p>
                <p class="event-location">${evento.location}</p>
                <p class="event-description">${evento.description}</p>
            </div>
        `;
        
        if (data >= hoje) {
            proximos.push({ elemento: timelineItem, data: data });
        } else {
            passados.push({ elemento: timelineItem, data: data });
        }
    });
    
    proximos.sort((a, b) => a.data - b.data);
    passados.sort((a, b) => b.data - a.data);
    
    proximos.forEach(item => {
        proximosTimeline.appendChild(item.elemento);
    });
    
    passados.forEach(item => {
        const card = item.elemento;
        card.classList.add('event-card');
        
        const badge = card.querySelector('.event-date-badge');
        const title = card.querySelector('.event-title');
        const time = card.querySelector('.event-time');
        const location = card.querySelector('.event-location');
        const description = card.querySelector('.event-description');
        
        card.innerHTML = '';
        if (badge) card.appendChild(badge);
        
        const content = document.createElement('div');
        content.className = 'event-card-content';
        if (title) content.appendChild(title);
        if (time) content.appendChild(time);
        if (location) content.appendChild(location);
        if (description) content.appendChild(description);
        
        card.appendChild(content);
        passadosCardsGrid.appendChild(card);
    });
    
    if (proximos.length === 0) {
        document.getElementById('tab-passados').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', organizarEventos);
