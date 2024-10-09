// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  const firstPath = path.split('/')[1];
  const secondPath = path.split('/')[2];
  return pathname.includes(firstPath === 'unit' || firstPath === 'jurnal' ? firstPath : secondPath === 'data-bumdesa' || secondPath === 'data-unit' ? secondPath : path) || asPath.includes(path);
}
