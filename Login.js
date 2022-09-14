import React, { useState } from "react";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button/Button';
import Authentication from '../Authentication';
import { useNavigate } from 'react-router-dom';
import '../components/Sign.scss'
import Snackbar from '@mui/material/Snackbar/Snackbar';
import IconButton from '@mui/material/IconButton/IconButton';
import CloseIcon from '@mui/material/Icon';

export default function Login() {
  const { http, setToken } = Authentication();
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const [message, SetMessage] = React.useState('');
  const [userNameFlag, setUserNameFlag] = React.useState(false);
  const [passwordFlag, setpasswordFlag] = React.useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const Checkvalidity = () => {
    console.log('Checkvalidity calling...')
    setUserNameFlag(false);
    setpasswordFlag(false);

    if (formValues.username === '') {
      setUserNameFlag(true);
    }

    if (formValues.password === '') {
      setpasswordFlag(true);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    Checkvalidity();
    if (formValues.username !== '' && formValues.password !== '') {
      http.post('/SignIn', { username: formValues.username, password: formValues.password }).then((res) => {
        if (res.data.isSuccess) {
          console.log(res.data.data, res.data.token)
          setOpen(true);
          SetMessage(res.data.message)
          setToken(res.data.data, res.data.token);
          navigate('/')
        } else {
          console.log('Something Went Wrong')
          setOpen(true);
          SetMessage(res.data.message)
        }
      }).catch((error) => {
        console.log('Error : ', error)
        setOpen(true);
        SetMessage("Something Wrong")
      })
    }
    else {
      console.log('Not Acceptable')
      // this.setState({ open: true, Message: 'Please Field Mandetory Field' })
    }
  };

  return (
    <div className='background-image'>
      <div className="S-Container">
        <div className="S-SubContainer">
          <div className="Header">Welcome to Out Origin</div>
          <div className="Body">
            <form className="form" method='POST' onSubmit={handleSubmit}>

              <p>{formErrors.username}</p>
              <div className="inputbox">
                <TextField
                  error={userNameFlag}
                  //required
                  id="outlined-required"
                  label="Username"
                  className="TextField"
                  name="username"
                  placeholder="Enter Username"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                  sx={{ input: { color: 'white', fontWeight: `Bold`, fontFamily: `Calisto MT` }, label: { color: `white` }, placeholder: { color: `white`, fontWeight: `Bold`, fontFamily: `Calisto MT` } }}
                  value={formValues.username}
                />
              </div>

              <p style={{ color: `red` }}>{formErrors.password}</p>
              <div>
                <TextField
                  error={passwordFlag}
                  //required
                  id="outlined-required"
                  label="Password"
                  className="TextField"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  sx={{ input: { color: 'white', fontWeight: `Bold`, fontFamily: `Calisto MT` }, label: { color: `white` } }}
                  value={formValues.password}
                />
              </div>

              <div className="Btn" style={{ alignItems: 'flex-start' }}>
                <Button variant="contained" className="login" type='submit'>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="Button" style={{ alignItems: 'flex-start' }}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={handleClose}>
                  UNDO
                </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </div>
    </div>
  )
}