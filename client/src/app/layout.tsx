import type {Metadata} from "next";
import './globals.css';
import Providers from '@/components/providers/Providers';
import Header from "@/components/header/Header";

export const metadata: Metadata = {
    title: "Video Storage",
    description: "Video storage website",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <Header />
            {children}
        </Providers>
        </body>
        </html>
    );
}
