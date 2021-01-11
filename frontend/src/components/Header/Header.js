import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import logo from '../../img/logo.svg';

const headerStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  bg: {
    backgroundColor: '#000',
    height: '5em',
    padding: theme.spacing(1)
  },
  logo: {
    width: '13em',
    height: '4.5em',
    left: 53,
    top: 0,
  },
}));


const Header = () => {
  const headerCSS = headerStyle();

  return (
    <div className={headerCSS.root}>
      <Grid container justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} >
          <Box boxShadow={10} className={headerCSS.bg}>
            <img src={logo} alt="Page logo" className={headerCSS.logo} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;