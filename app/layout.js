import { Rubik } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rubik.variable} scroll-smooth`}>
      <body className="font-rubik overflow-x-hidden">
        <Providers>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            closeButton={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="mt-16 text-center"
            toastClassName="bg-gray-900 text-white"
            bodyClassName="text-sm"
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
