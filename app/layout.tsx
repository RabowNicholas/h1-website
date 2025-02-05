import type { Metadata } from "next";
import "./_styles/globals.css";
import "./_styles/buttons.css";
import Navbar from "./_components/Navbar";
import { CartProvider } from "./_components/common/Cart";
import { Sora } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const sora = Sora({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className}  bg-warm-white`}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
