"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider/ThemeProvider";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import { Inter } from "next/font/google";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";

export const inter = Inter({subsets: ["latin"]}) 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 4)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <ReactQueryProvider>
      <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{ duration: 5000 }}
            />
      <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryProvider>
      </body>
    </html>
  );
}
