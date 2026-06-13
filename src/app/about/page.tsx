import React from 'react';
import AboutBanner from "@/app/about/about-banner/about-banner";
import AboutWork from "@/app/about/about-work/about-work";
import HomeExperience from "@/app/home/home-experience/home-experience";

function About() {
    return (
        <div>
            <AboutBanner />
            <AboutWork />
            <HomeExperience />
        </div>
    );
}

export default About;