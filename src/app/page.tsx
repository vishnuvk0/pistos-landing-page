import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { About } from "@/components/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <About />
    </main>
  );
}
