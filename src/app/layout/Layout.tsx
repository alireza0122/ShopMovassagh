import React from 'react';
import "@/styles/styles.scss";
import InitialLoading from "../../../Loading/Loading";
import Navbar from "@/app/shared/Navbar/Navbar";
import Footer from "@/app/shared/Footer/Footer";


interface LayoutProps {
    children: React.ReactNode;
}


function Layout({ children }:LayoutProps) {
    return (

        <div>
            <InitialLoading>
                <Navbar/>

                <main>
                    {children}
                </main>

                <Footer />
            </InitialLoading>

        </div>
    );
}

export default Layout;