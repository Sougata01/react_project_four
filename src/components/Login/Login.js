import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT_EMAIL") {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === "INPUT_BLUR_EMAIL") {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === "INPUT_BLUR_PASSWORD") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredcollegeName, setEnteredCollegeName] = useState('');
  const [collegeNameIsValid, setcollegeNameIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);    

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("checking")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollegeName.trim().length > 0
  //     );
  //   }, 500);
  //   return (() => {
  //     clearTimeout(identifier)
  //     console.log("clearing")
  //   })
  // }, [enteredEmail, enteredPassword, enteredcollegeName])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT_EMAIL", val: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && enteredcollegeName.trim().length > 0
    )
  };

  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);

    setFormIsValid(
      emailState.isValid && passwordState.isValid && enteredcollegeName.trim().length > 0
    )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT_PASSWORD", val: event.target.value })

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && enteredcollegeName.trim().length > 0
    )
    console.log(formIsValid)
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR_EMAIL" })
  };

  const validateCollegeNamelHandler = () => {
    setcollegeNameIsValid(enteredcollegeName.trim().length > 0);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR_PASSWORD" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.isValid, passwordState.isValid);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${collegeNameIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="college_name">College Name</label>
          <input
            type="text"
            id="college_name"
            value={enteredcollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNamelHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;