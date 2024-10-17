import AboutPage from "./homepage/aboutschool";
import FooterSection from "./homepage/footer_section";
import Header from "./homepage/header_section";
import LearningEnvernment from "./homepage/learningenvernment";
import News from "./homepage/letestnews";
import MainSlider from "./homepage/mainslider";
import MeetOurStaff from "./homepage/meetourstaff";
import Navbar from "./homepage/navbar";
import PartnerSection from "./homepage/partenercompanys";
import PopularClasses from "./homepage/popularclasses";
import SchoolFacilities from "./homepage/schoolfacilities";
import SchoolGallary from "./homepage/schoolgallery";
import Testimonial from "./homepage/testomonials";
import WelcomeSection from "./homepage/welcomesection";


export default function Home() {
  return (
    <div>
        <Header />
        <Navbar />
        <MainSlider />

        <WelcomeSection />
        <AboutPage />
        <PopularClasses />
        <LearningEnvernment />
        <MeetOurStaff />
        <SchoolFacilities />
        <SchoolGallary />
        <Testimonial />
        <News />
        <PartnerSection />

        <FooterSection />
    </div>
  );
}
