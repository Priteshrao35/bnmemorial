import BNMAkarePage from "./kamaladevirajjuprasad/akare";
import ClassTopper from "./kamaladevirajjuprasad/classtopper";
import ContactAndMapsPage from "./kamaladevirajjuprasad/mapcomponent";
import FooterSections from "./kamaladevirajjuprasad/footersections";
import Header_section from "./kamaladevirajjuprasad/headersection";
import MainSlider from "./kamaladevirajjuprasad/mainslider";
import ManagementTeam from "./kamaladevirajjuprasad/managementteam";
import Navbar from "./kamaladevirajjuprasad/navigationbar";
import Noticeboard from "./kamaladevirajjuprasad/noticeboard";
import Curriculum from "./kamaladevirajjuprasad/ourcurriculum";
import OurFacilities from "./kamaladevirajjuprasad/ourfacilities";
import WhyWeAreDifferentPage from "./kamaladevirajjuprasad/whywedredifferent";

export default function Home() {
  return (
    <div>
      <Header_section />
      <Navbar />
      <MainSlider />
      <Noticeboard />
      <ClassTopper />
      <Curriculum />
      <OurFacilities />
      <ManagementTeam />
      <BNMAkarePage />
      <WhyWeAreDifferentPage />
      <ContactAndMapsPage />
      <FooterSections />
    </div>
  );
}
