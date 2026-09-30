import { projects } from "@/data/projects";
import { LabExperience } from "@/components/LabExperience";

export default function Home() {
  return (
    <main>
      <LabExperience />
      <section className="seo-outline" aria-label="Portfolio content outline">
        <h1>TAHIYA // AI LAB</h1>
        <p>
          An AI research and engineering portfolio organized as a navigable laboratory.
        </p>
        <h2>Project chambers</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <strong>{project.title}</strong>: {project.description} Status: {project.statusLabel}.
            </li>
          ))}
        </ul>
        <h2>Research and engineering</h2>
        <p>
          The research observatory is prepared for papers, experiments, datasets, and notes.
          The engineering system maps AI and software technologies without artificial skill scores.
        </p>
      </section>
    </main>
  );
}
