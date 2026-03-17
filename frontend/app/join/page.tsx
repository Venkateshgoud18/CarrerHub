import Link from "next/link";

export default function Join() {
  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            CareerHub
          </h1>
        </Link>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-24 bg-gradient-to-b from-blue-50 to-white">

        <div className="max-w-xl">

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Join the Future of Professional Networking
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Connect with professionals, share knowledge, and discover
            opportunities that help you grow your career.
          </p>

          <Link
            href="/register"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
          >
            Create Your Account
          </Link>

        </div>

        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          className="w-full max-w-lg rounded-xl shadow-lg mt-10 lg:mt-0"
          alt="Networking"
        />

      </section>

      <section className="max-w-6xl mx-auto py-16 grid md:grid-cols-3 gap-10 text-center">

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">10K+</h2>
          <p className="text-gray-600 mt-2">Active Professionals</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">5K+</h2>
          <p className="text-gray-600 mt-2">Career Opportunities</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">20K+</h2>
          <p className="text-gray-600 mt-2">Connections Made</p>
        </div>

      </section>

      {/* Benefits */}
      <section className="py-20 px-10 bg-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="p-6 rounded-xl shadow-sm border text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="w-16 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Build Your Personal Brand
            </h3>

            <p className="text-gray-600">
              Create a powerful profile showcasing your skills and
              achievements.
            </p>

          </div>

          <div className="p-6 rounded-xl shadow-sm border text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              className="w-16 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Grow Your Network
            </h3>

            <p className="text-gray-600">
              Connect with professionals, recruiters, and developers
              across industries.
            </p>

          </div>

          <div className="p-6 rounded-xl shadow-sm border text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/9068/9068752.png"
              className="w-16 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Discover Opportunities
            </h3>

            <p className="text-gray-600">
              Stay updated with job opportunities and career insights.
            </p>

          </div>

        </div>

      </section>

      {/* Community Section */}
      <section className="py-20 px-10 bg-gray-100">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
            className="rounded-xl shadow-lg"
          />

          <div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join a Growing Professional Community
            </h2>

            <p className="text-gray-600 mb-6">
              Thousands of professionals already trust CareerHub
              to connect and grow their careers.
            </p>

            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Join Now
            </Link>

          </div>

        </div>

      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 text-center">

        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          What Professionals Say
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />

            <p className="text-gray-600">
              CareerHub helped me connect with amazing developers and
              land my dream job.
            </p>

            <p className="mt-4 font-semibold">
              Alex — Software Engineer
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />

            <p className="text-gray-600">
              The platform makes networking professional and easy.
            </p>

            <p className="mt-4 font-semibold">
              Sarah — Product Manager
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-blue-600 text-white">

        <h2 className="text-3xl font-bold mb-6">
          Ready to Grow Your Career?
        </h2>

        <Link
          href="/register"
          className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100"
        >
          Create Your Account
        </Link>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} CareerHub
      </footer>

    </div>
  );
}