import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, TextField } from '@mui/material';
import moment from 'moment';

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];
function BarangMasukHeader(props) {
  const dispatch = useDispatch();
  const { dataMasterBarang } = props;
  const { dataMasterSuplayer } = props;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [kodeBarang, setkodeBarang] = useState(null);
  const [namaBarang, setnamaBarang] = useState('');
  const [hargaBarang, sethargaBarang] = useState('');
  const [supllayer, setsupllayer] = useState(null);
  const [jumlahMasuk, setjumlahMasuk] = useState(0);
  const [satuan, setsatuan] = useState(null);
  const [tglMasuk, settglMasuk] = useState(null);

  const body = {
    kodeBarang: JSON.stringify(kodeBarang),
    namaBarang,
    hargaBarang,
    supllayer: JSON.stringify(supllayer),
    jumlahMasuk,
    satuan: JSON.stringify(satuan),
    tglMasuk: moment(tglMasuk).format(),
  };
  // const api = `https://6530fba34d4c2e3f333c280d.mockapi.io/barang/barang`;
  // const api = `http://localhost:3000/barangMasuk`;
  const api = `http://localhost:3000`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setkodeBarang('');
    setnamaBarang('');
    sethargaBarang('');
    setsupllayer('');
    setjumlahMasuk(0);
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${api}/barangMasuk`, body)
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
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
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
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Kode Barang" />}
                />
              </div>
              <div>
                <TextField
                  value={namaBarang}
                  disabled
                  // onChange={(e) => setnamaBarang(e.target.value)}
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
              <div>
                <TextField
                  value={jumlahMasuk}
                  onChange={(e) => setjumlahMasuk(e.target.value)}
                  id="outlined-basic"
                  type="number"
                  label="Jummlah Masuk"
                  variant="outlined"
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={tglMasuk}
                    onChange={(date) => {
                      settglMasuk(date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={satuan}
                  onChange={(_, newValue) => {
                    setsatuan(newValue);
                  }}
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Satuan" />}
                />
              </div>
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={supllayer}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setsupllayer(newValue);
                    } else {
                      setsupllayer(null);
                    }
                  }}
                  id="combo-box-demo"
                  options={dataMasterSuplayer}
                  // options={top100Films}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Supllayer" />}
                />
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
              kodeBarang === '' ||
              namaBarang === '' ||
              hargaBarang === '' ||
              jumlahMasuk <= 0 ||
              supllayer === ''
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
        Barang Masuk
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
            placeholder="Search products"
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
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default BarangMasukHeader;
