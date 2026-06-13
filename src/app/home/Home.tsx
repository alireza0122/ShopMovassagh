import HomeBanner from "@/app/home/home-banner/home-banner";
import HomeService from "@/app/home/home-service/home-service";
import HomeExperience from "@/app/home/home-experience/home-experience";
import HomeMember from "@/app/home/home-member/home-member";
import HomeWorkShowcase from "@/app/home/home-workShowcase/home-work-showcase";


export default function Home() {
    return (
        <>
            <HomeBanner  />
            <HomeService />
            <HomeExperience />
            <HomeMember />
            <HomeWorkShowcase />
            {/*<Newsletter />*/}
        </>
    )
}