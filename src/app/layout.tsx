import './globals.css';
import './highlight.css';
import Header from '../components/Header';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Aljaz's Portfolio",
  description: 'Created by Aljaz',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto flex w-full max-w-4xl flex-col justify-between px-5 py-4 2xl:py-12">
          <div>
            <Header />
            <main className="mt-16 mb-16">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
