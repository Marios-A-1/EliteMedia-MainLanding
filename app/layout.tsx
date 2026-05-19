import { Inter } from "next/font/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
// @ts-ignore
import './css/style.css';
// @ts-ignore
import './css/additional-styles/theme.css';
// @ts-ignore
import './css/additional-styles/utility-patterns.css';
import Header from "@/components/ui/header";
import LightPillar from "@/components/ui/LightPillar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thymiolas",
  description:
    "Η Thymiolas βοηθά τις ελληνικές επιχειρήσεις να αναπτυχθούν με στρατηγικό μάρκετινγκ μέσω social media, συστήματα περιεχομένου και εκτέλεση με επίκεντρο την απόδοση.",
  applicationName: "Thymiolas",
  keywords: [
    "Thymiolas",
    "social media marketing",
    "digital marketing",
    "Greece",
    "content strategy",
    "business growth",
  ],
  openGraph: {
    type: "website",
    locale: "el_GR",
    title: "Thymiolas",
    description:
    "Η Thymiolas βοηθά τις ελληνικές επιχειρήσεις να αναπτυχθούν με στρατηγικό μάρκετινγκ μέσω social media, συστήματα περιεχομένου και εκτέλεση με επίκεντρο την απόδοση.",
     
    siteName: "Thymiolas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thymiolas",
    description:
    "Η Thymiolas βοηθά τις ελληνικές επιχειρήσεις να αναπτυχθούν με στρατηγικό μάρκετινγκ μέσω social media, συστήματα περιεχομένου και εκτέλεση με επίκεντρο την απόδοση.",
     
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/ai-favicon.svg",
    shortcut: "/images/ai-favicon.svg",
    apple: "/images/logo-apple.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="" />
        <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//player.vimeo.com" />
        <link rel="dns-prefetch" href="//i.vimeocdn.com" />
        <link rel="dns-prefetch" href="//f.vimeocdn.com" />
        <meta
          name="facebook-domain-verification"
          content="fv0vsadwpondrv3ts6i24gwfecdqw8"
        />
        <meta
          name="facebook-domain-verification"
          content="dk484x7mgn376p1uro8niwvpinc9u7"
        />
      </head>
      <body
        className={`${inter.variable} ${nacelle.variable} bg-transparent font-inter font-bold text-base text-[#2b2216] antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '914366217674412');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=914366217674412&ev=PageView&noscript=1"
          />
        </noscript>
        <div className="relative min-h-screen overflow-hidden bg-[#fffdf7]">
          <div className="pointer-events-none absolute inset-0  sm:block hidden">
              {/* <LightPillar

                topColor="White"
                bottomColor="white"
                intensity={1}
                rotationSpeed={0.01}
                glowAmount={0.005}
                pillarWidth={3.0}
                pillarHeight={0.4}
                noiseIntensity={1}
                pillarRotation={0}
                interactive={false}
                mixBlendMode="normal"
              /> */}
          </div>
          <div className="relative z-10 flex min-h-screen flex-col overflow-hidden pt-0 supports-[overflow:clip]:overflow-clip">
            {/* <Header /> */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
