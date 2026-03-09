export default function EventDetails() {
  return (
    <section id="details" className="py-16 px-4 bg-cream">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">
          Event Details
        </h3>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gold/20 p-8 md:p-12 space-y-8">
          {/* Date */}
          <div>
            <p className="text-gold text-xs uppercase tracking-widest mb-1">
              Date
            </p>
            <p className="text-2xl md:text-3xl font-display text-warm-brown">
              April 12, 2026
            </p>
          </div>

          <div className="ornament-divider max-w-[120px] mx-auto">
            <span className="text-gold/50 text-xs">◆</span>
          </div>

          {/* Time */}
          <div>
            <p className="text-gold text-xs uppercase tracking-widest mb-1">
              Time
            </p>
            <p className="text-2xl md:text-3xl font-display text-warm-brown">
              09:30 AM
            </p>
          </div>

          <div className="ornament-divider max-w-[120px] mx-auto">
            <span className="text-gold/50 text-xs">◆</span>
          </div>

          {/* Address */}
          <div>
            <p className="text-gold text-xs uppercase tracking-widest mb-1">
              Venue
            </p>
            <p className="text-xl md:text-2xl font-display text-warm-brown leading-relaxed">
              19654 136th Ln SE
              <br />
              Monroe, WA 98272
            </p>
          </div>

          {/* RSVP Deadline */}
          <div className="pt-4 border-t border-gold/20">
            <p className="text-warm-text/60 text-sm">
              Kindly RSVP by{" "}
              <span className="font-semibold text-warm-brown">
                April 5, 2026
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
