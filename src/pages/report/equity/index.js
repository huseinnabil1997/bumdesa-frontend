import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === '/report/equity') {
      push('/report/equity/list');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
