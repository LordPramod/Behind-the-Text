"use client"

import AcmeLogo from "@/assets/brands/acme-corp-logo.svg"
import EchoValleyLogo from "@/assets/brands/echo-valley-logo.svg"
import QuantumLogo from "@/assets/brands/quantum-logo.svg"
import PulseLogo from "@/assets/brands/pulse-logo.svg"
import OutsideLogo from "@/assets/brands/outside-logo.svg"
import CelestialLogo from "@/assets/brands/celestial-logo.svg"
import TwiceLogo from "@/assets/brands/twice-logo.svg"
import Image from "next/image";
import {motion} from "motion/react";

export function LogoTicker() {
  const COMPANIES = [
    {name: "Acme Corp", logo: AcmeLogo},
    {name: "Twice", logo: TwiceLogo},
    {name: "Echo Valley", logo: EchoValleyLogo},
    {name: "Quantum", logo: QuantumLogo},
    {name: "Pulse", logo: PulseLogo},
    {name: "Outside", logo: OutsideLogo},
    {name: "Celestial", logo: CelestialLogo}
  ] satisfies Array<{
    name: string,
    logo: SVGElement
  }>

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="flex items-center gap-5">
          <div className="flex-1 md:flex-none">
            <h2>Trusted by top innovative teams</h2>
          </div>
          <div className="flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              initial={{x: "-50%"}}
              animate={{x: 0}}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="flex flex-none gap-14 pr-14 -translate-x-1/2">
              {[...COMPANIES, ...COMPANIES].map((company, index) => (
                <Image src={company.logo} alt={company.name} key={index} className="h-8 w-auto" />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
