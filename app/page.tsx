import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RSVPForm />
      <MapSection />
      <Footer />
    </main>
  );
}
