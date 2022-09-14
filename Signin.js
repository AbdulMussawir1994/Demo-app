import React, { Component } from 'react'
import './Signup.scss'
import TextField from '@mui/material/TextField/TextField';
import Radio from '@mui/material/Radio/Radio';
import { RadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Button from '@mui/material/Button/Button';

export default class SignIn extends Component {
  render() {
    return (
      <div className='Signup-container'>
        <div className='Signup-SubContainer'>
          <div className='Header'>Sign In</div>
          <div className='Body'>
            <form className='form'>
              <TextField id="outlined-basic" className='TextField' label="Username" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='TextField' label="Password" variant="outlined" size='small' />
              <RadioGroup name='Role' className='Roles'>
              <FormControlLabel className='RoleValue' value='Admin' control={<Radio/>} label='Admin'/>
              <FormControlLabel className='RoleValue' value='User' control={<Radio/>} label='User'/>
              </RadioGroup>
            </form>
          </div>
          <div className='Button'>
            <Button color='primary' className='btn'>Create New Account</Button>
            <Button color='primary' className='btn' variant='contained'>Sign In</Button>
          </div>
        </div>
      </div>
    )
  }
}