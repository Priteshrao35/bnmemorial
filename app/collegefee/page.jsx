import React from 'react';
import FooterSection from '../kamaladevirajjuprasad/footersections';
import Header from '../kamaladevirajjuprasad/headersection';
import Navbar from '../kamaladevirajjuprasad/navigationbar';

function CollegeFree() {
  return (
    <div>
      <Header />
      <Navbar />
    <div className="bg-gradient-animation flex flex-col items-center justify-center min-h-screen p-5">
      <style>{`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .bg-gradient-animation {
            background: linear-gradient(270deg, #ff7e5f, #3b82f6);
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
          }
        `}</style>

      <h2 className="text-3xl font-bold text-white text-center mb-6">Search for the Student</h2>
      <form className="w-full max-w-xl"> {/* Set max width */}
        {/* Student Admission Number */}
        <div className="mb-4">
          <label htmlFor="adm-no" className="block text-sm font-medium text-white mb-1">
            Student Adm. No.:
          </label>
          <input
            type="text"
            id="adm-no"
            className="w-full px-3 py-1.5 border rounded-md" // Decreased padding
            placeholder="Enter Admission Number"
            required
          />
        </div>

        {/* Student Name */}
        <div className="mb-4">
          <label htmlFor="student-name" className="block text-sm font-medium text-white mb-1">
            Student Name (First three characters):
          </label>
          <input
            type="text"
            id="student-name"
            className="w-full px-3 py-1.5 border rounded-md" // Decreased padding
            placeholder="Enter First 3 Characters"
            required
          />
        </div>

        {/* Session */}
        <div className="mb-4">
          <label htmlFor="session" className="block text-sm font-medium text-white mb-1">
            Session (For New Adm., Select 24-25):
          </label>
          <select id="session" className="w-full px-3 py-1.5 border rounded-md" required>
            <option value="">2024-2025</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {/* Transaction Charges */}
      <div className="mt-6 text-white">
        <h3 className="text-lg font-bold">Transaction Charges</h3>
        <ul className="list-disc list-inside pl-5">
          <li>Credit Cards (Visa / Mastercard - Domestic): 1.10% Per Transaction</li>
          <li>Debit Cards (Domestic): Nil</li>
          <li>All Net Bankings: Rs.10 Per Transaction (Excluding ICICI, HDFC, AXIS & SBI @ Rs.17 / Transaction)</li>
          <li>Note: GST / Any other Government charges applicable.</li>
          <li>FEE ONCE PAID IS NOT REFUNDABLE IN ANY CASE.</li>
        </ul>
      </div>

      {/* Policy Links */}
      <div className="mt-6">
        <p className="text-blue-800 text-2xl">
          <a href="#terms" className="underline">Terms & Conditions</a> | 
          <a href="#refund" className="underline"> Refund Policy</a> | 
          <a href="#privacy" className="underline"> Privacy Policy</a>
        </p>
      </div>
    </div>
    <FooterSection />
    </div>
  );
}

export default CollegeFree;
