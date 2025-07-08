"use client"
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookIcon,
  UsersIcon,
  InfoIcon,
  SettingsIcon,
} from "lucide-react";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const showSidebar = pathname !== "/login"
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SidebarProvider>
            {showSidebar ? (
              <div className="flex min-h-screen w-full flex-col md:flex-row">
                <Sidebar>
                  <nav className="flex flex-col space-y-2 p-4">
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/">
                        <BookIcon className="mr-2" /> Home
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="#">
                        <UsersIcon className="mr-2" /> Authors
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="#">
                        <InfoIcon className="mr-2" /> About
                      </Link>
                    </Button>
                    <Separator className="my-2" />
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="#">
                        <SettingsIcon className="mr-2" /> Settings
                      </Link>
                    </Button>
                  </nav>
                </Sidebar>
                <SidebarInset>
                  <div className="flex min-h-screen w-full flex-1 flex-col">
                    {children}
                    <Footer />
                  </div>
                </SidebarInset>
              </div>
            ) : (
              <div className="flex min-h-screen w-full flex-col">
                {children}
                <Footer />
              </div>
            )}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
