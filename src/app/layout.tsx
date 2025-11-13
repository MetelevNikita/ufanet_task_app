
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// 

import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// context

import RootContext from "@/utils/RootContext";

// 

import Header from "@/components/element/Header/Header";
import Footer from "@/components/element/Footer/Footer";


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
        <Container className="mt-3">
          <RootContext>
          <Header />
        {children}
          <Footer />
        </RootContext>
        </Container>
      </body>
    </html>
  );
}
