import "./globals.css";
import HeartCursor from "./components/HeartCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <HeartCursor />

        {children}
      </body>
    </html>
  );
}
