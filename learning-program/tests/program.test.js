const test = require('node:test');
const assert = require('node:assert/strict');

const { countDuplicateRoutesLinear, countDuplicateRoutesQuadratic, piecesByStatus } = require('../dist/algorithms');
const { fetchShipmentModels } = require('../dist/http-simulation');
const { calculateProgress, inferLevel } = require('../dist/progress-tracker');

test('algoritmos de duplicados lineal y cuadrático entregan resultado consistente', () => {
  const data = [
    { id: '1', customerId: 'A', origin: 'Bogotá', destination: 'Cali', pieces: 1, status: 'pending' },
    { id: '2', customerId: 'B', origin: 'Bogotá', destination: 'Cali', pieces: 2, status: 'delivered' },
    { id: '3', customerId: 'C', origin: 'Bogotá', destination: 'Medellín', pieces: 1, status: 'in_transit' }
  ];

  assert.equal(countDuplicateRoutesQuadratic(data), 1);
  assert.equal(countDuplicateRoutesLinear(data), 1);
  assert.deepEqual(piecesByStatus(data), { pending: 1, in_transit: 1, delivered: 2 });
});

test('fetchShipmentModels mapea correctamente DTO a modelo', async () => {
  const result = await fetchShipmentModels(async () => [
    {
      id: 'S1',
      customer_id: 'C1',
      city_origin: 'Lima',
      city_destination: 'Arequipa',
      pieces: 10
    }
  ]);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data[0]?.customerId, 'C1');
  }
});

test('tracker de progreso clasifica junior/semiSenior', () => {
  const competency = {
    id: 'ts',
    name: 'TypeScript',
    target: 'alto',
    requiredTopics: ['generics', 'guards', 'strict', 'readonly']
  };

  const low = calculateProgress(competency, { competencyId: 'ts', completedTopics: ['generics'] });
  const high = calculateProgress(competency, {
    competencyId: 'ts',
    completedTopics: ['generics', 'guards', 'strict']
  });

  assert.equal(inferLevel(low), 'junior');
  assert.equal(inferLevel(high), 'semiSenior');
});
