import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Что сделать, чтобы добиться успеха | EightFaces",
  description: "Почему одни люди добиваются успеха, другие – нет? Теории, объясняющие социальный успех.",
  keywords: "успех, социальный интеллект, эмоциональный интеллект, soft-skills, психология, психотерапия, КПТ, коммуникативные навыки, социальные навыки",
  authors: [{ name: "А. Зарипов" }],
  openGraph: {
    title: "Эмоциональный и социальный интеллект",
    description: "Почему одни люди добиваются успеха, другие – нет? Теории, объясняющие социальный успех.",
    images: [
      {
        url: "/assets/guilford.png",
        width: 1200,
        height: 630,
        alt: "Что сделать, чтобы добиться успеха",
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