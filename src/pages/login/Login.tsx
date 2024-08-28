import { useState } from 'react';
import style from './Login.module.scss';
import { redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")

    const auth = useAuth();
    const navigation = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call the login API
        const res = await auth.login(email, password);

        if (res.success) {
            setError("");
            navigation('/');
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

                    <label htmlFor="Password">Password: </label>
                    <input type="password" name="Password" id="Password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <span>Don't have an account? <a href="/auth/register">Sign up here</a></span>
                    <span>{error}</span>
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    )

}




export default Login;