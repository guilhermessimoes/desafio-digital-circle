import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import { api, apiGo } from '../lib/axios';
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

interface ListProps{
  id: number,
  col_text: string,
  col_dt: Date,
}

export default function Listagem() {
  const [lists, SetList] = useState<ListProps[]>([])
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackDelete, setOpenSnackDelete] = useState(false);
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [cadatro, setCadastro] = useState(false)

  useEffect(()=>{
    api.get('tb01').then(response =>{
      SetList(response.data)
    })
  },[cadatro])  

  async function createNewData (event: FormEvent){
    if (!text || !date) {
      return
    }
    const dateFormatApi = new Date(date)
    setCadastro(false)
    setOpenSnack(false)
    await apiGo.post('tb01', {
      col_text: text,
      col_dt: dateFormatApi
    })
    setText('')
    setDate('')
    setOpen(false);
    setCadastro(true)
    setOpenSnack(true)
  } 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async (id: number) =>{
    setCadastro(false)
    setOpenSnackDelete(false)
    await api.delete(`tb01/${id}`) 
    setCadastro(true)
    setOpenSnackDelete(true)
  }

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleCloseSnackDelete = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackDelete(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ float: 'right'}}>
        Cadastrar
      </Button>
      <Title>Listagem</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Titúlo</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lists.map((list) => (
            <TableRow key={list.id}>
              <TableCell>{list.col_text}</TableCell>
              <TableCell>{dayjs(list.col_dt).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
                <Tooltip title="Excluir">
                  <Button  onClick={() => handleRemove(list.id)}><DeleteIcon sx={{color:'red'}}/></Button>
                </Tooltip>
              </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Digite o texto e a data para realizar o cadastro.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="text"
              label="Digite o Texto"
              type="text"
              fullWidth
              variant="standard"
              onChange={event => setText(event.target.value)}
              value={text}
              helperText="Campo é obrigátorio."
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              type="date"
              fullWidth
              variant="standard"
              onChange={event => setDate(event.target.value)}
              value={date}
              required
              helperText="Campo é obrigátorio."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Cancelar</Button>
            <Button onClick={createNewData} >Cadastrar</Button>
          </DialogActions>
      </Dialog> 
      <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso.
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackDelete} autoHideDuration={4000} onClose={handleCloseSnackDelete} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackDelete} severity="success" sx={{ width: '100%' }}>
          Registro excluido com sucesso.
        </Alert>
      </Snackbar>
    </Box>
  );
}