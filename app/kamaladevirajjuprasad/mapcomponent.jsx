'use client';
import React from 'react';

const ContactAndMapsPage = () => {
  return (
    <div className="md:p-5 p-2 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Full Width Map Section */}
        <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Statue%20of%20Liberty&t=&z=13&ie=UTF8&iwloc=&output=svembed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactAndMapsPage;
