export default function MapSection() {
  const mapsUrl = "https://maps.google.com/?q=19654+136th+Ln+SE+Monroe+WA";
  const embedUrl =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=19654+136th+Ln+SE+Monroe+WA+98272&zoom=14";

  return (
    <section id="directions" className="py-16 px-4 bg-cream-dark">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-sm uppercase tracking-[0.3em] text-gold mb-2">
          Location
        </h3>
        <p className="text-2xl font-display text-warm-brown mb-8">
          Find Your Way to Us
        </p>

        {/* Embedded Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gold/20 mb-8">
          <iframe
            src={embedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event Location Map"
          />
        </div>

        <div className="space-y-3">
          <p className="text-warm-text/70">
            19654 136th Ln SE, Monroe, WA 98272
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-full transition-colors shadow-md font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                clipRule="evenodd"
              />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
