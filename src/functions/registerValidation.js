import React, { useState, useEffect } from 'react'
import validatePassword from './validatePassword'


const registerValidation = (state, fields, setFieldState) => {
  let emailOK, passwordOK, confirmPasswordOK = null
  console.log('fields' + fields )
  // validateEmail ------------
  if (!validateEmail(state.email)) {
    console.log('email?? NO')
    fields[fields.findIndex(item => item.name === "email")].error = {
      content: 'Invalid email address',
      pointing: 'below',
    }
    setFieldState(fields)
  }
  // validatePassword ------------
  if (!validatePassword(state.password)) {
    fields[fields.findIndex(item => item.name === "password")].error = {
      content: 'Invalid password',
      pointing: 'below',
    }
    setFieldState(fields)
  }
  // Confirm Password ------------
  if (!comparePassword(state.password, state.confirmPassword)) {
    fields[fields.findIndex(item => item.name === "confirmPassword")].error = {
      content: 'Password does not match',
      pointing: 'below',
    }
    setFieldState(fields)
  }

  //hide error
  if (validateEmail(state.email))  {
    delete fields[fields.findIndex(item => item.name === "email")].error //del error 
    setFieldState(fields)
    emailOK = true
  }
  //hide error
  if (validatePassword(state.password)) {
    delete fields[fields.findIndex(item => item.name === "password")].error //del error 
    setFieldState(fields)
    passwordOK = true
  }
  //hide error
  if (comparePassword(state.password, state.confirmPassword)) {
    delete fields[fields.findIndex(item => item.name === "confirmPassword")].error //del error 
    confirmPasswordOK = true
    setFieldState(fields)
  }

  if (emailOK && passwordOK && confirmPasswordOK) return true
  else return false
}

 const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
    }
    return (false)
  }

  const comparePassword = (password, comparePassword) => {
    if ( password === comparePassword ) {
      return true
    }
    else return false
  }

  export default registerValidation