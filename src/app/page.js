import Hero from "@/components/Hero";
import Connect from "@/components/Connect";
import FeaturedFacility from "@/components/FeaturedFacility";
import Feedback from "@/components/Feedback";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedFacility />
      <Feedback />
      <Connect />
    </div>
  );
}
