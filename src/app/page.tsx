import { Header } from "@/components/layout/Header";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { TabsView } from "@/components/dashboard/TabsView";
import { ChatbotWidget } from "@/components/ai/ChatbotWidget";

export default function Home() {
  return (
    <main className="min-h-screen h-screen w-full flex flex-col bg-background text-foreground overflow-hidden relative">
      {/* WOW: subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      {/* Ambient glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <Header />
      <div className="relative flex-1 w-full max-w-[1600px] mx-auto p-3 md:p-5 lg:p-6 flex flex-col lg:flex-row gap-4 mt-14 lg:mt-16 overflow-hidden">
        {/* Left Column: Profile Card */}
        <div className="w-full lg:w-[360px] xl:w-[420px] shrink-0 h-[380px] lg:h-full">
          <ProfileCard />
        </div>

        {/* Right Column: Tabs */}
        <div className="flex-1 h-full min-h-[500px] lg:h-full lg:min-h-0">
          <TabsView />
        </div>
      </div>

      {/* AI Chatbot - always visible */}
      <ChatbotWidget />
    </main>
  );
}

