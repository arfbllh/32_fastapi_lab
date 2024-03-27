import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Register.css";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";

const App = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidName(user.length >= 6);
  }, [user]);
  useEffect(() => {
    setValidPwd(pwd.length >= 6);
  }, [user, pwd]);
  useEffect(() => {
    setValidMatch(matchPwd == pwd);
  }, [user, pwd, matchPwd]);
  useEffect(() => {
    setValidEmail(email.includes("@"));
  }, [user, pwd, matchPwd, email]);
  useEffect(() => {
    setValidPhoneNumber(phoneNumber.length == 11);
  }, [user, pwd, matchPwd, email, phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validName ||
      !validPwd ||
      !validEmail ||
      !validMatch ||
      !validPhoneNumber
    ) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        username: user,
        password: pwd,
        email: email,
        phoneNumber: phoneNumber,
      });
      setSuccess(response.data.message);

      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      setPhoneNumber("");
      setErrMsg("");
    } catch (error) {
      console.log(error.response.data);
      setErrMsg(error.response.data.detail);
      setSuccess("");
      //errRef.current.focus();
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            autoComplete="off"
            ref={userRef}
            value={user}
            aria-invalid={validName}
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            required
          />
          {!validName && (
            <p className="errormsg">Username must be at least 6 characters</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            aria-invalid={validPwd}
            value={pwd}
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
          />
          {!validPwd && (
            <p className="errormsg">Password must be at least 6 characters</p>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="off"
            aria-invalid={validMatch}
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            required
          />
          {!validMatch && <p className="errormsg">Passwords do not match</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            aria-invalid={validEmail}
            value={email}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!validEmail && <p className="errormsg">Invalid email address</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            aria-invalid={validPhoneNumber}
            onFocus={() => setPhoneFocus(true)}
            onBlur={() => setPhoneFocus(false)}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {!validPhoneNumber && (
            <p className="errormsg">Phone number must be 11 digits</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
      {errMsg && <p className={errMsg ? "serverError":"hidden"}>{errMsg}</p>}
      {success && <p className={success ? "successmgs" : "hidden"}>{success}</p>}
    </div>
  );
};

export default App;
