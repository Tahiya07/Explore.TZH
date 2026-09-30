import type { LabLocation, NavTarget, ProjectRoom } from "@/types/lab";

export const projects: readonly ProjectRoom[] = [
  {
    id: "eduguard",
    index: "01",
    title: "EduGuard",
    discipline: "AI education / project record",
    status: "source-pending",
    statusLabel: "SOURCE MATERIAL PENDING",
    description:
      "A dedicated chamber reserved for verified EduGuard work. Its implementation record is intentionally not inferred: this repository currently contains no source materials to validate.",
    visualSystem: "split-pathway",
    route: ["STUDENT CONTEXT", "LEARNING PATH", "GUIDED RESPONSE"],
    accent: "#8cf0c4",
    featured: true,
    sourceNote:
      "Connect the EduGuard source repository or verified project brief to activate technical details in this chamber.",
  },
  {
    id: "autonomous-ai",
    index: "02",
    title: "Autonomous AI",
    discipline: "Agentic AI / research automation",
    status: "research-area",
    statusLabel: "RESEARCH AREA — FUTURE PROJECT",
    description:
      "A future chamber for an agentic system. The architecture is prepared; no project implementation or outcomes are represented here.",
    visualSystem: "agent-loop",
    route: ["GOAL", "PLAN", "TOOLS", "REASON", "VERIFY", "RESULT"],
    accent: "#68c6ff",
  },
  {
    id: "computer-vision",
    index: "03",
    title: "Computer Vision",
    discipline: "Deep learning / vision systems",
    status: "research-area",
    statusLabel: "RESEARCH AREA — FUTURE PROJECT",
    description:
      "A future chamber for visual intelligence. Its instrumentation indicates a possible workflow, not an existing system or result.",
    visualSystem: "vision-array",
    route: ["CAMERA", "VISION MODEL", "DETECTION", "TRACKING", "ANALYSIS"],
    accent: "#89a8ff",
  },
  {
    id: "ai-security",
    index: "04",
    title: "AI Security",
    discipline: "AI security / threat analysis",
    status: "research-area",
    statusLabel: "RESEARCH AREA — FUTURE PROJECT",
    description:
      "A future chamber for responsible AI security exploration. It makes no security guarantees and presents no deployed capability.",
    visualSystem: "security-gate",
    route: ["INPUT", "RISK ANALYSIS", "DETECTION", "REVIEW", "RESPONSE"],
    accent: "#6ee6d5",
  },
  {
    id: "multimodal-intelligence",
    index: "05",
    title: "Multimodal Intelligence",
    discipline: "Document / vision / language AI",
    status: "research-area",
    statusLabel: "RESEARCH AREA — FUTURE PROJECT",
    description:
      "A future chamber for cross-modal exploration. The visible sequence is an integration interface, not a claim of a completed product.",
    visualSystem: "multimodal-stack",
    route: ["DOCUMENT", "OCR", "LAYOUT", "TEXT + VISUAL FEATURES", "MULTIMODAL MODEL"],
    accent: "#94d5e9",
  },
  {
    id: "predictive-systems",
    index: "06",
    title: "Predictive Systems",
    discipline: "Machine learning / decision support",
    status: "research-area",
    statusLabel: "RESEARCH AREA — FUTURE PROJECT",
    description:
      "A future chamber for forecasting and decision-support research. No model, data, forecast, or performance claim is presented.",
    visualSystem: "forecast-ring",
    route: ["DATA", "FEATURES", "MODEL", "FORECAST", "DECISION SUPPORT"],
    accent: "#7bbcff",
  },
] as const;

export const projectById = Object.fromEntries(
  projects.map((project) => [project.id, project]),
) as Record<ProjectRoom["id"], ProjectRoom>;

export const labLocations: Record<string, LabLocation> = {
  core: {
    id: "core",
    label: "Neural Core",
    eyebrow: "CENTRAL COMPUTE",
    message: "The laboratory’s navigation nucleus. Choose a chamber or follow a corridor.",
  },
  research: {
    id: "research",
    label: "Research Observatory",
    eyebrow: "ARCHIVE / OBSERVATORY",
    message: "A living archive designed for future papers, experiments, comparisons, datasets, and notes.",
  },
  engineering: {
    id: "engineering",
    label: "Engineering Systems",
    eyebrow: "CAPABILITY NETWORK",
    message: "Technology nodes map the systems and methods that can power future work—without artificial proficiency scores.",
  },
  contact: {
    id: "contact",
    label: "Contact Terminal",
    eyebrow: "OPEN CHANNEL",
    message: "A quiet closing point for conversations about AI research and systems. Contact details remain configurable until verified information is connected.",
  },
};

export const navTargets: readonly NavTarget[] = [
  { id: "core", label: "Core", kind: "core" },
  { id: "eduguard", label: "01 EduGuard", kind: "project" },
  { id: "autonomous-ai", label: "02 Autonomous AI", kind: "project" },
  { id: "computer-vision", label: "03 Computer Vision", kind: "project" },
  { id: "ai-security", label: "04 AI Security", kind: "project" },
  { id: "multimodal-intelligence", label: "05 Multimodal", kind: "project" },
  { id: "predictive-systems", label: "06 Predictive", kind: "project" },
  { id: "research", label: "Research", kind: "area" },
  { id: "engineering", label: "Engineering", kind: "area" },
  { id: "contact", label: "Contact", kind: "area" },
] as const;

export const technologies = [
  "AI / ML",
  "LLMs",
  "RAG",
  "Computer Vision",
  "Deep Learning",
  "Federated Learning",
  "Offline AI",
  "Python",
  "PyTorch",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "FAISS",
] as const;
