import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { About } from "@/components/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <Problem />
      <Solution />
      <About />
    </main>
  );
}
