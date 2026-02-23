"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const algorithms_1 = require("./algorithms");
const http_simulation_1 = require("./http-simulation");
const progress_tracker_1 = require("./progress-tracker");
const typescript_design_1 = require("./typescript-design");
/**
 * Punto de entrada del programa de práctica.
 * Ejecuta mini retos y muestra resultados esperados para autoevaluación.
 */
async function main() {
    const shipments = [
        { id: "S1", customerId: "C1", origin: "Bogotá", destination: "Medellín", pieces: 3, status: "pending" },
        { id: "S2", customerId: "C1", origin: "Bogotá", destination: "Cali", pieces: 4, status: "in_transit" },
        { id: "S3", customerId: "C2", origin: "Bogotá", destination: "Medellín", pieces: 2, status: "delivered" }
    ];
    console.log("\n=== Algoritmos ===");
    console.log("Clientes agrupados:", (0, algorithms_1.groupShipmentsByCustomer)(shipments));
    console.log("Ciudades únicas:", (0, algorithms_1.uniqueRouteCities)(shipments));
    console.log("Piezas por estado:", (0, algorithms_1.piecesByStatus)(shipments));
    console.log("Duplicados O(n²):", (0, algorithms_1.countDuplicateRoutesQuadratic)(shipments));
    console.log("Duplicados O(n):", (0, algorithms_1.countDuplicateRoutesLinear)(shipments));
    console.log("\n=== TypeScript diseño ===");
    const task = (0, typescript_design_1.createTask)({ id: "T1", title: "Practicar switchMap", priority: typescript_design_1.Priority.High });
    console.log("Tarea inicial:", task);
    console.log("Tarea completada:", (0, typescript_design_1.completeTask)(task));
    console.log("\n=== HTTP robusto (simulado) ===");
    const apiResult = await (0, http_simulation_1.fetchShipmentModels)(async () => [
        {
            id: "S-100",
            customer_id: "C-500",
            city_origin: "Quito",
            city_destination: "Cuenca",
            pieces: 5
        }
    ]);
    console.log("Resultado API:", apiResult);
    console.log("\n=== Progreso de competencias ===");
    const competency = {
        id: "angular-core",
        name: "Angular Core Framework",
        target: "alto",
        requiredTopics: ["lifecycle", "onpush", "smart-dumb", "signals", "lazy-loading"]
    };
    const entry = { competencyId: "angular-core", completedTopics: ["lifecycle", "onpush"] };
    const progress = (0, progress_tracker_1.calculateProgress)(competency, entry);
    console.log("Progreso %:", progress);
    console.log("Nivel inferido:", (0, progress_tracker_1.inferLevel)(progress));
    console.log("Siguientes tópicos:", (0, progress_tracker_1.nextTopics)(competency, entry));
}
main().catch((error) => {
    console.error("Error ejecutando el programa:", error);
});
