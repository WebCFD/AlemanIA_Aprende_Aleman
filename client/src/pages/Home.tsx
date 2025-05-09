import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VocabularySection from "@/components/VocabularySection";
import PronounsSection from "@/components/PronounsSection";
import VerbsSection from "@/components/VerbsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 flex-grow">
        <VocabularySection />
        <PronounsSection />
        <VerbsSection />
      </main>
      <Footer />
    </div>
  );
}
