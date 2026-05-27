"use client";

import Link from "next/link";
import Image from "next/image";
import { Briefcase, Code, Camera, MessageSquare, Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide the global Footer on the Admin section
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-[#03050d] pt-20 pb-10 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              {/* Light Theme Logo */}
              <Image 
                src="/logo-light-v2.png"
                alt="Nooraxis Logo" 
                width={240} 
                height={240} 
                className="h-12 w-auto object-contain origin-left dark:hidden"
              />
              {/* Dark Theme Logo */}
              <Image 
                src="/logo-v2.png"
                alt="Nooraxis Logo" 
                width={240} 
                height={240} 
                className="h-12 w-auto object-contain origin-left hidden dark:block"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Empowering Businesses with Modern Technology, Digital Innovation & Creative Solutions.
            </p>
            <div className="text-brand-accent font-medium text-sm">
              Innovate • Create • Elevate
            </div>
            <div className="flex gap-4">
              {[Briefcase, Camera, Code, MessageSquare].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-brand-blue hover:text-white transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Careers', path: '/careers' },
                { name: 'Blog', path: '/blog' },
                { name: 'FAQ', path: '/faq' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-600 dark:text-gray-400 hover:text-brand-accent text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-6">Our Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'Software Solutions', 'Digital Marketing', 'UI/UX Design', 'Branding & Strategy'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-brand-accent text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <MapPin size={18} className="text-brand-accent shrink-0 mt-0.5" />
                <span>Madhopara Islam Nagar Purnia</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <Phone size={18} className="text-brand-accent shrink-0" />
                <span>+91 9508904653</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <Mail size={18} className="text-brand-accent shrink-0" />
                <span>nasiquejahangir000@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Nooraxis Technologies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
            <Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
