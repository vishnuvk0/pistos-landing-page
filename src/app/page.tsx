import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <Problem />
      <Solution />
    </main>
  );
}
