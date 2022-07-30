import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../style.css';
import axios from 'axios';
const Signup = () => {

const navigate = useNavigate();

const [userData, setUserData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        pasword:""
});

const [error,setError] = useState("");
const handleFormChange = ({currenTarget : input}) => {
    setUserData({...userData, [input.name]: input.value});
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const url = "http://localhost:8080/api/users";
        const {data:res} = await axios.post(url,userData);
        navigate("/login");
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
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.right}>
                    <h3>Welcome to React</h3>
                    <Link to='/login'>
                        <button type='button' className={styles.btn_white}>
                            Sign up
                        </button>
                    </Link>
                </div>
                <div className={styles.left}>
                    <form onSubmit={handleSubmit} className={styles.form_container}>
                        <h2>Create Account</h2>
                        <input type='text'
                            name="firstname"
                            placeholder="First Name"
                            onChange={handleFormChange}
                            value={userData.firstName}
                            required
                            className={styles.input} 
                        />
                         <input type='text'
                            name="lastname"
                            placeholder="Last Name"
                            onChange={handleFormChange}
                            value={userData.lastName}
                            required
                            className={styles.input} 
                        />
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
                            Sign Up
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Signup;