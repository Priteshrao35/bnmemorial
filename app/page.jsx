import Navbar            from './kamaladevirajjuprasad/navigationbar';
import MainSlider         from './kamaladevirajjuprasad/mainslider';
import Noticeboard        from './kamaladevirajjuprasad/noticeboard';
import ClassTopper        from './kamaladevirajjuprasad/classtopper';
import Curriculum         from './kamaladevirajjuprasad/ourcurriculum';
import OurFacilities      from './kamaladevirajjuprasad/ourfacilities';
import ManagementTeam     from './kamaladevirajjuprasad/managementteam';
import OurTeam            from './kamaladevirajjuprasad/ourteam';
import FooterSections     from './kamaladevirajjuprasad/footersections';
import QuickActions       from './kamaladevirajjuprasad/quickactions';
import SchoolSections     from './kamaladevirajjuprasad/schoolsections';
import StatsSection       from './kamaladevirajjuprasad/statssection';
import EventsSection      from './kamaladevirajjuprasad/eventssection';
import AchievementsSection from './kamaladevirajjuprasad/achievementssection';
import GallerySection     from './kamaladevirajjuprasad/gallerysection';
import WhyDifferent       from './kamaladevirajjuprasad/whydifferent';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <MainSlider />          {/* 1. Hero banner */}
      <QuickActions />        {/* 2. Quick links — fee, admission, results */}
      <SchoolSections />      {/* 3. What we offer (brief overview) */}
      <StatsSection />        {/* 4. Numbers that build trust */}
      <Noticeboard />         {/* 5. Latest notices + About us */}
      <EventsSection />       {/* 6. Upcoming events (follows notices naturally) */}
      <ClassTopper />         {/* 7. Academic excellence showcase */}
      <Curriculum />          {/* 8. Academic programs */}
      <OurFacilities />       {/* 9. Infrastructure */}
      <AchievementsSection /> {/* 10. Recognitions & awards */}
      <GallerySection />      {/* 11. Visual showcase */}
      <ManagementTeam />      {/* 12. Leadership */}
      <OurTeam />             {/* 13. Faculty */}
      <WhyDifferent />        {/* 14. Final convincer before footer */}
      <FooterSections />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
