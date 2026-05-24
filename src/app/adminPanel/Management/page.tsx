    "use client"

    import React, {useEffect, useState} from 'react';
    import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
    import axios from "axios";
    import styles from "./Management.module.css";


    type Product = {
        id: string;
        title: string;
        price: number;
        qty: number;
        description: string;
        urlImg: string;
    };

    type OrderType = {
        id: number;
        userName: string;
        products: Product[];
    };

    function Page() {

        const [Order, setOrders] = useState<OrderType[]>([]);

        useEffect(() => {

            axios
                .get("/api/orders")
                .then((res) => {
                    setOrders(res.data);
                });

        }, []);

        return (
            <div className="container">

                <h1>سفارش ها</h1>


                <div className="row">
                    <div className="col-2">
                        <AdminPanelSidebar />
                    </div>

                    <div className="col-8">
                        {Order?.map((item) => (

                            <div key={item.id} className={` my-4 border-bottom`}>

                                <h2>
                                    کاربـــر
                                    {item.userName}
                                </h2>

                                {item.products?.map((itemM ,index) => (

                                    <div key={index} className={` ${styles['BoxCart']} my-1`} >
                                        <div className="d-flex  align-items-center justify-content-center">
                                            <img className={styles.img} src={itemM.urlImg} alt="urlImg"/>

                                           <div className="d-flex justify-content-end flex-column align-items-end">
                                               <h4 className={`fw-lighter mx-3 `}>
                                                   {itemM.title}
                                               </h4>

                                           </div>

                                        </div>

                                        <p>
                                            {itemM.price}
                                        </p>
                                        <p>{itemM.description}</p>




                                    </div>

                                ))}
                                <div className={`d-flex justify-content-end `}>
                                    <button className={`w-50 ${styles['BtnSabt']} `}>
                                        تایید سفارش
                                        کـــاربر {item.userName}
                                    </button>
                                </div>
                            </div>

                        ))}

                    </div>

                </div>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }

    export default Page;