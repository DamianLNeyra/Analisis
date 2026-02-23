/**
 * Simulación de consumo HTTP robusto con DTO, mapping, retry y timeout.
 */

import { ApiResult } from "./typescript-design";

export interface ShipmentDto {
  id: string;
  customer_id: string;
  city_origin: string;
  city_destination: string;
  pieces: number;
}

export interface ShipmentModel {
  readonly id: string;
  readonly customerId: string;
  readonly origin: string;
  readonly destination: string;
  readonly pieces: number;
}

/**
 * Mapper DTO -> Modelo de dominio para desacoplar frontend de backend.
 */
export function mapShipmentDto(dto: ShipmentDto): ShipmentModel {
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
export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout de ${timeoutMs}ms excedido`)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Reintenta una operación asíncrona para simular resiliencia de red.
 */
export async function retry<T>(operation: () => Promise<T>, retries = 2): Promise<T> {
  let latestError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      latestError = error;
    }
  }

  throw latestError;
}

/**
 * Caso de uso completo: llama API simulada, aplica timeout, retry y mapping tipado.
 */
export async function fetchShipmentModels(
  loadDtos: () => Promise<ShipmentDto[]>
): Promise<ApiResult<ShipmentModel[]>> {
  try {
    const dtos = await retry(() => withTimeout(loadDtos(), 1200), 2);
    return { ok: true, data: dtos.map(mapShipmentDto) };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error instanceof Error ? error.message : "Error desconocido",
      statusCode: 503
    };
  }
}
