import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar/Index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Love for ThreeJs",
  description: "ThreeJs Daily Learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex'>
          <SideBar />
          <main className='flex-1'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
