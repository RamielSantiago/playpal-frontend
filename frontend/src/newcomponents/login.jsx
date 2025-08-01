import './Login.css';
import {FaEnvelope} from 'react-icons/fa';

function Login() {
    return (
        <div className='login-background'>
            <div className = "login-container">
                <div className ="company-section">
                    <img src="/playpal-logo.svg" alt="PlayPal Logo"/>
                    <p className= "logo-text">Find Your Fit. Play with Pals</p>
                </div>
                <div className = "form-area">
                    <div className = "login-form">
                        <h2>Log In</h2>
                        <p>
                        Log in with your DLSU Google account to proceed with 
                        your access to PlayPal.
                        </p>
                            <button className="google-login-button">
                                <FaEnvelope size="1.5em" className='mailicon'/>
                                Log In with DLSU Google Account
                            </button>
                        <p>
                            By continuing, you agree to follow the guidelines outlined in the <a href="https://www.dlsu.edu.ph/wp-content/uploads/pdf/osa/student-handbook.pdf">DLSU Student Handbook</a> and Privacy Policy of PlayPal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;