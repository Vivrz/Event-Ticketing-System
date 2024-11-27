import React from 'react'
import styles from '../styles/Register.module.css'
const Register = () => {
    const handleClose = () =>{
        window.location.reload();
    }
    const Clickbutton = () =>{
        return alert("Thank you for your interest! You will be notified about upcoming events.");
    }
    return (
        <div className={styles.register}>

            <div className={styles.register_item}>
                <div className={styles.register_input}>

                    <div className={styles.back_home}>
                        <button onClick={handleClose}>Back Home</button>
                    </div>
                    <span>Fill in the form to get notified of events</span>

                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='John doe' />

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='johndoe@gmail.com' />

                    <label htmlFor="">Phone</label>
                    <input type="text" placeholder='+917895244178' />

                    <button onClick = {Clickbutton}>Get notified</button>

                </div>
                <div className={styles.image}>
                    <div className={styles.image_title}>
                        <span>party like there is no tommorow</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register