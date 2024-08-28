import { useEffect, useState } from 'react';
import style from './Register.module.scss'
import { useAuth } from '../../hooks/useAuth';
import { redirect, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState("")
    const auth = useAuth();

    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // check if the password and passwordConfirm match
        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }
        const res = await auth.register(email, username, password);

        // if there is no error, redirect to the login page
        if (await res.success) {
            setError("");
            navigate('/auth/login');
        } else {
            setError(res.message);
        }
    }



    return (
        <section className={style.section_container}>
            <div>
                <h3>Sign up</h3>
                <form onSubmit={handleSubmit} method="post">
                    <label htmlFor="Email">Email: </label>
                    <input type="email" autoComplete='email' name="Email" id="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <label htmlFor="UserCreatedUsername">Username: </label>
                    <input type="text" name="UserCreatedUsername" id="UserCreatedUsername" value={username} onChange={e => setUsername(e.target.value)} />

                    <label htmlFor="Password">Password: </label>
                    <input type="password" name="Password" id="Password" value={password} onChange={e => setPassword(e.target.value)}/>


                    <label htmlFor="PasswordConfirm">Confirm Password: </label>
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