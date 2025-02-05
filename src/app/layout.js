// src/app/layout.js
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart"; // Update the import
import { SearchProvider } from "@/context/search"; // Add this import
import { Toaster } from "sonner";
import { UserProvider } from "@/context/user";
import { AuthProvider } from "@/context/auth";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Itapelo Group LLC",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <SearchProvider>
          <CartProvider>
            <UserProvider>
              <AuthProvider>
                <Toaster richColors position="top-right" expand />
                {children}

                <script
                  src="//code.tidio.co/zxjsknngtt4kdpz7oplu3hqihnabniqr.js"
                  async
                ></script>
              </AuthProvider>
            </UserProvider>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
