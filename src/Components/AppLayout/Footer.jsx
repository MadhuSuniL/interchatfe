import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-8 text-center">
      <p className="text-sm">
        Copyright &copy; {new Date().getFullYear()} Travelmates. All rights reserved.
      </p>
      <ul className="flex justify-center mt-4 space-x-4">
        <li>
          <a href="#" className="text-gray-300 hover:text-gray-100">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-gray-100">
            Privacy Policy
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
