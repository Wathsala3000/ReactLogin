import { Link} from 'react-router-dom';
import { useState } from 'react';
import styles from '../style.css';
import axios from 'axios';

const Signin = () => {
    
    const [userData, setUserData] = useState({
        email:"",
        pasword:""
    });

    const [error,setError] = useState("");
    const handleFormChange = ({event}) => {
    setUserData({...userData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8080/api/auth";
            const {data:res} = await axios.post(url,userData);
            localStorage.setItem('token',res.data);
            window.location("/");
            console.Console.log(res.message);
        }catch(error){
            if(error.response && 
            error.response.status >= 400 && 
            error.respons.status <= 500 ){
                setError(error.response.data.message);
            }
        }
    }

    return(
             <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.right}>
                    <h3>Welcome to React</h3>
                    <Link to='/logn'>
                        <button type='button' className={styles.btn_white}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.left}>
                    <form onSubmit={handleSubmit} className={styles.form_container}>
                        <h2>Sign in here</h2>
                         <input type='email'
                            name="email"
                            placeholder="Email"
                            onChange={handleFormChange}
                            value={userData.email}
                            required
                            className={styles.input} 
                        />
                         <input type='password'
                            name="password"
                            placeholder="Password"
                            onChange={handleFormChange}
                            value={userData.password}
                            required
                            className={styles.input} 
                        />
                        {error && <div className={styles.error_message}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>
                            Sign in
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Signin;