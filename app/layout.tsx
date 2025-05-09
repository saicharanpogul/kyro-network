import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyro: Turning your e-waste into tokens",
  description: "Turning your e-waste into tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
