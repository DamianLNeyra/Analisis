/**
 * Este módulo concentra ejercicios de algoritmos para practicar complejidad y estructuras de datos.
 */

export interface Shipment {
  readonly id: string;
  readonly customerId: string;
  readonly origin: string;
  readonly destination: string;
  readonly pieces: number;
  readonly status: "pending" | "in_transit" | "delivered";
}

/**
 * Agrupa envíos por cliente usando Map para tener búsquedas O(1) promedio por clave.
 */
export function groupShipmentsByCustomer(shipments: readonly Shipment[]): Map<string, Shipment[]> {
  const grouped = new Map<string, Shipment[]>();

  for (const shipment of shipments) {
    const bucket = grouped.get(shipment.customerId) ?? [];
    bucket.push(shipment);
    grouped.set(shipment.customerId, bucket);
  }

  return grouped;
}

/**
 * Elimina ciudades duplicadas usando Set y luego ordena alfabéticamente.
 */
export function uniqueRouteCities(shipments: readonly Shipment[]): string[] {
  const citySet = new Set<string>();

  shipments.forEach((shipment) => {
    citySet.add(shipment.origin);
    citySet.add(shipment.destination);
  });

  return [...citySet].sort((a, b) => a.localeCompare(b));
}

/**
 * Resume piezas por estado usando reduce para practicar transformaciones funcionales.
 */
export function piecesByStatus(shipments: readonly Shipment[]): Record<Shipment["status"], number> {
  return shipments.reduce<Record<Shipment["status"], number>>(
    (acc, shipment) => {
      acc[shipment.status] += shipment.pieces;
      return acc;
    },
    { pending: 0, in_transit: 0, delivered: 0 }
  );
}

/**
 * Detecta potencial O(n²): busca rutas repetidas comparando cada envío contra todos.
 * Se deja como ejemplo educativo para luego optimizarlo.
 */
export function countDuplicateRoutesQuadratic(shipments: readonly Shipment[]): number {
  let duplicates = 0;

  for (let i = 0; i < shipments.length; i += 1) {
    const current = shipments[i];
    if (!current) {
      continue;
    }

    for (let j = i + 1; j < shipments.length; j += 1) {
      const candidate = shipments[j];
      if (!candidate) {
        continue;
      }

      const sameRoute =
        current.origin === candidate.origin &&
        current.destination === candidate.destination;

      if (sameRoute) {
        duplicates += 1;
      }
    }
  }

  return duplicates;
}

/**
 * Versión optimizada O(n): usa un Set de rutas para detectar duplicados en un solo recorrido.
 */
export function countDuplicateRoutesLinear(shipments: readonly Shipment[]): number {
  const seenRoutes = new Set<string>();
  let duplicates = 0;

  for (const shipment of shipments) {
    const key = `${shipment.origin}->${shipment.destination}`;
    if (seenRoutes.has(key)) {
      duplicates += 1;
      continue;
    }
    seenRoutes.add(key);
  }

  return duplicates;
}
