import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import Link from "next/link";
import backgroundImage from "@/assets/giftfileall/footer.gif";

const Footer = () => {
  return (
    <footer
      className="w-full relative text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 to-black/60" />

      <div className="relative z-10 xl:container mx-auto px-6 pt-10 pb-8 border-b border-white/10 grid grid-cols-2 md:grid-cols-4">
        <div className="w-[80%]">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-semibold">
              <Image src={logo} alt="PioneerX logo" />
            </div>
            <span className="font-bold text-white text-xl">PioneerX</span>
          </Link>
          <p className="text-xs md:text-base text-gray-400 leading-relaxed mb-4">
            The complete operating system for modern entrepreneurs.
          </p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2 text-xs md:text-base text-gray-400">
              <span className="mt-1 text-gray-500">•</span>
              <span>We are not giving licensed financial/legal/tax advice</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-base text-gray-400">
              <span className="mt-1 text-gray-500">•</span>
              <span>Results are not guaranteed</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-base text-gray-400">
              <span className="mt-1 text-gray-500">•</span>
              <span>Users are responsible for decisions</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-end">
          <div>
            <h3 className="font-medium text-white text-sm mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/#features" className="hover:text-gray-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-gray-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#business" className="hover:text-gray-200">
                  Modules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex md:justify-end justify-start mt-5 md:mt-0">
          <div>
            <h3 className="font-medium text-white text-sm mb-4">Modules</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/branding" className="hover:text-gray-200">
                  Branding
                </Link>
              </li>
              <li>
                <Link href="/marketing" className="hover:text-gray-200">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/sales" className="hover:text-gray-200">
                  Sales
                </Link>
              </li>
              <li>
                <Link href="/legal-finance" className="hover:text-gray-200">
                  Finance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex md:justify-end justify-start mt-5 md:mt-0">
          <div>
            <h3 className="font-medium text-white text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/about-us" className="hover:text-gray-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gray-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-condition" className="hover:text-gray-200">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 md:container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © 2026 PioneerX. All rights reserved.
        </p>
        <ul className="flex gap-5 text-sm text-gray-500">
          <li>
            <Link href="/privacy-policy" className="hover:text-gray-300">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms-condition" className="hover:text-gray-300">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
