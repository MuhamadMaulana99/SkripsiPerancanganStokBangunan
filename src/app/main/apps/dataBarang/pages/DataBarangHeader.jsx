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
import { TextField } from '@mui/material';

function DataBarangHeader(props) {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [kodeBarang, setkodeBarang] = useState('');
  const [namaBarang, setnamaBarang] = useState('');
  const [hargaBarang, sethargaBarang] = useState('');

  const body = {
    kodeBarang,
    namaBarang,
    hargaBarang,
  };
  const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/tokoBangunan`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <div className="flex justify-center gap-5 mt-10 mb-10">
              <div>
                <TextField
                  value={kodeBarang}
                  onChange={(e) => setkodeBarang(e.target.value)}
                  id="outlined-basic"
                  label="Kode Barang"
                  variant="outlined"
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
              <div>
                <TextField
                  value={hargaBarang}
                  onChange={(e) => sethargaBarang(e.target.value)}
                  id="outlined-basic"
                  label="Harga Barang"
                  variant="outlined"
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={HandelSubmit} autoFocus>
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
        Data Barang
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

export default DataBarangHeader;
