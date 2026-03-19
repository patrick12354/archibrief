export type PriorityLevel = "high" | "medium" | "low";

export type SpaceProgramItem = {
  name: string;
  areaTarget: string;
  priority: PriorityLevel;
  purpose: string;
  notes: string;
};

export type AdjacencyItem = {
  space: string;
  near: string[];
  separateFrom: string[];
};

export type ZoningItem = {
  zone: string;
  strategy: string;
  reasoning: string;
};

export type ConstraintItem = {
  type: string;
  title: string;
  detail: string;
};

export type RegulatoryItem = {
  topic: string;
  check: string;
  implication: string;
};

export type MaterialDirectionItem = {
  zone: string;
  palette: string;
  notes: string;
};

export type GroqBriefResponse = {
  summary: string;
  projectVision: string;
  designDrivers: string[];
  spaceProgram: SpaceProgramItem[];
  adjacencyPlan: AdjacencyItem[];
  zoningStrategy: ZoningItem[];
  circulationStrategy: string[];
  siteClimateResponse: string[];
  constraints: ConstraintItem[];
  assumptions: string[];
  regulatoryWatchouts: RegulatoryItem[];
  materialMoodboard: MaterialDirectionItem[];
  nextDesignMoves: string[];
  followUpQuestions: string[];
};

export type GroqRequestPayload = {
  notes: string;
  projectType?: string;
};
