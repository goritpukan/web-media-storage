import type {Metadata} from "next";
import './globals.css';
import Providers from '@/components/providers/Providers';

export const metadata: Metadata = {
    title: "Video Storage",
    description: "Video storage website",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
