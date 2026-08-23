// ==========================================
// SISTEMA DE TRADUÇÃO
// ==========================================

let currentLanguage = localStorage.getItem('language') || 'pt';
let translations = {};

// ==========================================
// CARREGAR TRADUÇÕES
// ==========================================

async function loadTranslations() {
  try {
    const response = await fetch(`./data/translations.json?t=${Date.now()}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    translations = await response.json();

    applyTranslations();
    updateLanguageSelector();

  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  }
}

// ==========================================
// OBTER TRADUÇÃO
// ==========================================

function t(key) {
  const [section, ...keyParts] = key.split('.');
  const finalKey = keyParts.join('.');

  return (
    translations?.[section]?.[currentLanguage]?.[finalKey] ??
    key
  );
}

// ==========================================
// APLICAR TRADUÇÕES NA PÁGINA
// ==========================================

function applyTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const text = t(key);

    if (text === key) return;

    // Placeholder de inputs
    if (element.hasAttribute('data-translate-placeholder')) {
      element.placeholder = text;
      return;
    }

    // Value de inputs/buttons
    if (
      element.tagName === 'INPUT' ||
      element.tagName === 'BUTTON'
    ) {
      element.value = text;
      return;
    }

    // Texto normal
    element.textContent = text;
  });
}

// ==========================================
// MUDAR IDIOMA
// ==========================================

function changeLanguage(lang) {
  if (!['pt', 'en'].includes(lang)) {
    return;
  }

  currentLanguage = lang;
  localStorage.setItem('language', lang);

  applyTranslations();
  updateLanguageSelector();

  // Permite que outros scripts reajam à mudança
  document.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: { language: currentLanguage }
    })
  );
}

// ==========================================
// ATUALIZAR SELETOR DE IDIOMA
// ==========================================

function updateLanguageSelector() {
  document.querySelectorAll('.language-btn').forEach(button => {
    const isActive =
      button.getAttribute('data-lang') === currentLanguage;

    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive);
  });
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  loadTranslations();
});
