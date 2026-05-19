import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";
import { InstagramOutlined, LinkedinOutlined, TikTokOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          {/* <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          /> */}
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-8 text-center">

          {/* 5th block */}
          <div className="">
            {/* <div className="mb-3">
              <Logo />
            </div> */}
            <div className="text-sm">
              {/* <p className="mb-3 text-[#2b2216]">
                © Thymiolas 
              </p> */}
              <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium">
                <Link
                  href="/privacy"
                  className="text-indigo-500 transition hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  className="text-indigo-500 transition hover:text-indigo-400"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-indigo-500 transition hover:text-indigo-400"
                >
                  Terms
                </Link>
              </div>
              <ul className="inline-flex">
                <li>
                  <a
                    className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                    href="https://www.instagram.com/thimiolas.gr/"
                    aria-label="Instagram"
                  >
                    <InstagramOutlined className="h-8 w-8 fill-current" />
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                    href="https://gr.linkedin.com/in/thymios-moragiannis"
                    aria-label="LinkedIn"
                  >
                    <LinkedinOutlined className="h-8 w-8 fill-current" />
                    
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                    href="https://www.tiktok.com/@thimiolas.gr"
                    aria-label="TikTok"
                  >
                    <TikTokOutlined className="h-8 w-8 fill-current" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
