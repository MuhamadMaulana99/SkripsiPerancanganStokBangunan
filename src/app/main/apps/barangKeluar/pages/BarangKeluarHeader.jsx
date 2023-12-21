import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, TextField } from '@mui/material';

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];

function BarangKeluarHeader(props) {
  const dispatch = useDispatch();
  const { dataMasterBarang } = props;
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [kodeBarang, setkodeBarang] = useState(null);
  const [namaBarang, setnamaBarang] = useState('');
  const [tglKeluar, settglKeluar] = useState(null);
  const [jmlKeluar, setjmlKeluar] = useState('');
  const [stokBarang, setstokBarang] = useState(0);
  const [satuan, setsatuan] = useState(null);

  const body = {
    kodeBarang: JSON.stringify(kodeBarang),
    namaBarang,
    tglKeluar,
    jmlKeluar,
    stokBarang,
    satuan,
  };
  // const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/suplayer/1/tokoBangunan`;
  const api = `http://localhost:3000/barangKeluar`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setkodeBarang('');
    setnamaBarang('');
    settglKeluar('');
    setjmlKeluar('');
    setstokBarang(0);
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${api}`, body)
      .then((res) => {
        // setData(res?.data);
        props.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Tambahkan',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        // setData([]);
        handleClose();
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

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Barang</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="m-10">
              <div className="flex justify-between w-full mb-10">
                <div>
                  <Autocomplete
                    disablePortal
                    value={kodeBarang}
                    getOptionLabel={(option) => option.kodeBarang}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setkodeBarang(newValue);
                        setnamaBarang(newValue?.namaBarang);
                      } else {
                        setkodeBarang(null);
                        setnamaBarang('');
                      }
                    }}
                    id="combo-box-demo"
                    options={dataMasterBarang}
                    // options={top100Films}
                    sx={{ width: 220 }}
                    renderInput={(params) => <TextField {...params} label="Kode Barang" />}
                  />
                </div>
                <div>
                  <TextField
                    value={namaBarang}
                    onChange={(e) => setnamaBarang(e.target.value)}
                    id="outlined-basic"
                    label="Nama Barang"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full gap-10">
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={tglKeluar}
                      onChange={(date) => {
                        settglKeluar(date);
                      }}
                      sx={{ width: 220 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="">
                  <TextField
                    fullWidth
                    value={jmlKeluar}
                    onChange={(e) => setjmlKeluar(e.target.value)}
                    id="outlined-basic"
                    label="jmlKeluar"
                    type="number"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            disabled={
              kodeBarang === '' || namaBarang === '' || tglKeluar === '' || jmlKeluar === ''
            }
            onClick={HandelSubmit}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Barang Keluar
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Cari Barang"
            className="flex flex-1"
            disableUnderline
            fullWidth
            // value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            // onChange={(ev) => dispatch(setProductsSearchText(ev))}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            // component={Link}
            // to="/apps/e-commerce/products/new"
            onClick={handleClickOpen}
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default BarangKeluarHeader;
