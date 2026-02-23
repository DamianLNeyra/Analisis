import {
  countDuplicateRoutesLinear,
  countDuplicateRoutesQuadratic,
  groupShipmentsByCustomer,
  piecesByStatus,
  uniqueRouteCities,
  type Shipment
} from "./algorithms";
import { fetchShipmentModels } from "./http-simulation";
import { calculateProgress, inferLevel, nextTopics, type Competency } from "./progress-tracker";
import { Priority, completeTask, createTask } from "./typescript-design";

/**
 * Punto de entrada del programa de práctica.
 * Ejecuta mini retos y muestra resultados esperados para autoevaluación.
 */
async function main(): Promise<void> {
  const shipments: Shipment[] = [
    { id: "S1", customerId: "C1", origin: "Bogotá", destination: "Medellín", pieces: 3, status: "pending" },
    { id: "S2", customerId: "C1", origin: "Bogotá", destination: "Cali", pieces: 4, status: "in_transit" },
    { id: "S3", customerId: "C2", origin: "Bogotá", destination: "Medellín", pieces: 2, status: "delivered" }
  ];

  console.log("\n=== Algoritmos ===");
  console.log("Clientes agrupados:", groupShipmentsByCustomer(shipments));
  console.log("Ciudades únicas:", uniqueRouteCities(shipments));
  console.log("Piezas por estado:", piecesByStatus(shipments));
  console.log("Duplicados O(n²):", countDuplicateRoutesQuadratic(shipments));
  console.log("Duplicados O(n):", countDuplicateRoutesLinear(shipments));

  console.log("\n=== TypeScript diseño ===");
  const task = createTask({ id: "T1", title: "Practicar switchMap", priority: Priority.High });
  console.log("Tarea inicial:", task);
  console.log("Tarea completada:", completeTask(task));

  console.log("\n=== HTTP robusto (simulado) ===");
  const apiResult = await fetchShipmentModels(async () => [
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
  const competency: Competency = {
    id: "angular-core",
    name: "Angular Core Framework",
    target: "alto",
    requiredTopics: ["lifecycle", "onpush", "smart-dumb", "signals", "lazy-loading"]
  };
  const entry = { competencyId: "angular-core", completedTopics: ["lifecycle", "onpush"] };
  const progress = calculateProgress(competency, entry);

  console.log("Progreso %:", progress);
  console.log("Nivel inferido:", inferLevel(progress));
  console.log("Siguientes tópicos:", nextTopics(competency, entry));
}

main().catch((error) => {
  console.error("Error ejecutando el programa:", error);
});
