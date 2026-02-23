"use strict";
/**
 * Motor simple de progreso para medir el avance por competencia semiSenior.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProgress = calculateProgress;
exports.inferLevel = inferLevel;
exports.nextTopics = nextTopics;
/**
 * Calcula porcentaje de avance de una competencia en base a tópicos completados.
 */
function calculateProgress(competency, entry) {
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
function inferLevel(progressPercent) {
    return progressPercent >= 70 ? "semiSenior" : "junior";
}
/**
 * Construye un plan de siguiente paso usando filter/map para priorizar pendientes.
 */
function nextTopics(competency, entry, max = 3) {
    const done = new Set(entry.completedTopics);
    return competency.requiredTopics.filter((topic) => !done.has(topic)).slice(0, max);
}
