import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Container,
  Grid,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import InputMask from "react-input-mask";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { Alert } from '@material-ui/lab';


const style = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(1),
    },
  },
  header: {
    padding: '20px 20px 0px 20px'
  },
  card: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(38),
    },
    [theme.breakpoints.down('md')]: {
      width: '15em',
    },
    height: theme.spacing(38),
  },
  title: {
    fontSize: '1.4em',
    color: '#4F9419',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  success: {
    color: '#4F9419',
    '&:hover': {
      backgroundColor: '#e9ffd9'
    }
  }
}));



const Dashboard = (props) => {
  const theme = useTheme();
  const classes = style();

  // TODO: Hide elements effect before remove
  const onDeleteActionHandler = (id, index) => {
    fetch(process.env.REACT_APP_API + '/places/' + id, { method: 'DELETE' })
      .then(res => {
        if (res.status === HttpStatus.OK) return res;
        else throw res;
      });

    // Removing element from dashboard
    props.removeCountry(index);
  }

  // UI error
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Modal functions
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setErrorMsg('');
    setIsError(false);
  };

  // Edit auxiliar variables
  const [editIndex, setEditIndex] = useState(-1);
  const [place, setPlace] = useState(null);
  const [goal, setGoal] = useState(null);

  // Change variables based in edit field
  const onEditPlaceHandler = (event) => { setPlace(event.target.value); }
  const onEditGoalHandler = (event) => { setGoal(event.target.value); }

  /**
   * Save changes in database/API
   */
  const onSaveHandler = () => {
    // Changing in cards
    props.editCountry(editIndex, place, goal);

    // Split the goal field
    const [month, year] = goal.split('/');
    // Object that will be sent to api
    const obj = `
    {
      "place": "${place}",
      "month": ${Number(month)},
      "year": ${Number(year)}
    }`;


    const url = `${process.env.REACT_APP_API}/places/${props.countries[editIndex].id}`

    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: obj
    }).then(res => res.json())
      .then(res => {
        if (!res.statusCode) {
          setOpen(false);
          props.editCountry(editIndex, place, goal);
        }
        else if (res.statusCode !== HttpStatus.OK) {
          setErrorMsg(`O servidor retornou: ${res.message}`);
          setIsError(true);
        }
      });
  }

  // Opens the modal and retrieve values
  const onEditActionHandler = (id, index) => {
    setEditIndex(index);
    // Retrieve from card
    setPlace(props.countries[index].place);
    setGoal(props.countries[index].goal);
    // Open modal
    setOpen(true);
  }


  return (
    <div>
      {/* Modals */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* Edit context */}
        <DialogTitle>{"Edição deste objetivo de viagem"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Locale/PLACE */}
            <TextField
              placeholder="Digite o local que deseja conhecer"
              value={place}
              onChange={onEditPlaceHandler}
              label="Local"
              fullWidth={true}
              style={{ margin: '2em 0em 2em 0em' }}
            />

            <InputMask
              mask="99/9999"
              value={goal}
              onChange={onEditGoalHandler}
            >{(props) =>
              <TextField
                fullWidth={true}
                value={goal}
                onChange={onEditGoalHandler}
                label="Meta"
              />}
            </InputMask>

            {/* Error UI/Handling */}
            <Zoom in={isError}>
              <Alert
                variant="filled"
                severity="error"
                style={{ flex: 1, margin: theme.spacing(2) }}
                action={
                  <IconButton size='small' onClick={() => setIsError(false)}>
                    <CloseIcon />
                  </IconButton>
                }
              >
                {errorMsg}
              </Alert>
            </Zoom>
          </DialogContentText>

        </DialogContent >
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={onSaveHandler} className={classes.success}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog >


      {/* Dashboard box */}
      < Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
        className={classes.root}
      >
        {/* Items */}
        {props.countries.map((item, index) => (
          <Zoom in={true} key={item.id}>
            <Grid item className={classes.root}>
              <Card className={classes.card} elevation={4}>
                <CardHeader
                  avatar={
                    <img alt="logo" src={item.flag} width='60' height='60' />
                  }
                  action={
                    <CardActions>
                      <IconButton onClick={() => onEditActionHandler(item.id, index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDeleteActionHandler(item.id, index)}>
                        <CloseIcon />
                      </IconButton>
                    </CardActions>
                  }
                  className={classes.header}
                />
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    {item.country}
                  </Typography>
                  <hr />
                </CardContent>
                <CardContent >
                  <Container fixed className={classes.container}>
                    <Typography
                      paragraph={true}
                      align="justify"
                      variant="body2"
                      style={{ wordWrap: "break-word" }}
                    >
                      Local: {
                        item.place.length > 50 ? item.place.slice(0, 47) + ' ...' : item.place
                      }
                    </Typography>
                    <Typography
                      paragraph={true}
                      align="justify"
                      variant="body2"
                      style={{ wordWrap: "break-word" }}
                    >
                      Meta: {item.goal}
                    </Typography>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
          </Zoom>
        ))}

      </Grid >
    </div >
  )
}

export default Dashboard;
