import { Link } from "react-router-dom";
import { 
  Flame, 
  MessageCircle, 
  Send, 
  Mail, 
  Shield, 
  Heart,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "DMCA", href: "mailto:dmca@xnyxleaks.com" }
      ]
    },
    {
      title: "Community",
      links: [
        { label: "Discord", href: "https://discord.gg/SAPZmTTeuN", icon: MessageCircle },
        { label: "Telegram", href: "https://t.me/+u0Qu9SkPd8EyMzcx", icon: Send },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "https://discord.gg/SAPZmTTeuN" },
        { label: "Contact Us", href: "mailto:contact@xnyxleaks.com" },
        { label: "Report Issue", href: "https://discord.gg/SAPZmTTeuN" },
        { label: "Feedback", href: "https://discord.gg/SAPZmTTeuN" }
      ]
    }
  ];

  return (
    <footer className={`${
      theme === "dark" 
        ? "bg-gray-900 text-gray-300 border-gray-800" 
        : "bg-white text-gray-800 border-gray-100"
    } border-t`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block group">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
               
                <span className={`ml-2 text-2xl font-black bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-emerald-400 via-teal-300 to-emerald-400"
                    : "from-emerald-600 via-teal-500 to-emerald-600"
                } bg-clip-text text-transparent`}>
                  XNYXLEAKS
                </span>
              </motion.div>
            </Link>
            <p className={`mt-4 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Your trusted source for the latest content and exclusive releases. Join our community and stay updated with premium features.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className={`text-sm font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-900"
              } uppercase tracking-wider`}>
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.div whileHover={{ x: 3 }}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`flex items-center text-sm ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-emerald-400"
                            : "text-gray-600 hover:text-emerald-600"
                        } transition-colors duration-200`}
                      >
                    
                        {link.label}
                        {link.href.startsWith('http') && (
                          <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                        )}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${
        theme === "dark" ? "border-gray-800" : "border-gray-100"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              © {currentYear} XNYXLEAKS. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:contact@xnyxleaks.com"
                className={`text-sm hover:underline ${
                  theme === "dark" 
                    ? "text-emerald-400 hover:text-emerald-300" 
                    : "text-emerald-600 hover:text-emerald-700"
                }`}
              >
                contact@xnyxleaks.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;