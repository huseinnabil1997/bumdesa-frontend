function generateElementIds(elements) {
  const currentPath = window.location.pathname.slice(1);
  const sanitizedPath = currentPath.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase();
  const elementCounts = new Map();

  elements.forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    const attributes = encodeAttributes(element.attributes);
    const parentIndex = getParentIndex(element);
    const siblingIndex = getSiblingIndex(element);
    const elementKey = `${tagName}-${sanitizedPath}-${attributes}`;
    
    // Menghitung jumlah elemen yang sama persis
    elementCounts.set(elementKey, (elementCounts.get(elementKey) || 0) + 1);
    const elementCount = elementCounts.get(elementKey);

    const newId = `${elementKey}-${elementCount}`
      .replace(/[^a-zA-Z0-9-]/g, '-');
    element.setAttribute('id', newId);
  });
}

function getSiblingIndex(element) {
  if (element.parentNode) {
    const siblings = Array.from(element.parentNode.children);
    return siblings.filter(sibling => sibling.tagName === element.tagName).indexOf(element);
  }
  return 0;
}

function getParentIndex(element) {
  if (element.parentNode && element.parentNode.parentNode) {
    const parentSiblings = Array.from(element.parentNode.parentNode.children);
    return parentSiblings.indexOf(element.parentNode);
  }
  return '';
}

function encodeAttributes(attributes) {
  const attributesString = Array.from(attributes)
    .filter(attr => attr.name !== 'id')
    .map(attr => `${attr.name}=${attr.value}`)
    .join('&');
  return btoa(attributesString).replace(/[+/=]/g, '').substring(0, 12);
}

function scanAndGenerateIds() {
  const elements = document.querySelectorAll('*');
  generateElementIds(elements);
  console.log('ID elemen telah dibuat atau diperbarui untuk semua elemen');
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
  // if (shouldScan) {
  //   scanAndGenerateIds();
  // }
});

// Konfigurasi observer
const config = { childList: true, subtree: true };

// Mulai observasi
document.addEventListener('DOMContentLoaded', () => {
  // scanAndGenerateIds();
  observer.observe(document.body, config);
  console.log('Observasi DOM dimulai');
});