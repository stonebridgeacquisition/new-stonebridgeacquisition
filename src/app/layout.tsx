import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Navbar } from "./components/Navbar";
import { HomeDemo } from "@/components/blocks/home-demo";
import { Waves } from "@/components/ui/waves-background";
import { WelcomePopupWrapper } from "@/components/welcome-popup-wrapper";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stonebridge Acquisition",
  description: "Professional business solutions and acquisitions",
  icons: {
    icon: '/favicon2.ico',
    apple: {
      url: '/favicon2.ico',
      sizes: '180x180',
      type: 'image/x-icon',
    },
    other: [
      {
        rel: 'shortcut icon',
        url: '/favicon2.ico',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}>
        <div className="fixed inset-0 -z-10">
          <Waves
            lineColor="rgba(156, 35, 57, 0.4)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={48}
            waveAmpY={24}
            xGap={8}
            yGap={24}
            friction={0.95}
            tension={0.01}
            maxCursorMove={150}
            className="animate-wave-pulse"
          />
        </div>
        <div className="relative z-10 bg-white/50 min-h-screen backdrop-blur-[0.5px] flex flex-col">
          <HomeDemo />
          <main className="mt-4 flex-grow">
            {children}
          </main>
          <Footer />
          {/* Welcome Popup */}
          <WelcomePopupWrapper />
        </div>
      </body>
    </html>
  );
}
