import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { CurrentUser } from "../contexts/CurrentUser";

function LoginForm() {
    const history = useHistory();
    const { setCurrentUser } = useContext(CurrentUser);

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        setErrorMessage(null); // Clear error message when user starts typing
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

   
    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:5001/authentication/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
    
            const data = await response.json();
    
        
            if (response.ok) {  
                setCurrentUser(data.user);
                console.log(data.token);
                localStorage.setItem('token', data.token);
                history.push(`/`);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred, please try again');
        }
    }
     

    return (
        <main>
            <h1>Login</h1>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={credentials.email}
                            onChange={handleInputChange}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={credentials.password}
                            onChange={handleInputChange}
                            className="form-control"
                            id="password"
                            name="password"
                        />
                    </div>
                </div>
                <input className="btn btn-primary" type="submit" value="Login" />
            </form>
        </main>
    );
}

export default LoginForm;
