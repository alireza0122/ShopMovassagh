import React from 'react';
import Navbar from "@/shared/Navbar/Navbar";




interface LayoutProps {
    children: React.ReactNode;
}




function Container({ children }:LayoutProps) {
    return (
        <div className={`d-flex justify-content-end`}>

            <div className="container-fluid">
                {children}

            </div>

        </div>
    );
}

export default Container;