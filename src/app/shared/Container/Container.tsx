import React from 'react';




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