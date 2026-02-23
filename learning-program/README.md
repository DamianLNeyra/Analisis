# Programa de práctica: Junior -> SemiSenior (Web + Angular + TypeScript)

Este programa está diseñado para practicar exactamente los ejes que pediste, con foco en:

- Algoritmos y complejidad.
- TypeScript avanzado con `strict`.
- Consumo HTTP robusto con mapeo de DTOs.
- Arquitectura y progreso por competencias.
- Hábito de calidad con tests automáticos.

## 1) Cómo ejecutar

```bash
cd learning-program
npm install
npm run start
npm run test
```

## 2) Estructura didáctica

- `src/algorithms.ts`: prácticas de `Map`, `Set`, `reduce`, y comparación O(n²) vs O(n).
- `src/typescript-design.ts`: `interface`, `type`, `enum`, `readonly`, opcionales, genéricos y type guards.
- `src/http-simulation.ts`: DTO -> modelo, timeout, retry y manejo de error centralizado.
- `src/progress-tracker.ts`: seguimiento por competencia y siguientes temas recomendados.
- `tests/program.test.js`: validación automática de piezas críticas.

> Todas las funciones del programa tienen comentarios para explicar su objetivo técnico.

## 3) Ruta sugerida por bloques (8 semanas)

### Semana 1-2: Algoritmos y estructuras

- Resolver retos en `src/algorithms.ts`.
- Medir mentalmente complejidad de cada solución.
- Objetivo: detectar cuándo una solución pasa de O(n²) a O(n).

### Semana 3-4: TypeScript como diseño

- Evitar `any`.
- Crear nuevos contratos (`interfaces` y `types`) para features ficticias.
- Implementar nuevos type guards.

### Semana 5: HTTP/API resiliente

- Extender `fetchShipmentModels` con códigos de error más detallados.
- Simular escenarios: timeout, backend caído, payload inválido.

### Semana 6: Angular + RxJS (práctica guiada)

Aplicar estos conceptos en tu proyecto Angular real:

- `OnPush`, smart/dumb components.
- Evitar lógica pesada en template.
- Reemplazar `subscribe` manual por `async pipe` donde aplique.
- Usar `switchMap` en flujos dependientes de inputs.

### Semana 7: Testing y calidad

- Agregar tests para cada bug que encuentres.
- Crear mocks/spies en servicios Angular.
- Ver cobertura como indicador, no meta final.

### Semana 8: Flujo de equipo y liderazgo técnico

- Practicar commits semánticos (`feat:`, `fix:`, `refactor:`).
- Escribir PRs con contexto técnico y riesgos.
- Explicar decisiones de arquitectura en 4-6 bullets.

## 4) Checklist de dominio (autoevaluación)

### Algoritmos (MEDIO)
- [ ] Identifico O(n) vs O(n²).
- [ ] Elijo `Map` / `Set` por necesidad real.
- [ ] Uso `map/filter/reduce` con claridad.

### TypeScript (ALTO)
- [ ] `strict` activado.
- [ ] Casi cero `any`.
- [ ] Uso genéricos y guards en código productivo.

### Git (ALTO)
- [ ] Distingo `rebase` vs `merge` y cuándo usar cada uno.
- [ ] Resuelvo conflictos sin romper historia.
- [ ] Escribo commits semánticos y PRs claras.

### HTTP/APIs (ALTO)
- [ ] Manejo errores de forma centralizada.
- [ ] Implemento timeout/retry según caso.
- [ ] Uso DTOs y mappers.

### Angular Core (ALTO)
- [ ] Uso `OnPush` y detecto anti-patrones de template.
- [ ] Diseño smart/dumb components.
- [ ] Conozco guards/resolvers/lazy loading/signals.

### RxJS (MEDIO-ALTO)
- [ ] Elijo operador correcto (`switchMap`, `mergeMap`, `combineLatest`).
- [ ] Evito memory leaks (unsubscribe patterns / async pipe).

### Testing (ALTO)
- [ ] Tengo unit tests para servicios/componentes críticos.
- [ ] Sé mockear dependencias.

### Arquitectura y soft skills
- [ ] Pienso por dominio, no solo por pantalla.
- [ ] Argumento decisiones técnicas con trade-offs.
- [ ] Comunico bloqueos y propongo opciones.
