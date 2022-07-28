import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './style.css';
import axios from 'axios';
const Signup = () => {

const navigate = useNavigate();

const [userdata, setUserData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        pasword:""
});

const [error,setError] = useState("");
const handelChange = ({currenTarget : input}) => {
    setUserData({...data, [input.name]: input.value});
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const url = "http://localhost:8080/api/users";
        const {data:res} = await axios.post(url,userdata);
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
        <div className={style.Signup_container}>
            <div className={style.signup_for_container}>
                <div className={style.right}>
                    <h3>Welcome to React</h3>
                    <Link to='/logn'>
                        <button type='button' className={style.btn_white}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={style.left}>
                    <form action={handleSubmit} className={style.form_container}>
                        <h2>Create Account</h2>
                        <input type='text'
                            name="firstname"
                            placeholder="First Name"
                            onChange={handleFormChange}
                            value={data.firstName}
                            required
                            className={style.input} 
                        />
                         <input type='text'
                            name="lastname"
                            placeholder="Last Name"
                            onChange={handleFormChange}
                            value={data.lastName}
                            required
                            className={style.input} 
                        />
                         <input type='email'
                            name="email"
                            placeholder="Email"
                            onChange={handleFormChange}
                            value={data.email}
                            required
                            className={style.input} 
                        />
                         <input type='password'
                            name="password"
                            placeholder="Password"
                            onChange={handleFormChange}
                            value={data.password}
                            required
                            className={style.input} 
                        />
                        {error && <div className={style.error_message}>{error}</div>}
                        <button type='submit' className={style.green_btn}>
                            Sign Up
                        </button>


                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Signup;