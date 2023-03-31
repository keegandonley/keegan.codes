import "./globals.css";
import "./colors.css";

export const metadata = {
  title: "Keegan Donley",
  description: "Principal Front-End Engineer at Kizen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
