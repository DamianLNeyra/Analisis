"use strict";
/**
 * Este módulo demuestra cómo usar TypeScript como herramienta de diseño.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Priority = void 0;
exports.createTask = createTask;
exports.isSuccessResult = isSuccessResult;
exports.completeTask = completeTask;
var Priority;
(function (Priority) {
    Priority["Low"] = "LOW";
    Priority["Medium"] = "MEDIUM";
    Priority["High"] = "HIGH";
})(Priority || (exports.Priority = Priority = {}));
/**
 * Crea una tarea de aprendizaje con defaults para evitar datos incompletos.
 */
function createTask(input) {
    return {
        ...input,
        completed: false
    };
}
/**
 * Aplica un type guard para hacer narrowing y manejar errores en compilación.
 */
function isSuccessResult(result) {
    return result.ok;
}
/**
 * Función utilitaria para completar tareas y retornar nuevo estado inmutable.
 */
function completeTask(task) {
    return { ...task, completed: true };
}
