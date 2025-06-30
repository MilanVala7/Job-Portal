import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-[#f8f9ff] border-t border-gray-200 text-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
        >
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="JobifyX" className="h-10" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Discover top jobs, connect with companies, and take the next step in your career.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, type: "spring" }}
        >
          <h4 className="text-md font-semibold mb-3 text-[#6A38C2]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-indigo-600">Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-indigo-600">Browse</Link></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <h4 className="text-md font-semibold mb-3 text-[#6A38C2]">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              support@jobifyx.com
            </li>
            <li>Ahmedabad, India</li>
            <li>Mon - Sat: 10AM - 6PM</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5, type: "spring" }}
        >
          <h4 className="text-md font-semibold mb-3 text-[#6A38C2]">Follow Us</h4>
          <div className="flex items-center gap-4">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600"
              whileHover={{ scale: 1.2, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600"
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600"
              whileHover={{ scale: 1.2, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white border-t text-center text-sm py-4 text-gray-500"
      >
        © {new Date().getFullYear()} JobifyX. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
