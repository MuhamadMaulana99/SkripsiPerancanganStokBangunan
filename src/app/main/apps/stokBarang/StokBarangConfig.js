import i18next from 'i18next';

import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import StokBarang from './pages/StokBarang';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
const StokBarangConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/stokBarang/',
      element: <StokBarang />,
    },
  ],
};

export default StokBarangConfig;
