import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Койлышов Илияс - AI & FinTech Leader | CIO / CTO / CPO",
  description: "Сеньор-лидер на стыке AI, финтеха и продуктового менеджмента. 15+ лет экспертизы в финансах, успешный запуск платформы для 2.5 млн клиентов.",
  keywords: ["Илияс Койлышов", "CTO", "CIO", "CPO", "Финтех", "AI", "Исламский банкинг", "Управление продуктом", "Казахстан", "Отбасы Банк", "АРРФР"],
  openGraph: {
    type: "profile",
    title: "Койлышов Илияс - AI & FinTech Leader",
    description: "Персональный сайт-резюме: CIO / CTO / CPO • AI & FinTech Leader • 15+ лет опыта",
    url: "https://iliyas-cv.vercel.app", // placeholder URL
    siteName: "Койлышов Илияс",
    locale: "ru_RU",
  },
  authors: [{ name: "Койлышов Илияс" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-blue-500/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex h-screen flex-col w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
