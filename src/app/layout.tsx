import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Selecci\u00f3n del Taco \u2014 M\u00e9xico vota por sus mejores tacos",
  description:
    "16 taquer\u00edas compiten en eliminatoria directa. Vota, colecciona sellos y descubre los mejores tacos de M\u00e9xico.",
  openGraph: {
    title: "La Selecci\u00f3n del Taco",
    description: "16 taquer\u00edas. 1 campe\u00f3n. T\u00fa decides.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
