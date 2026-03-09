import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import MapSection from "@/components/MapSection";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EventDetails />
      <MapSection />
      <RSVPForm />
      <Footer />
    </main>
  );
}
