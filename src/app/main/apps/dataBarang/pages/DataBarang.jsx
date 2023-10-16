/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import DataBarangHeader from './DataBarangHeader';
import DataBarangTable from './DataBarangTable';

function DataBarang() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<DataBarangHeader />}
      content={<DataBarangTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default DataBarang;
