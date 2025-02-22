import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider/ThemeProvider";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import { ToasterProvider } from "./provider/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ToasterProvider />
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}