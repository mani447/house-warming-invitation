import HeroSection from "@/components/HeroSection";
import Attire from "@/components/Attire";
import MapSection from "@/components/MapSection";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Attire />
      <RSVPForm />
      <MapSection />
      <Footer />
    </main>
  );
}
