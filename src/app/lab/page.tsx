import { LabExperience } from "@/components/LabExperience";

export const metadata = {
  title: "The 3D Lab — Tahiya Zareen",
  description: "An optional immersive 3D exploration of Tahiya Zareen's AI and engineering portfolio.",
};

export default function LabPage() {
  return (
    <main>
      <a className="lab-back-link" href="/">← BACK TO PORTFOLIO</a>
      <LabExperience />
    </main>
  );
}
