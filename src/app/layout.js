import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ridiculink - Ridiculously Long URL Generator",
  description: "Transform your boring short URLs into magnificently long, cryptographically secure hyperlinks",
  keywords: "URL lengthener, long URL generator, ridiculous URLs, parody, fun tool",
  authors: [{ name: "Ridiculink Team" }],
  creator: "Ridiculink",
  openGraph: {
    title: "Ridiculink - Ridiculously Long URL Generator",
    description: "Transform your boring short URLs into magnificently long hyperlinks",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridiculink - Ridiculously Long URL Generator",
    description: "Transform your boring short URLs into magnificently long hyperlinks",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}