import React, { useState } from 'react'

import { toast, ToastContainer } from 'react-toastify'
import './App.css';
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must Select atleast one option', true)
    }

    let ashucharacterList = ''

    if (includeUppercase) {
      ashucharacterList = ashucharacterList + upperCaseLetters
    }

    if (includeLowercase) {
      ashucharacterList = ashucharacterList + lowerCaseLetters
    }

    if (includeNumbers) {
      ashucharacterList = ashucharacterList + numbers
    }

    if (includeSymbols) {
      ashucharacterList = ashucharacterList + specialCharacters
    }

    setPassword(createPassword(ashucharacterList))
  }
  const createPassword = (ashucharacterList) => {
    let ashupassword = ''
    const ashucharacterListLength = ashucharacterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * ashucharacterListLength)
      ashupassword = ashupassword + ashucharacterList.charAt(characterIndex)
    }
    return ashupassword
  }
  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header"> Password Generator </h2>
          <div className="generator__password">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy__btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              name="password-strength"
              id="password-strength"
              max="24"
              min="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters"> Include Uppercase Letter </label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              name="uppercase-letters"
              id="uppercase-letters"
              max="20"
              min="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Include Lowercase Letter</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              name="lowercase-letters"
              id="lowercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              name="include-numbers"
              id="include-numbers"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              name="include-symbols"
              id="include-symbols"
            />
          </div>

          <button onClick={handleGeneratePassword} className="generator__btn">
            Generate Password
          </button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
