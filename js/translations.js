// ==========================================
// SISTEMA DE TRADUÇÃO
// ==========================================

let currentLanguage = localStorage.getItem('language') || 'pt';
let translations = {};

// Carregar traduções do JSON
async function loadTranslations() {
  try {
    const response = await fetch(`./data/translations.json?t=${Date.now()}`);
    translations = await response.json();
    applyTranslations();
    updateLanguageSelector();
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  }
}

// Aplicar traduções à página
function applyTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const [section, ...keyParts] = key.split('.');
    const finalKey = keyParts.join('.');
    
    if (translations[section] && translations[section][currentLanguage] && translations[section][currentLanguage][finalKey]) {
      const text = translations[section][currentLanguage][finalKey];
      
      if (element.tagName === 'A') {
        element.textContent = text;
      } else if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
        element.value = text;
      } else {
        element.textContent = text;
      }
    }
  });
}

// Mudar idioma
function changeLanguage(lang) {
  if (lang === 'pt' || lang === 'en') {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
    updateLanguageSelector();
  }
}

// Atualizar seletor de idioma
function updateLanguageSelector() {
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === currentLanguage) {
      btn.classList.add('active');
    }
  });
}

// Obter tradução por key (para usar em JavaScript)
function t(key) {
  const [section, ...keyParts] = key.split('.');
  const finalKey = keyParts.join('.');
  
  if (translations[section] && translations[section][currentLanguage] && translations[section][currentLanguage][finalKey]) {
    return translations[section][currentLanguage][finalKey];
  }
  return key;
}

// Inicializar na página carregar
document.addEventListener('DOMContentLoaded', function() {
  loadTranslations();
});
