import React from "react";
import { GenerateReport } from '../Files';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete'; //AddCircle RemoveCircle Feed
import AddIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import FeedIcon from '@mui/icons-material/Feed';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';


function UserItem(props) {
    const [openDel, setOpenDel] = React.useState(false);
    const [reportDialog, setReportDialog] = React.useState(false);
    const [openAddDiasModal, setOpenAddDiasModal] = React.useState(false);
    const [openDelDiasModal, setOpenDelDiasModal] = React.useState(false);
    const [openAlertErr, setOpenAlertErr] = React.useState(false);
    const [newDays, setNewDays] = React.useState(0);
    const [observ, setObserv] = React.useState('');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Modal agregar dias a usuario
    const onAddDays = () => {
        props.setNameToEdit(props.name)
        props.setModalAddValue(true);
    }
    const openModalAddDialog = () => {
        setOpenAddDiasModal(true);
    }
    const closeModalAddDialog = () => {
        setOpenAddDiasModal(false);
    };

    // Modal quitar dias a usuario
    const onQuitDays = () => {
        props.setNameToEdit(props.name)
        props.setModalDelValue(true)
    }
    const openModalDelDialog = () => {
        setOpenDelDiasModal(true);
    }
    const closeModalDelDialog = () => {
        setOpenDelDiasModal(false);
    };

    // Modal Borrar Usuario
    const delClickOpen = () => {
        setOpenDel(true);
    };
    const delClose = () => {
        setOpenDel(false);
    };

    // Modal Generar reporte
    const openReportDialog = () => {
        setReportDialog(true);
    }
    const reportDialogClose = () => {
        setReportDialog(false);
    };

    // onChanges
    const onChangeDays = (event) => {
        setNewDays(event.target.value);
    };
    const onChangeObs = (event) => {
        setObserv(event.target.value);
    };

    // onSubmits
    const onSubmitAdd = (event) => { //maximo de 85 Caracteres en los textos
        event.preventDefault();
        if (!(newDays <= 0) && observ !== ''){
            if (observ.length <= 85) {
                props.addDaysUser(props.name, String(newDays), observ);
                setNewDays(0);
                setObserv('');
            } else {
                setOpenAlertErr(true);
                setNewDays(0);
                setObserv('');
            }
        } else {
            setOpenAlertErr(true);
            setNewDays(0);
            setObserv('');
        }
        closeModalAddDialog();
    }
    const onSubmitDel = (event) => {
        event.preventDefault();
        if (!(newDays <= 0) && observ !== ''){
            if (observ.length <= 85) {
                props.quitDaysUser(props.name, String(newDays), observ);
                setNewDays(0);
                setObserv('');
            } else {
                setOpenAlertErr(true);
                setNewDays(0);
                setObserv('');
            }
        } else {
            setOpenAlertErr(true);
            setNewDays(0);
            setObserv('');
        }
        closeModalDelDialog()
    }


    // Borrar un usuario
    const onDelUser = () => {
        props.deleteUser(props.name)
        setOpenDel(false);
    }
    
    //Generar un reporte
    const onReport = () => {
        console.log('Reporte')
        GenerateReport(props.listUsers, props.name)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    

    return (
        <div>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Ver opciones">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                </Tooltip>
                <Typography sx={{ minWidth: 100 }}>{props.name}</Typography>
            </Box>


            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={openModalAddDialog}
                >
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    Agregar dias
                </MenuItem>
                <MenuItem
                    onClick={openModalDelDialog}
                >
                    <ListItemIcon>
                        <RemoveIcon fontSize="small" /> 
                    </ListItemIcon>
                    Restar dias
                </MenuItem>
                <MenuItem
                    onClick={openReportDialog}
                >
                    <ListItemIcon>
                        <FeedIcon fontSize="small" />
                    </ListItemIcon>
                    Generar Reporte
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={delClickOpen}
                >
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Borrar usuario
                </MenuItem>
            </Menu>

            {/* =============== Dialogo Eliminar Usuario =============== */}
            <Dialog
                // fullScreen={fullScreen}
                open={openDel}
                onClose={delClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"¿Realmente desea eliminar este usuario?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Al dar clic en continuar el usuario será eliminado permanentemente.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={delClose}>
                        Cancelar
                    </Button>
                    <Button onClick={onDelUser} autoFocus>
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* =============== Dialogo Generar Reporte =============== */}
            <Dialog
                fullScreen={fullScreen}
                open={reportDialog}
                onClose={reportDialogClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Generador de pdf"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        En esta ventana se generara el informe.
                    </DialogContentText>
                    <Button onClick={onReport} autoFocus>
                        Generar reporte
                    </Button>
                </DialogContent>
                
                <DialogActions>
                    <Button autoFocus onClick={reportDialogClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* =============== Dialogo Agregar Dias al Usuario =============== */}
            <Dialog
                fullScreen={fullScreen}
                open={openAddDiasModal}
                onClose={closeModalAddDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Sumar dias a usuario"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Cuantos dias desea agregarle al usuario?
                    </DialogContentText>
                    <TextField 
                        required
                        id="outlined-number"
                        label="Number"
                        type="number"
                        value={newDays}
                        onChange={onChangeDays}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <DialogContentText>
                        Agregue una observación
                    </DialogContentText>
                    <DialogContentText>
                        Maximo de 85 caracteres: {observ.length}
                    </DialogContentText>
                    <TextField 
                        required
                        id="outlined-required"
                        label="Observación"
                        value={observ}
                        onChange={onChangeObs}
                    />
                    
                </DialogContent>
                
                <DialogActions>
                    <Button autoFocus onClick={closeModalAddDialog} variant="outlined">Cerrar</Button>
                    <Button autoFocus onClick={onSubmitAdd} variant="contained">Aceptar</Button>
                </DialogActions>
            </Dialog>

            {/* =============== Dialogo Restar Dias al Usuario =============== */}
            <Dialog
                fullScreen={fullScreen}
                open={openDelDiasModal}
                onClose={closeModalDelDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Restar dias a usuario"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Cuantos dias desea restarle al usuario?
                    </DialogContentText>
                    <TextField 
                        required
                        id="outlined-number"
                        label="Number"
                        type="number"
                        value={newDays}
                        onChange={onChangeDays}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <DialogContentText>
                        Agregue una observación
                    </DialogContentText>
                    <DialogContentText>
                        Maximo de 85 caracteres: {observ.length}
                    </DialogContentText>
                    <TextField 
                        required
                        id="outlined-required"
                        label="Observación"
                        value={observ}
                        onChange={onChangeObs}
                    />
                </DialogContent>
                
                <DialogActions>
                    <Button autoFocus onClick={closeModalDelDialog} variant="outlined">Cerrar</Button>
                    <Button autoFocus onClick={onSubmitDel} variant="contained">Aceptar</Button>
                </DialogActions>
            </Dialog>
            {!!openAlertErr && (
                <Alert onClose={() => {setOpenAlertErr(false)}} variant="outlined" severity="error">
                    Error: Los valores son incorrectos
                </Alert>
            )}
        </div>
        
    );
}

export { UserItem };