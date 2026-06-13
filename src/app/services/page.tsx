import React from 'react';
import ServicesBanner from "@/app/services/services-banner/services-banner";
import HomeService from "@/app/home/home-service/home-service";

function services() {
    return (
        <div>
            <ServicesBanner />
            <div className="my-5">
                <HomeService />
            </div>
        </div>
    );
}

export default services;