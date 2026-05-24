"use client"
import React from 'react';
import AdminPanelBanner from "@/app/adminPanel/adminPanel-banner/adminPanel-banner";
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";

function adminPanel() {



    return (
        <div>


            <AdminPanelSidebar />
            <AdminPanelBanner />
        </div>
    );
}

export default adminPanel;