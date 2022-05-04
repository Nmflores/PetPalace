import React from 'react';

export default class Login extends React.Component {
  state = {
    formExtraction: []
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <form
          action="POST"
        >
            <input
                type="text"
                name="username"
                placeholder="Username ou Email"
                className="usernameInput"
            />

            <input
                type="password"
                name="Password"
                placeholder="Password"
                className="passwordInput"
            />
            <button
              type="submit"
            >Entrar</button>
        </form>
      </div>
    
    )
  }
}