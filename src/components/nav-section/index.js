// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  const firstPath = path.split('/')[1];
  
  return pathname.includes(firstPath === 'unit' || firstPath === 'jurnal' ? firstPath : path) || asPath.includes(path);
}
