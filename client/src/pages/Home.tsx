import VocabularySection from "@/components/VocabularySection";
import PronounsSection from "@/components/PronounsSection";
import VerbsSection from "@/components/VerbsSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <VocabularySection />
      <PronounsSection />
      <VerbsSection />
    </div>
  );
}
