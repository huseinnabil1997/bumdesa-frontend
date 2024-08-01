function generateElementIds(elements) {
  const idCounts = {};
  const existingIds = new Set();
  const currentPath = window.location.pathname.slice(1);
  const sanitizedPath = currentPath.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase();

  // Kumpulkan semua ID yang sudah ada
  document.querySelectorAll('[id]').forEach(el => existingIds.add(el.id));

  elements.forEach(element => {
    if (element.id && element.id.match(/^[a-z]+-\d+$/)) return;

    const tagName = element.tagName.toLowerCase();
    // Gunakan hash dari konten elemen untuk membuat ID yang konsisten
    const contentHash = hashCode(element.outerHTML);
    const newId = `${tagName}-${sanitizedPath}-${contentHash}`;

    if (!existingIds.has(newId)) {
      element.setAttribute('id', newId);
      existingIds.add(newId);
    }
  });
}

// Fungsi untuk menghasilkan hash sederhana
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Konversi ke 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

function scanAndGenerateIds() {
  const elements = document.querySelectorAll('*:not([id])');
  generateElementIds(elements);
  console.log('ID elemen telah dibuat untuk elemen baru');
}

// MutationObserver untuk mendeteksi perubahan DOM
const observer = new MutationObserver((mutations) => {
  let shouldScan = false;
  for (let mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      shouldScan = true;
      break;
    }
  }
  if (shouldScan) {
    scanAndGenerateIds();
  }
});

// Konfigurasi observer
const config = { childList: true, subtree: true };

// Mulai observasi
document.addEventListener('DOMContentLoaded', () => {
  scanAndGenerateIds();
  observer.observe(document.body, config);
  console.log('Observasi DOM dimulai');
});

// Tambahan untuk memastikan skrip berjalan
window.addEventListener('load', () => {
  const allElements = document.querySelectorAll('*');
  const allHaveIds = Array.from(allElements).every(el => el.id);
  
  if (!allHaveIds) {
    console.log('Beberapa elemen tidak memiliki ID, melakukan pemindaian ulang...');
    scanAndGenerateIds();
  } else {
    console.log('Semua elemen telah memiliki ID');
  }
});