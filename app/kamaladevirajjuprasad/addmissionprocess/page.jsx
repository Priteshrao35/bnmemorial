import React from 'react';
import FooterSection from '../footersections';
import Header from '../headersection';
import Navbar from '../navigationbar';

function AdmissionProcess() {
    return (
        <section className="">
            <Header />
            <Navbar />
            <div className="container mx-auto md:px-40  bg-gradient-to-b from-gray-100 to-white py-10 md:pt-32 ">
                <div className="text-left mb-6">
                    <h1 className="text-2xl font-bold text-blue-900">Admission Process & Fee Structure</h1>
                </div>
                <p className="text-justify text-black mb-4">
                    At Kamala Devi Raju Prasad Inter College, we have a streamlined admission process to ensure a smooth experience for students and parents. The process starts with an inquiry, followed by a dedicated admission counselor who guides you through each step, including filling out the Admission Form. Students may need to appear for an entrance test, depending on the grade of admission. After successfully clearing the test, there is a meeting with the Principal to discuss the school’s mission and vision. Following this, document submission and fee payment formalities are completed. A fee receipt and admission confirmation mark the successful enrollment of the student.
                </p>
                <p className="text-justify text-black mb-6">
                    Begin your journey with us by accessing the <a href="https://kamaladevi.example.com/registration" className="text-blue-500">Registration Form</a> for the upcoming session.
                </p>
                <div className="text-left mb-4">
                    <h2 className="text-xl font-semibold text-blue-900">Fee Structure</h2>
                </div>
                <p className="text-justify text-black mb-4">
                    Below are the terms and conditions of the Kamala Devi Raju Prasad Inter College <a href="fee-structure.php" className="text-blue-500">Fee Structure</a> for the Academic Session 2025-2026, along with a detailed table:
                </p>
                <ul className="list-disc ml-6 text-black space-y-2 mb-6">
                    <li>The cost of prospectus and application form is Rs. 500/-</li>
                    <li>The school provides a list of required uniforms, textbooks, and materials, which can be purchased locally.</li>
                    <li><a href="https://kamaladevi.example.com/transport" className="text-blue-500">Transport facility</a> is optional and charged based on location.</li>
                    <li>Fees are non-refundable under any circumstances.</li>
                    <li>Sibling discounts are available, with a 10% concession on the younger sibling’s tuition fees.</li>
                    <li>Special concessions are available for single girl children, with a 50% reduction in admission fees.</li>
                    <li>The fee structure is subject to change at the discretion of the management.</li>
                    <li>Payments can be made via cash, online transfer, or demand draft. Please include the student’s name and application number in correspondence.</li>
                </ul>
                <div className="overflow-x-auto mb-6">
                    <table className="table-auto w-full border border-gray-300 text-sm text-left">
                        <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="px-4 py-2">Grades</th>
                                <th className="px-4 py-2">Nursery KG-1 KG-2</th>
                                <th className="px-4 py-2">Grade I</th>
                                <th className="px-4 py-2">Grade II</th>
                                <th className="px-4 py-2">Grade III</th>
                                <th className="px-4 py-2">Grade IV</th>
                                <th className="px-4 py-2">Grade V</th>
                                <th className="px-4 py-2">Grade VI</th>
                                <th className="px-4 py-2">Grade VII</th>
                                <th className="px-4 py-2">Grade VIII</th>
                                <th className="px-4 py-2">Grade IX</th>
                                <th className="px-4 py-2">Grade X</th>
                                <th className="px-4 py-2">Grade XI</th>
                                <th className="px-4 py-2">Grade XII</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 text-black">Admission Fee* (One Time)</td>
                                {[...Array(12)].map((_, i) => (
                                    <td key={i} className="border px-4 py-2 text-black">20,000</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-black">Composite Fee</td>
                                {"4000 4200 4400 4600 4800 5000 5200 5400 5600 5800 6000 6200".split(" ").map((fee, i) => (
                                    <td key={i} className="border px-4 py-2 text-black">{fee}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-black">Lab and practical fee Rs. 1500/- extra for students opting for practical subjects</p>
            </div>
            <FooterSection />

        </section>
    );
}

export default AdmissionProcess;
