/**
 * Skeleton surface used while a lazy-loaded subpage's chunk is in flight.
 * Mirrors the actual subpage shape (eyebrow → title → lead → media block →
 * grid of capability cards) so the perceived layout is stable and the
 * arrival of real content feels like a refinement, not a swap.
 *
 * Pure CSS shimmer — no JS, no extra listeners.
 */
const Bar = ({ className = "" }: { className?: string }) => (
  <div
    className={`rounded-md bg-input/40 animate-shimmer ${className}`}
    style={{
      backgroundImage:
        "linear-gradient(90deg, hsl(var(--input) / 0.5) 0%, hsl(var(--primary) / 0.10) 45%, hsl(var(--primary) / 0.18) 50%, hsl(var(--primary) / 0.10) 55%, hsl(var(--input) / 0.5) 100%)",
      backgroundSize: "200% 100%",
    }}
  />
);

const Card = () => (
  <div className="relative glass rounded-2xl p-7 overflow-hidden border border-border/40">
    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <Bar className="h-10 w-10 rounded-xl mb-5" />
    <Bar className="h-3.5 w-3/4 mb-3" />
    <Bar className="h-2.5 w-full mb-2" />
    <Bar className="h-2.5 w-5/6 mb-2" />
    <Bar className="h-2.5 w-2/3" />
  </div>
);

const SubpageSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Navbar shadow */}
      <div className="h-20 border-b border-border/30" />

      <main className="relative">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[36rem] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.08), transparent 70%)",
          }}
        />

        <section className="container pt-28 pb-24 md:pt-36">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left column — copy */}
            <div className="lg:col-span-7 space-y-6">
              <Bar className="h-3 w-44" />
              <Bar className="h-14 w-11/12" />
              <Bar className="h-14 w-9/12" />
              <div className="pt-6 space-y-3 max-w-xl">
                <Bar className="h-3 w-full" />
                <Bar className="h-3 w-11/12" />
                <Bar className="h-3 w-3/4" />
              </div>
              <div className="pt-6 flex gap-4">
                <Bar className="h-12 w-44 rounded-full" />
                <Bar className="h-12 w-36 rounded-full" />
              </div>
            </div>

            {/* Right column — visual block */}
            <div className="lg:col-span-5">
              <div className="relative glass-strong rounded-3xl p-8 md:p-10 border border-border/40 overflow-hidden">
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <Bar className="h-3 w-32 mb-6" />
                <Bar className="h-48 w-full rounded-xl mb-5" />
                <Bar className="h-3 w-5/6 mb-2.5" />
                <Bar className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        </section>

        {/* Capability grid */}
        <section className="container pb-32">
          <div className="mb-10 space-y-3 max-w-md">
            <Bar className="h-3 w-32" />
            <Bar className="h-9 w-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubpageSkeleton;