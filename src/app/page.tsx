import BackToTop from "@/components/BackToTop";
import Nav from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollEffects";
import SparkleCursor from "@/components/SparkleCursor";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <SparkleCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
