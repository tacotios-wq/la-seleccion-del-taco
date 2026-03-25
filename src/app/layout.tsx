import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Seleccion del Taco — Mexico vota por sus mejores tacos",
  description:
    "16 taquerias compiten en eliminatoria directa. Vota, colecciona sellos y descubre los mejores tacos de Mexico.",
  openGraph: {
    title: "La Seleccion del Taco",
    description: "16 taquerias. 1 campeon. Tu decides.",
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
