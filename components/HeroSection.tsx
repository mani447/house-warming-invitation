import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center bg-cream">
      {/* Invitation image displayed prominently */}
      <div className="relative w-full max-w-2xl mx-auto">
        <Image
          src="/invitation-bg.png"
          alt="Housewarming Ceremony Invitation - Manideep & Meghana"
          width={800}
          height={1200}
          priority
          className="w-full h-auto"
        />
      </div>

    </section>
  );
}
