import React from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Container, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import Logo from "./assets/logo.png";
import Signature from "./Signature";
import { CheckOutlined, FileCopyOutlined } from "@material-ui/icons";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import data from "./posiciones.json"
import infoSede from "./sede.json"
import "./App.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
      "& .label-root": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
    centeredImage: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop:"25px",
      paddingBottom:"30px",
      width: "50%",
      height: "170px",
    },
    centeredText: {
      textAlign: "center",
    },
    warningIconStyle: {
      textAlign: "center",
      color: "#FFDC00",
      verticalAlign: "middle",
    },
    centerSelect: {
      display: "flex",
      margin: "0 auto",
      padding: "8px",
      justifyContent: "center",
      alignItems:"center"
    }
  })
);

export interface PhotoSignatureProps {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  addressIcon:string;
  photo: string;
}

interface State extends PhotoSignatureProps {
  withPhoto: boolean;
  copied: boolean;
}

const initialState: State = {
  fullName: "",
  position: "",
  email: "",
  phone: "",
  address:"",
  addressIcon:"",
  photo: "",
  withPhoto: false,
  copied: false,
};

const App = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<State>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "withPhoto") {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  }
  const handleChangeSelect = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    if (event.target.name === "sucursal" && event.target.value !==5) {
      setState((prevState) => ({
        ...prevState,
        ["phone" as any] : infoSede.sedes[event.target.value as any].tel,
        ["address" as any] : infoSede.sedes[event.target.value as any].direccion,
        ["addressIcon" as any] : infoSede.sedes[event.target.value as any].img
        //[event.target.name as any]: event.target,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [event.target.name as any]: event.target.value,
      }));
    }
  }

  const enoughData = () => {
    let progress = 100;
    if (state.withPhoto) {
      if (
        state.fullName &&
        state.phone &&
        state.position &&
        state.email &&
        state.photo
      ) {
        return (
          <React.Fragment>
            <Signature
              fullName={state.fullName}
              position={state.position}
              email={state.email}
              phone={state.phone}
              address={state.address}
              addressIcon={state.addressIcon}
              photo={state.photo}
            />
            <br />
            <Button
              disabled={state.photo.length > photoUrlMaxLength}
              onClick={copyToClipboard}
              endIcon={state.copied ? <CheckOutlined /> : <FileCopyOutlined />}
            >
              {state.copied ? "Copiado" : "Copiar en portapapeles"}
            </Button>
          </React.Fragment>
        );
      } else {
        Object.entries(state).forEach(([key, value]) => {
          if (
            ["fullName", "phone", "position", "email", "photo"].includes(key)
          ) {
            if (value.length === 0) {
              progress = progress - 20;
            }
          }
        });
      }
    } else {
      if (state.fullName && state.phone && state.position && state.email) {
        return (
          <React.Fragment>
            <Signature
              fullName={state.fullName}
              position={state.position}
              email={state.email}
              phone={state.phone}
              address={state.address}
              addressIcon={state.addressIcon}
              photo={"no-photo"}
            />
            <br />
            <Button
              onClick={copyToClipboard}
              endIcon={state.copied ? <CheckOutlined /> : <FileCopyOutlined />}
            >
              {state.copied ? "Copiado" : "Copiar en portapapeles"}
            </Button>
          </React.Fragment>
        );
      } else {
        Object.entries(state).forEach(([key, value]) => {
          if (["fullName", "phone", "position", "email"].includes(key)) {
            if (value.length === 0) {
              progress = progress - 25;
            }
          }
        });
      }
    }
    if (progress > 0) {
      return (
        <div className={classes.centeredText}>
          <CircularProgressWithLabel variant="determinate" value={progress} />
        </div>
      );
    } else {
      return <div>Por favor, ingresa tus datos</div>;
    }
  };

  const copyToClipboard = () => {
    let copyText = document.querySelector(".signature");
    const range = document.createRange();
    if (copyText) {
      range.selectNode(copyText);
    }
    const windowSelection = window.getSelection();
    if (windowSelection) {
      windowSelection.removeAllRanges();
      windowSelection.addRange(range);
    }
    try {
      let successful = document.execCommand("copy");
      console.log(successful ? "Success" : "Fail");
      setState((prevState) => ({
        ...prevState,
        copied: true,
      }));
    } catch (err) {
      console.log("Fail");
    }
  };

  const isStateChanged = () => {
    return JSON.stringify(state) === JSON.stringify(initialState);
  };

  const clearState = () => {
    setState(initialState);
  };

  const photoUrlMaxLength = 1000;

  return (
    <Container>
      <img className={classes.centeredImage} src={Logo} alt={"logo"} />
      <Typography variant="h2" gutterBottom className={classes.centeredText}>
        ??Gener?? tu firma!
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        className={classes.centeredText}
      >
        Completa los siguentes datos para crear tu firma para mails
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                fullWidth={true}
                required
                label="Nombre Completo"
                value={state.fullName}
                name={"fullName"}
                onChange={handleChange}
                autoFocus={true}
                inputProps={{maxLength :35}}
              />
              {/* <TextField
                fullWidth={true}
                required
                label="Puesto"
                value={state.position}
                name={"position"}
                onChange={handleChange}
                inputProps={{maxLength :35}}
              /> */}
              <TextField
                fullWidth={true}
                required
                label="Email"
                value={state.email}
                name={"email"}
                onChange={handleChange}
              />
              <Select
                defaultValue= {1}
                fullWidth ={true}
                onChange = {(e) =>handleChangeSelect(e)}
                name={"position"}
                className={classes.centerSelect}
              >
                <MenuItem value={1}>Posicion</MenuItem>
                {
                  data.posiciones ? 
                  data.posiciones.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>) : 
                  <MenuItem>Cargando opciones</MenuItem>
                }
              </Select>
              <Select
                defaultValue= {5}
                fullWidth
                onChange = {(e) =>handleChangeSelect(e)}
                name={"sucursal"}
                className={classes.centerSelect}
              >
                <MenuItem value={5}>Sucursal</MenuItem>
                {
                  infoSede.sedes ? 
                  infoSede.sedes.map((e, index) => <MenuItem value={index}>{e.sede}</MenuItem>) : 
                  <MenuItem>Cargando opciones</MenuItem>
                }
              </Select>
              {/* <TextField
                fullWidth={true}
                required
                label="Tel??fono"
                value={state.phone}
                name={"phone"}
                onChange={handleChange}
              /> */}
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={state.withPhoto}
                    onChange={handleChange}
                    name="withPhoto"
                    color="primary"
                  />
                }
                label={state.withPhoto ? "Con Foto" : "Sin Foto"}
              />
              {state.withPhoto && (
                <TextField
                  error={state.photo.length > photoUrlMaxLength}
                  fullWidth={true}
                  required
                  label="Subir una foto"
                  value={state.photo}
                  name={"photo"}
                  onChange={handleChange}
                  helperText={
                    state.photo.length > photoUrlMaxLength &&
                    "It's not an image url, but, probably, image in base64 form. Please, choose appropriate data."
                  }
                />
              )} */}
              <br />
              <Button
                disabled={isStateChanged()}
                onClick={clearState}
                color={"secondary"}
              >
                Limpiar Formulario
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{enoughData()}</Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;