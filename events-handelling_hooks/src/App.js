import React, {useState} from 'react';
import "./App.css";

const App = () => {
    const [ username, setUsername] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(true)

    return (
        <div className="container">

            <input
                type="text"
                placeholder="Username"
                value={ username }
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
            />

            <input
                type={showPassword ? 'password' : "text"}
                placeholder="Password"
                value={ password }
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />

            <h2>{ username }</h2>
            <h2>{ showPassword ? '*'.repeat(password.length) : password }</h2>

            <button onClick={(e) => { setShowPassword(!showPassword) }}>
                Show/Hide password
            </button>

        </div>
    )
}





export default App;
