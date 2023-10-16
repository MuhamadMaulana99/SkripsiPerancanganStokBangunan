/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import BarangMasukHeader from './BarangMasukHeader';
import BarangMasukTable from './BarangMasukTable';

function BarangMasuk() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<BarangMasukHeader />}
      content={<BarangMasukTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default BarangMasuk;
