import Header from "@/components/layout/Header";
import TranslatorFlow from "@/components/TranslatorFlow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <TranslatorFlow />
    </div>
  );
}
