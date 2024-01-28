import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata = {
  title: "Nuclear Waste Tracking System",
  description:
    "NWTS is a digital solution that monitors the amount, type and location of nuclear waste that is stored.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rubik.variable} scroll-smooth`}>
      <body className="font-rubik  overflow-x-hidden">{children}</body>
    </html>
  );
}
