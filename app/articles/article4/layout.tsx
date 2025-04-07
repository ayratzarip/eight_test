import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Статья 4 | EightFaces",
  description: "Описание статьи 4 о социальных навыках и психологии общения.",
  keywords: "застенчивость, социальная тревога, психология, коммуникативные навыки, социальные навыки",
  authors: [{ name: "А. Зарипов" }],
  openGraph: {
    title: "Статья 4",
    description: "Описание статьи 4 о социальных навыках и психологии общения.",
    images: [
      {
        url: "/assets/diamond_logo_green.png",
        width: 1200,
        height: 630,
        alt: "Статья 4 EightFaces",
      },
    ],
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}