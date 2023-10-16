/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import StokBarangHeader from './StokBarangHeader';
import StokBarangTable from './StokBarangTable';

function StokBarang() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<StokBarangHeader />}
      content={<StokBarangTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default StokBarang;
