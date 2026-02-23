/**
 * Motor simple de progreso para medir el avance por competencia semiSenior.
 */

export type SkillLevel = "junior" | "semiSenior";

export interface Competency {
  readonly id: string;
  readonly name: string;
  readonly target: "medio" | "medio-alto" | "alto";
  readonly requiredTopics: readonly string[];
}

export interface ProgressEntry {
  readonly competencyId: string;
  readonly completedTopics: readonly string[];
}

/**
 * Calcula porcentaje de avance de una competencia en base a tópicos completados.
 */
export function calculateProgress(competency: Competency, entry: ProgressEntry): number {
  const required = competency.requiredTopics.length;
  if (required === 0) {
    return 100;
  }

  const completedSet = new Set(entry.completedTopics);
  const completedCount = competency.requiredTopics.filter((topic) => completedSet.has(topic)).length;

  return Math.round((completedCount / required) * 100);
}

/**
 * Clasifica nivel actual aproximado por porcentaje para dar feedback rápido.
 */
export function inferLevel(progressPercent: number): SkillLevel {
  return progressPercent >= 70 ? "semiSenior" : "junior";
}

/**
 * Construye un plan de siguiente paso usando filter/map para priorizar pendientes.
 */
export function nextTopics(competency: Competency, entry: ProgressEntry, max = 3): string[] {
  const done = new Set(entry.completedTopics);
  return competency.requiredTopics.filter((topic) => !done.has(topic)).slice(0, max);
}
