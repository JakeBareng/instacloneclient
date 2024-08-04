import { useState } from 'react';
import style from './Register.module.scss'

const Register = () => {
    style;

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState('')


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // todo validation
        // todo send request to server
        // todo handle response
        // set error if there is one
        // redirect to login page if successful
    }



    return (
        <section>
            <div className='container'>
                <h3>Sign up</h3>
                <form onSubmit={handleSubmit} method="post">
                    <label htmlFor="Email">Email: </label>
                    <input type="email" name="Email" id="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <label htmlFor="UserCreatedusername">Username: </label>
                    <input type="text" name="UserCreatedUsername" id="UserCreatedUsername" value={username} onChange={e => setUsername(e.target.value)} />

                    <label htmlFor="Password">Password: </label>
                    <input type="password" name="Password" id="Password" value={password} onChange={e => setPassword(e.target.value)}/>


                    <label htmlFor="ConfirmPassword">Confirm Password: </label>
                    <input type="password" name="PasswordConfirm" id="PasswordConfirm" value={passwordConfirm} onChange={e=>setPasswordConfirm(e.target.value)} />

                    <span>Already have an account? <a href="/auth/login">Log in</a></span>
                    <span>{error}</span>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </section>
    )
}

export default Register