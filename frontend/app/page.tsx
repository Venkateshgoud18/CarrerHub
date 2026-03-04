import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Build Your Professional Network
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          CareerHub helps professionals connect, share knowledge, discover
          opportunities, and grow their careers together in one place.
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
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Build Your Profile
            </h3>
            <p className="text-gray-600">
              Create a professional profile showcasing your skills, education,
              and achievements to stand out to recruiters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Connect with Professionals
            </h3>
            <p className="text-gray-600">
              Expand your network by connecting with industry experts,
              classmates, and potential employers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Discover Opportunities
            </h3>
            <p className="text-gray-600">
              Explore career opportunities, share insights, and stay updated
              with the latest industry trends.
            </p>
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