import React from 'react';
import styles from '../Newsletter/Newsletter.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

function Newsletter() {
    return (
        <div className={`text-center py-5 ${styles['Newsletter']}`}>

            <h1 className={`text-white`}>در خبرنامه ما عضو شوید و کد تخفیف را دریافت کنید.</h1>
            <p className={`text-color`}>
                تمام اطلاعات شما کاملاً محرمانه است
            </p>
            <div className="position-relative d-flex justify-content-center m-auto w-fit">
                <input placeholder="ایمیل خود را وارد کنید ..." className={`w-100 ${styles['inpNewsletter']}`} type="email"/>
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        className={`d-flex text-white ${styles.iconEmail}`}
                    />
            </div>

</div>
)
    ;
}

export default Newsletter;