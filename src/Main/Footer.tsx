

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Navigation</h2>
          <ul className="space-y-2">
            <li className="hover:text-white transition">Dashboard</li>
            <li className="hover:text-white transition">Help</li>
            <li className="hover:text-white transition">Support</li>
            <li className="hover:text-white transition">Team</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Resources</h2>
          <ul className="space-y-2">
            <li className="hover:text-white transition">Blogs</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">About</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Account</h2>
          <ul className="space-y-2">
            <li className="hover:text-white transition">Sign Up</li>
            <li className="hover:text-white transition">More</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <p className="text-sm">
            Email: support@femuki.com <br />
            Phone: +254 700 000 000
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Femuki Stores. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
