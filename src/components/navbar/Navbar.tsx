const Navbar = () => {

    /**
     * todo
     * 1. check if user is logged in
     * 2. change the links to reflect the user's status
     */


    return (
        <nav>
            <h1>Navbar</h1>
            <div>
                <a href="/">Home</a>
                <a href="auth/login">login</a>
                <a href="auth/register">register</a>
                <a href="auth/logout">logout</a>
                <a href="profile">profile</a>
            </div>
        </nav>
    )
}

export default Navbar