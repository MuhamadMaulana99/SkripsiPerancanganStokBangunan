/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import SatuanHeader from './SatuanHeader';
import SatuanTable from './SatuanTable';

function Satuan() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/suplayer`;
  const api = `http://localhost:3000/mstSatuan`;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
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

  return (
    <FusePageCarded
      header={<SatuanHeader getData={getData} data={data} loading={loading} />}
      content={<SatuanTable getData={getData} data={data} loading={loading} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Satuan;
