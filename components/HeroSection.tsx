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

      {/* Subtle overlay text below the image */}
      <div className="w-full bg-gradient-to-b from-cream to-cream-dark py-10 px-4 text-center">
        <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">
          You are cordially invited
        </p>
        <h1 className="text-3xl md:text-4xl font-display text-warm-brown leading-tight">
          Manideep &amp; Meghana
        </h1>
        <p className="text-warm-text/70 mt-2 text-lg">
          invite you to celebrate
        </p>
        <h2 className="text-2xl md:text-3xl font-display text-warm-brown mt-1">
          Our Housewarming Ceremony
        </h2>
        <div className="ornament-divider mt-6 max-w-xs mx-auto">
          <span className="text-gold text-xl">✦</span>
        </div>
      </div>
    </section>
  );
}
