import "./globals.css";
import { Inter } from "next/font/google";

import { AppProvider } from "@/contexts/app";
import { Loader } from "@/components/Loader";
import { StateRouter } from "@/components/StateRouter";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Loader>{children}</Loader>
          <StateRouter />
        </AppProvider>
      </body>
    </html>
  );
}
