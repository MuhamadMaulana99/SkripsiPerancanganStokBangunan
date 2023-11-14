/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import BarangMasukTable from './BarangMasukTable';
import BarangMasukHeader from './BarangMasukHeader';

function BarangMasuk() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const api = `https://6530fba34d4c2e3f333c280d.mockapi.io/barang/barang`;
  const api = `http://localhost:3000/barangMasuk`;
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}`)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
        // console.log(res.data, 'rrr');
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  // console.log(data, 'data');

  return (
    <FusePageCarded
      header={<BarangMasukHeader getData={getData} data={data} loading={loading} />}
      content={<BarangMasukTable getData={getData} data={data} loading={loading} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default BarangMasuk;
