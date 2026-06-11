import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DecoElements from "@/components/layout/DecoElements";
import ArchiveGrid from "@/components/archive/ArchiveGrid";

export default function ArchivePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header showArchiveActive />
      <DecoElements />
      <main className="relative z-10 flex-1 max-w-[1200px] mx-auto w-full px-8 py-8">
        <ArchiveGrid />
      </main>
      <Footer />
    </div>
  );
}
