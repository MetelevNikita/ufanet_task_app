
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// 

import 'bootstrap/dist/css/bootstrap.min.css';

// context



const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Ufanet Task App",
  description: "Сервис по созданию и контролю исполнения заявок на работу",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
          {children}
      </body>
    </html>
  );
}
