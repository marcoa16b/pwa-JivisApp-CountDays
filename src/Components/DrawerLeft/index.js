import * as React from 'react';
import { AppContext } from '../AppContext';
import { ReadFile } from '../Files';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import PersonAddAlt from '@mui/icons-material/PersonAddAlt';
import Settings from '@mui/icons-material/Settings';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'; //Settings AddCircle RemoveCircle PersonAddAlt
import { UserItem } from '../UserItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


const drawerWidth = 240;

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    right: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
}));

function PersistentDrawerLeft(props) {
    const listaSort = [];
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openDialogUser, setOpenDialogUser] = React.useState(false);
    const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
    const [openDialogQuit, setOpenDialogQuit] = React.useState(false);
    const [openDialogSettings, setOpenDialogSettings] = React.useState(false);
    const [nameToAdd, setNameToAdd] = React.useState('');
    const [motivo, setMotivo] = React.useState('');
    const [directory, setDirectory] = React.useState('');
    const { searchValue, setSearchValue } = React.useContext(AppContext);
    const [openNotif, setOpenNotif] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClicked = (Transition) => () => {
      setTransition(() => Transition);
      setOpenNotif(true);
    };
  
    const handleCloseNotif = () => {
      setOpenNotif(false);
    };

    // Dialogo agregar usuario
    const handleDialogAddUser = () => {
        setOpenDialogUser(true);
    };
    const handleCloseDialogAddUser = () => {
        setOpenDialogUser(false);
    };
    // Dialogo agregar dia
    const HandleOpenAddDialog = () => {
        setOpenDialogAdd(true)
    };
    const HandleCloseAddDialog = () => {
        setOpenDialogAdd(false)
    };
    // Dialogo quitar dia
    const HandleOpenDelDialog = () => {
        setOpenDialogQuit(true)
    };
    const HandleCloseDelDialog = () => {
        setOpenDialogQuit(false)
    };
    // Dialogo Settings
    const HandleOpenSettingsDialog = () => {
        setOpenDialogSettings(true)
    };
    const HandleCloseSettingsDialog = () => {
        setOpenDialogSettings(false)
    };

    // Control de busqueda de usuarios
    const onSearchValueChange = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    // Value Chenges
    const onNameValueChange = (event) => {
        setNameToAdd(event.target.value);
    };
    const onChangeReason = (event) => {
        setMotivo(event.target.value);
    }

    // Control apertura de barra lateral
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // handle actions
    const handleAddUser = () => {
        props.addUser(nameToAdd);
        setNameToAdd('');
        handleCloseDialogAddUser();
    }
    const handleAddDayToAllUsers = () => {
      if (motivo.length <= 85) {
        props.addDaysToAllUsers(motivo);
        setMotivo('');
        setOpenDialogAdd(false);
      } else {
        // error
        handleClicked(TransitionLeft)
        setMotivo('');
        setOpenDialogAdd(false);
      }
    }
    const handleQuitDayToAllUsers = () => {
      if (motivo.length <= 85) {
        props.quitDaysToAllUsers(motivo);
        setMotivo('');
        setOpenDialogQuit(false);
      } else {
        // error
        handleClicked(TransitionLeft)
        setMotivo('');
        setOpenDialogAdd(false);
      }
        
    }

    function handleChangeFile(event) {
        //console.log(`Selected file - ${event.target.files[0].name}`);
        setDirectory(event.target.files[0]);
    }

    // Funcion para saber si estamos en un dispositivo movil o en un dispositivo de escritorio
    // y en base a eso saber si colocar el titulo del sitio (Administracion de usuarios)
    const whenNotMobileDevice = (titulo) => {
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            return <Typography variant="h6" noWrap component="div">{titulo}</Typography>
        }
    };
    const listaAddUsers= [  'Estiven Rojas Zamora',
                            'Grettel Moran Pinell',
                            'Yuliana Sandi Bermudez',
                            'Guillermo Cordero Oses',
                            'Gabriela Chaves Camacho',
                            'Miguel Quiros Quiros',
                        ];

    const addUsers = (lista) => {
        props.addUsersList(lista);
    }
    const FileReader = () => {
        
        ReadFile(directory, props.addUsersList);
        HandleCloseSettingsDialog();
    }

    const sortList = () => {
      props.searchedUsers.map(user => (
          listaSort.push(`${user.name} tiene ${user.days} dias`)
      ));
      return listaSort.sort();
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <Snackbar
        open={openNotif}
        onClose={handleCloseNotif}
        TransitionComponent={transition}
        message="Error numero de caracteres excedido"
        key={transition ? transition.name : ''}
      />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
            {whenNotMobileDevice("Administración de usuarios")}
          <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                onChange={onSearchValueChange}
                inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem onClick={handleDialogAddUser} button key="Agregar empleado">
              <ListItemIcon>
                <PersonAddAlt />
              </ListItemIcon>
              <ListItemText primary="Agregar empleado" />
            </ListItem>
            <ListItem onClick={HandleOpenAddDialog} button key="Sumar dia">
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Sumar dia" />
            </ListItem>
            <ListItem onClick={HandleOpenDelDialog} button key="Restar dia">
              <ListItemIcon>
                <RemoveCircle />
              </ListItemIcon>
              <ListItemText primary="Restar dia" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem onClick={HandleOpenSettingsDialog} button key="Ajustes">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Ajustes" />
            </ListItem>
        </List>
      </Drawer>

      <Main open={open} sx={{ width: '90%', justifyContent: 'center' }}>
        <DrawerHeader />

        {/* {!!notListUsers && (
          <Typography variant="h6">Agrega el primer usuario usuario</Typography>
        )} */}
        
        {!!props.loading && (
            <Box sx={{ display: 'flex', display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )}
        <List sx={{ width: '90%', display: 'grid', justifyContent: 'center' }}>
            {sortList().map(user => (
                <UserItem 
                    name={user}
                    listUsers={props.searchedUsers}
                    deleteUser={props.deleteUser}
                    addDaysUser={props.addDaysUser}
                    quitDaysUser={props.quitDaysUser}
                    setModalAddValue={props.setModalAddValue}
                    setModalDelValue={props.setModalDelValue}
                    modalAddValue={props.modalAddValue}
                    modalDelValue={props.modalDelValue}
                    nameToEdit={props.nameToEdit}
                    setNameToEdit={props.setNameToEdit}
                />
            ))}
        </List>
      </Main>

        <Dialog open={openDialogUser} onClose={handleCloseDialogAddUser}>
            <DialogTitle>Agregar usuario</DialogTitle>
            <DialogContent>
                <DialogContentText>Digite el nombre con el que desea guardar el usuario.</DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Nombre empleado" type="name"
                    value={nameToAdd} onChange={onNameValueChange} fullWidth variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialogAddUser}>Cancelar</Button>
                <Button onClick={handleAddUser}>Agregar</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openDialogAdd} onClose={HandleCloseAddDialog}>
            <DialogTitle>Sumar un dia a todos los usuarios</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite el motivo por el que se le va a sumar un dia a
                    todos los usuarios.
                </DialogContentText>
                <DialogContentText>
                    Maximo de 85 caracteres: {motivo.length}
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Motivo" type="name"
                    value={motivo} onChange={onChangeReason} fullWidth variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={HandleCloseAddDialog}>Cancelar</Button>
                <Button onClick={handleAddDayToAllUsers}>Aceptar</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openDialogQuit} onClose={HandleCloseDelDialog}>
            <DialogTitle>Restar un dia a todos los usuarios</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite el motivo por el que se le va a restar un dia a
                    todos los usuarios.
                </DialogContentText>
                <DialogContentText>
                    Maximo de 85 caracteres: {motivo.length}
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Motivo" type="name"
                    value={motivo} onChange={onChangeReason} fullWidth variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={HandleCloseDelDialog}>Cancelar</Button>
                <Button onClick={handleQuitDayToAllUsers}>Aceptar</Button>
            </DialogActions>
        </Dialog> 
        {/* Input */}

        <Dialog open={openDialogSettings} onClose={HandleCloseSettingsDialog}>
            <DialogTitle>Configuracion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seleccione un archivo .csv para agregar una lista de usuarios, este archivo 
                    csv debe contener unicamente un nombre de usuario por cada fila.
                </DialogContentText>
                <Input type="file" onChange={handleChangeFile} />
            </DialogContent>
            <DialogActions>
                <Button onClick={HandleCloseSettingsDialog}>Cancelar</Button>
                <Button onClick={FileReader}>Aceptar</Button>
            </DialogActions>
        </Dialog> 

    </Box>
  );
}

export { PersistentDrawerLeft };