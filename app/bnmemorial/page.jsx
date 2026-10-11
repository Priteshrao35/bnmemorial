import Navbar        from './homepage/navbar';
import MainSlider    from './homepage/mainslider';
import WelcomeSection from './homepage/welcomesection';
import AboutPage     from './homepage/aboutschool';
import PopularClasses from './homepage/popularclasses';
import LearningEnvernment from './homepage/learningenvernment';
import MeetOurStaff  from './homepage/meetourstaff';
import SchoolFacilities from './homepage/schoolfacilities';
import SchoolGallary from './homepage/schoolgallery';
import Testimonial   from './homepage/testomonials';
import News          from './homepage/letestnews';
import PartnerSection from './homepage/partenercompanys';
import FooterSection from './homepage/footer_section';

export default function BNMemorialHome() {
  return (
    <div>
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
