/**
 * Este módulo demuestra cómo usar TypeScript como herramienta de diseño.
 */

export enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH"
}

export interface LearningTask {
  readonly id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  optionalNotes?: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; errorMessage: string; statusCode: number };

/**
 * Crea una tarea de aprendizaje con defaults para evitar datos incompletos.
 */
export function createTask(input: Omit<LearningTask, "completed">): LearningTask {
  return {
    ...input,
    completed: false
  };
}

/**
 * Generic reutilizable para paginar cualquier tipo de dato.
 */
export interface Paginated<T> {
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly rows: readonly T[];
}

/**
 * Aplica un type guard para hacer narrowing y manejar errores en compilación.
 */
export function isSuccessResult<T>(result: ApiResult<T>): result is { ok: true; data: T } {
  return result.ok;
}

/**
 * Función utilitaria para completar tareas y retornar nuevo estado inmutable.
 */
export function completeTask(task: LearningTask): LearningTask {
  return { ...task, completed: true };
}
