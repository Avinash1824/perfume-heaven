import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8" id="Footer">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo & Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Perfume Haven</h2>
            <p className="text-sm mt-2">Exquisite Scents for Every Occasion</p>
          </div>

          {/* Contact Info */}
          <div className="mb-6 md:mb-0">
            <p className="text-sm">
              📍 <span className="font-semibold">Address:</span> 123 Fragrance
              St, Scent City, SC 45678
            </p>
            <p className="text-sm">
              📞 <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-sm">
              ✉️ <span className="font-semibold">Email:</span>{" "}
              contact@perfumehaven.com
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Perfume Haven. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
