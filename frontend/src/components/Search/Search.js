import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  FormControl,
  Select,
  Grid,
  Input,
  MenuItem,
  FilledInput,
  Zoom,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import InputMask from "react-input-mask";
import { StatusCodes as HttpStatus } from 'http-status-codes';

// CSS styles
const style = makeStyles((theme) => ({
  bg: {
    backgroundColor: '#4F9419',
    // minHeight: 247,
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 7,
    height: 49,
    "&:hover, &:not(:focus)": {
      backgroundColor: '#fff',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    color: 'grey'
  },
  meta: {
    backgroundColor: 'white',
    borderRadius: 7,
    height: 49,
    "&:hover, &:not(:focus)": {
      backgroundColor: '#fff',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '90%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    color: 'grey'
  },
  text: {
    flexGrow: 1,
    padding: '2',
    [theme.breakpoints.up('md')]: {
      minWidth: '90%',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
  label: {
    color: '#fff'
  },
  button: {
    backgroundColor: '#006C18',
    minWidth: 203,
    height: 49,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.4)',
    },
    "&:hover": {
      backgroundColor: '#3c9950',
    },
  },
  searchField: {
    color: "#cecece",
  },
  uiButton: {
    right: 0,
    padding: 0,
  }
}));

// Constants to select prop
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// Selection size
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

/**
 * Assign a style to each value in select field
 * @param {string} country Country that will be styled
 * @param {string[]} countryNames A list of countries
 * @param {useTheme() material ui obj} theme Theme
 * @returns
 */
const getItemStyle = (country, countryNames, theme) => {
  return {
    fontWeight:
      countryNames.indexOf(country) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const currDate = (new Date()).getFullYear();

const Search = (props) => {
  // Css props
  const classes = style();
  const theme = useTheme();
  // Country name value
  const [countryName, setcountryName] = useState('');
  // Place
  const [place, setPlace] = useState('');
  // Goal
  const [goal, setGoal] = useState('');


  // UI fields
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  // When update country
  const handleContryChange = (event) => {
    setcountryName(event.target.value);
  };

  // When update place
  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  }

  // When update goal
  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  }

  const [countriesNames, setCountriesNames] = useState([]);
  useEffect(() => {
    // Get the data
    fetch('https://restcountries.eu/rest/v2/all', { method: 'GET', }
    ).then(res => {
      if (res.status !== 200)
        throw new Error('Error on handling the request');
      else return res.json()
    }).then(data => {
      // Removing unecessary keys
      return data.map(item => {
        return { name: item.name, flag: item.flag }
      })
    }).then(data => {
      // Sort alphabetically those countries
      return data.sort((f, s) => f.name.toUpperCase() < s.name.toUpperCase() ? -1 : 0);
    }).then(data => setCountriesNames(data));
  }, []);

  /**
   * Validate form
   */
  const validateFormHandler = (month, year, place, country) => {
    // Check if is a valid year
    let err = false;
    const msg = [];

    // Check if place is not empty
    if (place.length < 1 || place.length > 200) {
      msg.push('O lugar não pode ser vazio e não deve exceder 200 chars');
      err = true;
    }

    // Check if country is not the default value
    if (country.length < 1) {
      msg.push('O país não pode estar vazio');
      err = true;
    }

    if (!isNaN(year)) {
      if (year < currDate) {
        msg.push('O ano da viagem não pode ser menor que o atual');
        err = true;
      }
      if (month < 1 || month > 12) {
        msg.push('O mês deve estar entre 1 e 12');
        err = true;
      }
    } else {
      msg.push('A data não está no formato MM/AAAA');
      err = true;
    }


    if (err) {
      setErrorMsg(msg.join('; '));
      setIsError(true);
      return false;
    }
    else {

      // Valid form
      setIsError(false);
      return true;
    }
  }


  /**
   * Send data (country,place,month,year,icon) to API
   */
  const sendDataHandler = () => {
    // Split the meta field
    const [month, year] = goal.split('/');

    // Validate
    const valid = validateFormHandler(month, year, place, countryName);
    if (!valid) return;


    // Function responsable to search for the icon
    const pos = countriesNames.findIndex(val => val.name === countryName);

    // Object that will be sent to api
    const obj = `{
      "country": "${countryName}",
      "place": "${place}",
      "month": ${Number(month)},
      "year": ${Number(year)},
      "iconUrl": "${countriesNames[pos].flag}"
    }`;

    fetch(process.env.REACT_APP_API + '/places', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: obj
    }).then(res => res.json())
      .then(data => {
        if (!data.statusCode) {
          setErrorMsg('');
          setIsError(false);
          // Add a new country
          props.addCountry({
            id: data.id,
            country: data.country,
            place: data.place,
            goal: `${data.month}/${data.year}`,
            flag: data.iconUrl,
          })
        }
        else if (data.statusCode !== HttpStatus.CREATED) {
          setErrorMsg(`Servidor respondeu: ${data.message}`)
          setIsError(true);
        }
        else {
          setErrorMsg(`Servidor respondeu: (${data.statusCode}) ${data.message}`)
          setIsError(true);
        }
      });
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.bg}
      >

        <Grid item xs={12} sm={6} lg={3}>
          <Typography className={classes.label}>País</Typography>
          <FormControl
            className={classes.input}>
            <Select
              disableUnderline
              id="country-select-name"
              value={countryName}
              onChange={handleContryChange}
              input={<Input />}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span className={classes.searchField}>Selecione...</span>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              style={{ padding: "0.5em 1em 0 1em" }}
            >
              {/* Fields in selection */}
              <MenuItem disabled value="">
                <span className={classes.searchField}>Selecione...</span>
              </MenuItem>
              {countriesNames.map((obj) => (
                <MenuItem
                  key={obj.name}
                  value={obj.name}
                  style={getItemStyle(obj.name, countryName, theme)}
                >
                  {obj.name}
                </MenuItem>
              ))
              }
            </Select>
          </FormControl>
        </Grid>

        {/* Locale/PLACE */}
        <Grid item xs={12} sm={6} lg={5}>
          <Typography className={classes.label}>Local</Typography>
          <FilledInput
            disableUnderline
            inputProps={{ style: { padding: '1em' } }}
            className={`${classes.input} ${classes.text}`}
            placeholder="Digite o local que deseja conhecer"
            value={place}
            onChange={handlePlaceChange}
          />
        </Grid>

        {/* Goal */}
        <Grid item xs={12} sm={6} lg={2}>
          <Typography className={classes.label}>Meta</Typography>
          <InputMask
            mask="99/9999"
            value={goal}
            onChange={handleGoalChange}
          >{(props) =>
            <FilledInput
              disableUnderline
              inputProps={{ style: { padding: '2em', width: '4em' } }}
              className={`${classes.meta} ${classes.input}`}
              fullWidth={false}
              value={goal}
              onChange={handleGoalChange}
              placeholder='mês/ano'
            />}
          </InputMask>
        </Grid>

        {/* Button */}
        <Grid item xs={12} sm={6} lg={2}>
          <br />
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={sendDataHandler}
          >Adicionar</Button>
        </Grid>


      </Grid >
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
          Houve um erro ao realizar a requisição — {errorMsg}
        </Alert>
      </Zoom>
    </div>
  );
}
export default Search;