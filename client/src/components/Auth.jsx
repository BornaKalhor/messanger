import React, {useState} from 'react';
import Cookies from "universal-cookie";
import axios from 'axios';

import signinImage from '../assets/signup.jpg'

const cookies = new Cookies();

const initialState = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}
const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });

        // console.log(form)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {fullName, username, password, phoneNumber, avatarURL} = form;
        const URL = 'http://bkalhor.info:5000/auth';
        const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,
            {
            username, password, fullName, phoneNumber, avatarURL
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);

        }

        window.location.reload();

    };


    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p style={{fontFamily: "B Titr"}}>{isSignup ? 'ثبت نام' : 'ورود'}</p>
                    <form onSubmit={handleSubmit}>

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">نام و نام خانوادگی</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="نام و نام خانوادگی"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        )}

                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">نام کاربری</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="نام کاربری"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">شماره</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="شماره"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        )}

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">آدرس عکس پروفایل</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="آدرس عکس پروفایل"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        )}

                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">رمز عبور</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="رمز عبور"
                                onChange={handleChange}
                                required
                            />
                        </div>


                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">تایید رمزعبور</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="رمز عبور را دوباره وارد کنید"
                                    onChange={handleChange}
                                    required
                                />
                            </div>)
                        }
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "ثبت نام" : "ورود"}</button>
                        </div>
                    </form>

                    <div className="auth__form-container_fields-account"></div>
                    <p>
                        <span onClick={switchMode}>
                            {isSignup ? "ورود" : "ثبت نام"}
                        </span>
                    </p>

                </div>
            </div>

            <div className="auth__form-container_image">
                <img src={signinImage}/>
            </div>

        </div>
    );
}

export default Auth;