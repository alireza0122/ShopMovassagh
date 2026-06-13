import React from 'react';
import MemberCart from "@/app/home/home-member/home-member-cart/home-member-cart";
import styles from "./home-member.module.css";


function HomeMember() {

    const MemberDataCart =[
        {
            id:0,
            imgUrl:"/img/mr333.png",
            name:"بهرام",
            job:"برنامه نویس",
        },
          {
            id:1,
            imgUrl:"/img/deneme-3--9416- - Copy.jpg",
            name:"لاله",
            job:"برنامه نویس",
        },
          {
            id:2,
            imgUrl:"/img/kMrij2 - Copy.png",
            name:"مجید",
            job:"برنامه نویس",
        },

    ]




    return (
        <div  className={`${styles['MemberBox']}`}>
            <div className="mt-5 ">

                <h1 className={`fw-bold  ${styles['Title']} text-center`}>
                    اعضــای تــــیم
                </h1>

                <div className="container mt-5">
                    <div className="row">
                            {
                                MemberDataCart.map((item)=> (
                                    <div key={item.id} className="col-12 col-sm-4 mt-3 mt-lg-auto">
                                        <MemberCart imgUrl={item.imgUrl} name={item.name} job={item.job}/>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
            </div>

        </div>
    );
}

export default HomeMember;