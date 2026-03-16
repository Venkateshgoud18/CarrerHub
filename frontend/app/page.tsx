import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">CareerHub</h1>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-24 bg-gradient-to-b from-blue-50 to-white">


        <div className="max-w-xl">

          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Professional Network
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            CareerHub helps professionals connect, share knowledge,
            discover opportunities, and grow their careers together.
          </p>

          <div className="flex gap-4">

            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
  href="/login"
  className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition font-medium"
>
  Login
</Link>

          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          className="w-full max-w-lg mt-10 lg:mt-0 rounded-xl shadow-lg"
          alt="Networking"
        />

      </section>

      <section className="py-20 px-6 bg-white">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Use CareerHub?
          </h2>
          <p className="text-gray-600 mt-2">
            Everything you need to grow your career
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="w-16 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Build Your Profile
            </h3>

            <p className="text-gray-600">
              Showcase your skills, education, and experience to
              stand out to recruiters.
            </p>

          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              className="w-16 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Connect with Professionals
            </h3>

            <p className="text-gray-600">
              Expand your network by connecting with experts,
              classmates and industry leaders.
            </p>

          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/9068/9068752.png"
              className="w-16 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Discover Opportunities
            </h3>

            <p className="text-gray-600">
              Stay updated with opportunities, industry trends,
              and valuable insights.
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
              Thousands of professionals are already using CareerHub to connect,
              share knowledge, and grow their careers. Join us today and be part
              of a thriving community.
            </p>

            <Link
              href="/join"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Join Now
            </Link>

          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Start Growing Your Career Today
        </h2>

        <p className="mb-6 text-blue-100">
          Join thousands of professionals already using CareerHub.
        </p>

        <Link
          href="/register"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Create Free Account
        </Link>

      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 text-gray-400 py-6 text-center text-sm">
        © {new Date().getFullYear()} CareerHub. All rights reserved.
      </footer>

    </div>
  );
}