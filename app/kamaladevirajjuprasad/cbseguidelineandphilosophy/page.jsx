'use client';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';
import { FaCheckCircle, FaRegLightbulb, FaBook, FaEnvelope } from 'react-icons/fa'; // Icons for visual interest

const CBSEGuidelines = () => {
  return (
    <div>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 pb-20 md:pt-20">
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-6 animate__animated animate__fadeIn">
              CBSE Guideline and Philosophy
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              The Central Board of Secondary Education (CBSE) strives to uphold quality education through a structured accreditation process. Schools seeking accreditation must adhere to the following guidelines.
            </p>
          </div>
        </section>

        <div className="space-y-10">
          <div className="md:px-20">
            {/* List of Guidelines in Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "All schools must regularly visit the CBSE website to stay updated about various policies and schemes, including the latest updates on School Quality Assessment and Accreditation (SQAA).",
                "Schools will have a maximum time-line of three years within which they should apply to the CBSE for School Quality Assessment & Accreditation.",
                "The list of empanelled agencies is available on the CBSE website. Schools should refer to it for the latest updates on agencies being added or blacklisted.",
                "Schools intending to get accredited must ensure they have a website with an ‘Accreditation Corner’.",
                "Schools should upload the 'Mandatory Disclosure Form' on their website before 31st December, 2012.",
                "Schools should update their data and details regularly on the CBSE website.",
                "Schools must form a School Assessment Committee (SAC) with the principal as the head before applying for SQAA.",
                "The decision to undergo SQAA must be approved by the Management Committee.",
                "Fill in and submit the 'Form of Intent' to CBSE to initiate the accreditation process.",
                "Schools can expect confirmation from the allocated agency within two weeks of submitting the Form of Intent.",
                "Schools should fill the online SQAA Instruments after receiving acknowledgment from the CBSE/agency.",
                "Schools with a score of 50 or more will be eligible for a PAT visit for SQAA.",
                "After the visit, schools will receive a 'School Quality Enhancement Report' (SQER) for review and improvement.",
                "A score of 75% or above and at least 50% in each domain will result in CBSE accreditation.",
                "SQAA accreditation is valid for three years and must be renewed before expiration.",
                "For any queries, schools should contact the Section Officer (Accreditation) at cbsesqaa@gmail.com."
              ].map((text, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out"
                >
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-blue-600 text-3xl" />
                    <p className="text-lg text-gray-700">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default CBSEGuidelines;
