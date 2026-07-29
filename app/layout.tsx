import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3002";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "ELITE STROY — строительство домов под ключ",
    description: "Проектирование и строительство частных домов под ключ в Краснодарском крае и Республике Адыгея.",
    openGraph: {
      title: "ELITE STROY — дома под ключ",
      description: "Проектируем и строим частные дома, в которые хочется возвращаться.",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: "ELITE STROY — дома под ключ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ELITE STROY — дома под ключ",
      description: "Проектируем и строим частные дома, в которые хочется возвращаться.",
      images: [image],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
