import { CallToAction } from "@/components/call-to-action";
import { HeroSection } from "@/components/hero-section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <CallToAction />
      <SiteFooter />
    </>
  );
}
