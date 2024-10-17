import Image from 'next/image';

export default function SchoolFacilities() {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/facility-bg.jpg" // Path to your background image
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-30" // Adjust opacity as needed
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-20">
          <h2 className="md:text-5xl text-4xl text-blue-900 font-bold mb-4">School Facilities</h2>
          <p className="text-gray-700">
            Here is what you can expect from a house cleaning from a Handy professional. 
            <br />
            Download the app to share further cleaning details and instructions.
          </p>
        </div>

        {/* Facilities List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Facility Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/a-1.jpg"
              alt="Active Learning"
              width={576}
              height={509}
              className="w-full h-auto object-cover"
            />
            <div className="p-6 text-center">
              <Image
                src="/facility-icon.png"
                alt="Facility Icon 1"
                width={48}
                height={48}
                className="mx-auto mb-4 bg-green-500 p-2 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2 text-blue-950">Active Learning</h3>
              <p className="text-gray-600">Since have been visionary reliable software engineering partner.</p>
            </div>
          </div>

          {/* Facility Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/b-1.jpg"
              alt="Parents Day"
              width={576}
              height={509}
              className="w-full h-auto object-cover"
            />
            <div className="p-6 text-center">
              <Image
                src="/facility-icon-2-1.png"
                alt="Facility Icon 2"
                width={48}
                height={48}
                className="mx-auto mb-4 bg-orange-500 p-2 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2 text-blue-950">Parents Day</h3>
              <p className="text-gray-600">Since have been visionary reliable software engineering partner.</p>
            </div>
          </div>

          {/* Facility Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/c.jpg"
              alt="Expert Teachers"
              width={576}
              height={509}
              className="w-full h-auto object-cover"
            />
            <div className="p-6 text-center">
              <Image
                src="/facility-icon-3.png"
                alt="Facility Icon 3"
                width={48}
                height={48}
                className="mx-auto mb-4 bg-pink-500 p-2 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2 text-blue-950">Expert Teachers</h3>
              <p className="text-gray-600">Since have been visionary reliable software engineering partner.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
