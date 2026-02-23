"use strict";
/**
 * Simulación de consumo HTTP robusto con DTO, mapping, retry y timeout.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapShipmentDto = mapShipmentDto;
exports.withTimeout = withTimeout;
exports.retry = retry;
exports.fetchShipmentModels = fetchShipmentModels;
/**
 * Mapper DTO -> Modelo de dominio para desacoplar frontend de backend.
 */
function mapShipmentDto(dto) {
    return {
        id: dto.id,
        customerId: dto.customer_id,
        origin: dto.city_origin,
        destination: dto.city_destination,
        pieces: dto.pieces
    };
}
/**
 * Ejecuta una promesa con timeout para no dejar requests colgadas.
 */
async function withTimeout(promise, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout de ${timeoutMs}ms excedido`)), timeoutMs);
    });
    return Promise.race([promise, timeoutPromise]);
}
/**
 * Reintenta una operación asíncrona para simular resiliencia de red.
 */
async function retry(operation, retries = 2) {
    let latestError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await operation();
        }
        catch (error) {
            latestError = error;
        }
    }
    throw latestError;
}
/**
 * Caso de uso completo: llama API simulada, aplica timeout, retry y mapping tipado.
 */
async function fetchShipmentModels(loadDtos) {
    try {
        const dtos = await retry(() => withTimeout(loadDtos(), 1200), 2);
        return { ok: true, data: dtos.map(mapShipmentDto) };
    }
    catch (error) {
        return {
            ok: false,
            errorMessage: error instanceof Error ? error.message : "Error desconocido",
            statusCode: 503
        };
    }
}
