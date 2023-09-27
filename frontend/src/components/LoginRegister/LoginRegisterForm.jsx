import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function LoginRegisterForm({onSubmit, onRegister}){
    

    //Handle showing the register form
    const [showRegister, setShowRegister] = useState(false);

    const handleShowRegister = (event) => {
        event.preventDefault();
        setShowRegister(true);
    }


    //Show either the login or register form
    let showRegisterOrLogin = (
    <div>
       <LoginForm onSubmit = {onSubmit}/> 
        <div onClick ={handleShowRegister} id="registerFormLink">I don't have an account yet</div>
    </div>
    )

    if(showRegister === true){
       showRegisterOrLogin = <RegisterForm onRegister = {onRegister} setShowRegister = {setShowRegister}/>
    }
    return(showRegisterOrLogin)
}

export default LoginRegisterForm;