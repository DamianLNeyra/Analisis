"use strict";
/**
 * Este módulo concentra ejercicios de algoritmos para practicar complejidad y estructuras de datos.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupShipmentsByCustomer = groupShipmentsByCustomer;
exports.uniqueRouteCities = uniqueRouteCities;
exports.piecesByStatus = piecesByStatus;
exports.countDuplicateRoutesQuadratic = countDuplicateRoutesQuadratic;
exports.countDuplicateRoutesLinear = countDuplicateRoutesLinear;
/**
 * Agrupa envíos por cliente usando Map para tener búsquedas O(1) promedio por clave.
 */
function groupShipmentsByCustomer(shipments) {
    const grouped = new Map();
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
function uniqueRouteCities(shipments) {
    const citySet = new Set();
    shipments.forEach((shipment) => {
        citySet.add(shipment.origin);
        citySet.add(shipment.destination);
    });
    return [...citySet].sort((a, b) => a.localeCompare(b));
}
/**
 * Resume piezas por estado usando reduce para practicar transformaciones funcionales.
 */
function piecesByStatus(shipments) {
    return shipments.reduce((acc, shipment) => {
        acc[shipment.status] += shipment.pieces;
        return acc;
    }, { pending: 0, in_transit: 0, delivered: 0 });
}
/**
 * Detecta potencial O(n²): busca rutas repetidas comparando cada envío contra todos.
 * Se deja como ejemplo educativo para luego optimizarlo.
 */
function countDuplicateRoutesQuadratic(shipments) {
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
            const sameRoute = current.origin === candidate.origin &&
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
function countDuplicateRoutesLinear(shipments) {
    const seenRoutes = new Set();
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
