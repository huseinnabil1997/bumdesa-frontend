// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// fullcalendar
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';

//fonts
import '../../public/fonts/index.css';

import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';
//
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { store, persistor } from '../redux/store';
// utils
import { getSettings } from '../utils/settings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import { ChartStyle } from '../components/chart';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import NotistackProvider from '../components/NotistackProvider';
import ThemeLocalization from '../components/ThemeLocalization';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

// date picker
import 'react-datepicker/dist/react-datepicker.css';

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../contexts/JWTContext';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { getSessionToken } from 'src/utils/axiosUnregistered';
// import { AuthProvider } from '../contexts/Auth0Context';
// import { AuthProvider } from '../contexts/FirebaseContext';
// import { AuthProvider } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // const router = useRouter();

  // const isLogin = !!getSessionToken();

  // useEffect(() => {
  //   if (router.asPath.includes('/login') && isLogin) router.push('/auth/register/step-one');
  // }, [router.asPath]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CollapseDrawerProvider>
                  <SettingsProvider defaultSettings={settings}>
                    <ThemeProvider>
                      <NotistackProvider>
                        <MotionLazyContainer>
                          <ThemeColorPresets>
                            <ThemeLocalization>
                              <RtlLayout>
                                <ChartStyle />
                                {/* <Settings /> */}
                                <ProgressBar />
                                {getLayout(<Component {...pageProps} />)}
                              </RtlLayout>
                            </ThemeLocalization>
                          </ThemeColorPresets>
                        </MotionLazyContainer>
                      </NotistackProvider>
                    </ThemeProvider>
                  </SettingsProvider>
                </CollapseDrawerProvider>
              </LocalizationProvider>
            </PersistGate>
          </QueryClientProvider>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
