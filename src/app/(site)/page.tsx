import { Android } from "@/components/landing/Android";
import { Background } from "@/components/landing/Background";
import { Developers } from "@/components/landing/Developers";
import { Faq } from "@/components/landing/Faq";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { Platforms } from "@/components/landing/Platforms";
import { Security } from "@/components/landing/Security";
import { Statement } from "@/components/landing/Statement";
import { StoryScroller } from "@/components/landing/StoryScroller";

export default function Home() {
  return (
    <>
      <Background />
      <Hero />
      <Platforms />
      <Statement />
      <StoryScroller />
      <FeatureBento />
      <Security />
      <Developers />
      <Android />
      <Faq />
      <FinalCta />
    </>
  );
}
