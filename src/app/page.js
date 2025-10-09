import Link from "next/link";

export default async function Hero() {
  // ✅ Fetch on the server (SSR)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    // Force cache (no revalidation)
    // cache: "force-cache",
    // Or, if you want timed revalidation:
    // next: { revalidate: 3 }, // revalidate every hour
  });

  if (!res.ok) {
    console.error("Failed to fetch hero data:", res.statusText);
    throw new Error("Failed to load homepage data");
  }

  const { data } = await res.json();

  // console.log(data);

  const destinations = data?.destinations || [];
  const creators = data?.creators || [];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Section */}
      <div className="flex flex-col relative h-[80vh] items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/bg.jpg"
          >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-2xl font-semibold text-white tracking-wider">
              TRAVEL
              <span className="text-orange-600">TAILOR</span>
            </h1>
          </div>

          <h2 className="text-6xl mb-4 xl:text-7xl font-light text-orange-600 tracking-tight leading-tight font-handwriting">
            Every Step,
            <br />
            <span className="text-white font-sans text-5xl xl:text-7xl">
              Every Journey
            </span>
          </h2>

          <p className="text-md md:text-2xl xl:text-4xl text-white/90 mb-6 xl:mb-12 font-light">
            Fly above the ordinary, travel today.
          </p>
        </div>
      </div>

      {/* Two Section Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Get Set
          <span className="ml-2 text-3xl md:text-4xl text-orange-600 tracking-tight leading-tight font-handwriting">
            Travel...
          </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 text-lg">
          Discover destinations and connect with expert creators
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Destinations & Experiences */}
          <a
            href="/home"
            className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg block"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url('${
                  destinations[0]?.heroImg || "/fallback.jpg"
                }')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8">
              <h3 className="text-4xl font-bold text-white mb-3">
                Destinations & Experiences
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Explore amazing places and unique activities
              </p>

              <div className="grid grid-cols-2 gap-3">
                {destinations.slice(0, 2).map((dest) => (
                  <div
                    key={dest._id}
                    className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <p className="text-white text-sm font-semibold mb-1">
                      {dest.title}
                    </p>
                    <p className="text-white/70 text-xs">
                      {dest.createdBy?.name
                        ? `By ${dest.createdBy.name}`
                        : dest.startingPrice
                        ? `From ₹${dest.startingPrice}`
                        : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </a>

          {/* Right: Creators & Tours */}
          <Link
            href="/creator"
            className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg block"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url('${
                  creators[0]?.profileImg || "/images/main.jpeg"
                }')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8">
              <h3 className="text-4xl font-bold text-white mb-3">
                Creators & Tours
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Meet expert guides and join curated tours
              </p>

              <div className="grid grid-cols-2 gap-3">
                {creators.slice(0, 2).map((creator) => (
                  <div
                    key={creator._id}
                    className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <p className="text-white text-sm font-semibold ">
                      {creator.name}
                    </p>
                    {creator.location && creator.location !== "" && (
                      <p className="text-white/70 text-xs mt-1">
                        {creator.location || "Unknown location"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
