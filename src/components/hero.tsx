import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-screen items-center pt-16">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32">
        <div className="max-w-3xl">
          <h1 className="animate-fade-in-up text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl md:leading-tight">
            {COMPANY.tagline}
          </h1>
          <p className="animate-fade-in-up-delay-1 mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
            {COMPANY.description}
          </p>
          <div className="animate-fade-in-up-delay-2 mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#solution">Learn More</Button>
            <Button href={`mailto:${COMPANY.contactEmail}`} variant="outline">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
