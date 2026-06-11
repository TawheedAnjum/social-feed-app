import "bootstrap/dist/css/bootstrap.min.css";

import "@/assets/styles/common.css";
import "@/assets/styles/main.css";
import "@/assets/styles/responsive.css";

import "./globals.css";

import ReduxProvider from "@/store/provider";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Social Feed App",
  description: "Social Feed App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}