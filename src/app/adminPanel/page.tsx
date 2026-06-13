"use client"
import React from 'react';
import AdminPanelBanner from "@/app/adminPanel/adminPanel-banner/adminPanel-banner";
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import AdminWelcome from "@/app/adminPanel/adminPanel-banner/adminPanel-banner";

function adminPanel() {


    return (
        <div className={``}>
                  <AdminPanelSidebar/>

                    <AdminWelcome/>




        </div>
    );
}

export default adminPanel;