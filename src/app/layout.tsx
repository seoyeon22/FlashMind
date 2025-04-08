import "@/styles/global.css";
import Navigation from "@/components/navigation";
import { Metadata } from "next";
import AuthListener from "@/components/AuthListener";

export const metadata: Metadata = {
  title: "FlashMind",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className="bg-background">
        <AuthListener/>
        <Navigation/>
        {children}
      </body>
    </html>
  )
}