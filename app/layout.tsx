import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Web3AuthProvider } from "./contexts/Web3AuthContext";
import { CivicAuthProvider as CustomCivicAuthProvider } from "./contexts/CivicAuthContext";
import { Toaster } from "@/components/ui/sonner";
import { CivicAuthProvider } from "@civic/auth/nextjs";

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
      <body className={`font-sans antialiased`}>
        <ConvexClientProvider>
          <CivicAuthProvider>
            <CustomCivicAuthProvider>
              <Web3AuthProvider>{children}</Web3AuthProvider>
            </CustomCivicAuthProvider>
          </CivicAuthProvider>
        </ConvexClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
