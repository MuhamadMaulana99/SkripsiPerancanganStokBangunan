import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  // {
  //   id: 'example-component',
  //   title: 'Example',
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'example',
  // },
  {
    id: 'data-barang',
    title: 'Data Barang',
    // translate: 'Data Barang',
    type: 'item',
    icon: 'heroicons-outline:shopping-cart',
    url: 'dataBarang',
  },
  {
    id: 'stok-barang',
    title: 'Stok Barang',
    // translate: 'Stok Barang',
    type: 'item',
    icon: 'heroicons-outline:collection',
    url: 'stokBarang',
  },
  {
    id: 'barang-masuk',
    title: 'Barang Masuk',
    // translate: 'Barang Masuk',
    type: 'item',
    icon: 'move_to_inbox',
    url: 'barangMasuk',
  },
  {
    id: 'barang-keluar',
    title: 'Barang Keluar',
    // translate: 'Barang Keluar',
    type: 'item',
    icon: 'exit_to_app',
    url: 'barangKeluar',
  },
  {
    id: 'user',
    title: 'User',
    // translate: 'User',
    type: 'item',
    icon: 'heroicons-outline:user-circle',
    url: 'user',
  },
];

export default navigationConfig;
