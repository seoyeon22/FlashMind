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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className="h-full">
      <body className="flex flex-col h-full bg-background dark:bg-dark-background">
        <AuthListener/>
        <Navigation/>
        <div className="flex-1 h-full">
          {children}
        </div>
      </body>
    </html>
  );
}