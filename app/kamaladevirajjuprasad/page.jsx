import Navbar         from './navigationbar';
import MainSlider     from './mainslider';
import NoticBoard     from './noticeboard';
import ManagementTeam from './managementteam';
import ClassTopper    from './classtopper';
import OurCurriculum  from './ourcurriculum';
import OurFacilities  from './ourfacilities';
import OurTeam        from './ourteam';
import FooterSections from './footersections';

export default function KamalaDeviHome() {
  return (
    <div>
      <Navbar />
      <MainSlider />
      <NoticBoard />
      <ManagementTeam />
      <ClassTopper />
      <OurCurriculum />
      <OurFacilities />
      <OurTeam />
      <FooterSections />
    </div>
  );
}
