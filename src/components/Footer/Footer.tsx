import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import Link from "next/link";
// import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import backgroundImage from '@/assets/giftfileall/footer.gif'

const Footer = () => {
  return (
    <footer className="w-full relative text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      {/* Dark overlay — same as before */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 to-black/60" />

      {/* Top section with border bottom */}
      <div className="relative z-10 xl:container mx-auto px-6 pt-10 pb-8 border-b border-white/10 grid grid-cols-2  md:grid-cols-5">

        {/* Brand / Logo */}
        <div className="">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-semibold">
              <Image src={logo} alt="Pioneerx logo" />
            </div>
            <span className="font-bold text-white text-xl">Pioneerx</span>
          </Link>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed ">
             The Entrepreneurial Operating System (EOS) is a comprehensive framework designed to help entrepreneurs  strengthen six key components
             <span className="hidden xl:block">
               key components—Vision, People, Data, Issues, Process, and Traction—to gain control, focus, and growth
             </span>
          </p>
        </div>

        {/* Product */}
        <div className="flex justify-end ">
          <div>
            <h3 className="font-medium text-white text-sm mb-4">Product</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/features" className="hover:text-gray-200">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-gray-200">Pricing</Link></li>
            <li><Link href="/changelog" className="hover:text-gray-200">Changelog</Link></li>
            <li><Link href="/roadmap" className="hover:text-gray-200">Roadmap</Link></li>
          </ul>
          </div>
        </div>

        {/* Modules */}
        <div className="flex md:justify-end justify-start mt-5 md:mt-0 ">
          <div>
            <h3 className="font-medium text-white text-sm mb-4 ">Modules</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/modules/branding" className="hover:text-gray-200">Branding</Link></li>
            <li><Link href="/modules/marketing" className="hover:text-gray-200">Marketing</Link></li>
            <li><Link href="/modules/sales" className="hover:text-gray-200">Sales</Link></li>
            <li><Link href="/modules/finance" className="hover:text-gray-200">Finance</Link></li>
          </ul>
          </div>
        </div>

        {/* Resources */}
        <div className="flex justify-end  mt-5 md:mt-0">
          <div>
            <h3 className="font-medium text-white text-sm mb-4">Resources</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/blog" className="hover:text-gray-200">Blog</Link></li>
            <li><Link href="/guides" className="hover:text-gray-200">Guides</Link></li>
            <li><Link href="/templates" className="hover:text-gray-200">Templates</Link></li>
          </ul>
          </div>
        </div>

        {/* Company */}
        <div className="flex md:justify-end justify-start mt-5 md:mt-0">
          <div>
            <h3 className="font-medium text-white text-sm mb-4">Company</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/about-us" className="hover:text-gray-200">About</Link></li>
            <li><Link href="/careers" className="hover:text-gray-200">Careers</Link></li>
            <li><Link href="/press" className="hover:text-gray-200">Press</Link></li>
            <li><Link href="/contact-us" className="hover:text-gray-200">Contact</Link></li>
          </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 md:container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© 2026 Business OS. All rights reserved.</p>
        <ul className="flex gap-5 text-sm text-gray-500">
          <li><Link href="/privacy-policy" className="hover:text-gray-300">Privacy</Link></li>
          <li><Link href="/terms-condition" className="hover:text-gray-300">Terms</Link></li>
          <li><Link href="/security" className="hover:text-gray-300">Security</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;