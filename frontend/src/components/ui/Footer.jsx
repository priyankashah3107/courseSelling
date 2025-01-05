import React from 'react';

const Footer = () => {
  // Define an array of objects for each section in the footer
  const footerSections = [
    {
      title: 'About',
      links: [
        { name: 'About Us', url: '/about-us' },
        { name: 'Our Courses', url: '/courses' },
        { name: 'Blog', url: '/blog' },
        { name: 'Contact Us', url: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'FAQ', url: '/faq' },
        { name: 'Terms of Service', url: '/terms' },
        { name: 'Privacy Policy', url: '/privacy' },
        { name: 'Affiliate Program', url: '/affiliate' }
      ]
    },
    {
      title: 'Follow Us',
      links: [
        { name: 'Facebook', url: 'https://facebook.com', external: true },
        { name: 'Twitter', url: 'https://twitter.com', external: true },
        { name: 'Instagram', url: 'https://instagram.com', external: true },
        { name: 'LinkedIn', url: 'https://linkedin.com', external: true }
      ]
    }
  ];

  return (
    <footer className=" text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
          {/* Map through each footer section */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul>
                {/* Map through each link in the section */}
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      target={link.external ? "_blank" : "_self"}
                      className="hover:text-[#33bbcf]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 mb-4 bg-gray-700 text-white rounded"
                required
              />
              <button
                type="submit"
                className="bg-[#33bbcf] text-white py-2 px-4 rounded hover:bg-[#33bbcf]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2025 Your Company Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
