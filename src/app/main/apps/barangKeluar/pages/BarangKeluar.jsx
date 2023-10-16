/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import BarangKeluarHeader from './BarangKeluarHeader';
import BarangKeluarTable from './BarangKeluarTable';

function BarangKeluar() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<BarangKeluarHeader />}
      content={<BarangKeluarTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default BarangKeluar;
