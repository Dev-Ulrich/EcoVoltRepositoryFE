import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createDemoState, createSubmission, demoReducer, selectDemoUser, selectRanking, validateReview } from '../src/data/demoState.ts'
import { mockUsers } from '../src/data/mockUsers.ts'

const input = { category: 'recycling' as const, description: 'Separei resíduos para reciclagem.', evidence: { name: 'demo.mp4', type: 'video/mp4', size: 1024 } }
const now = '2026-09-08T18:00:00Z'

test('mocks cobrem os quatro status e produzem indicadores e ranking consistentes', () => {
  const state = createDemoState()
  assert.deepEqual(new Set(state.actions.map(action => action.status)), new Set(['pending', 'approved', 'rejected', 'in_review']))
  const user = selectDemoUser(state, mockUsers[0])
  assert.equal(user.points, 115)
  assert.equal(user.xp, 90)
  assert.equal(user.completedActions, 1)
  assert.equal(user.activeMissions, 2)
  assert.equal(selectRanking(state, user).find(entry => entry.userId === user.id)?.points, user.points)
  assert.equal(selectRanking(state, user).find(entry => entry.userId === user.id)?.position, 3)
})

test('envio aparece na coleção compartilhada sem conceder pontos antes de aprovação', () => {
  const state = createDemoState()
  const action = createSubmission(input, 1, 'action-new', now)
  const next = demoReducer(state, { type: 'submit', action })
  assert.equal(next.actions[0].id, 'action-new')
  assert.equal(next.actions[0].status, 'pending')
  assert.deepEqual(next.actions[0].evidence, input.evidence)
  assert.equal(state.actions.length, 4)
  assert.equal(next.actions.length, 5)
  assert.deepEqual(selectDemoUser(next, mockUsers[0]), selectDemoUser(state, mockUsers[0]))
  assert.equal(demoReducer(next, { type: 'submit', action }), next)
})

test('revisão atualiza a ação original e impede duplicação, status inválido e outro usuário', () => {
  const state = createDemoState()
  const justification = 'O trajeto aparece no final da gravação.'
  validateReview(state.actions, 1, 'action-3', justification)
  const event = { type: 'review' as const, userId: 1, id: 'action-3', justification, now }
  const next = demoReducer(state, event)
  const reviewed = next.actions.find(action => action.id === 'action-3')!
  assert.equal(reviewed.status, 'in_review')
  assert.deepEqual(reviewed.review, { justification, requestedAt: now })
  assert.equal(state.actions.find(action => action.id === 'action-3')!.status, 'rejected')
  assert.equal(demoReducer(next, event), next)
  assert.equal(demoReducer(state, { ...event, userId: 2 }), state)
  for (const id of ['action-1', 'action-2', 'action-4', 'missing']) {
    assert.throws(() => validateReview(state.actions, 1, id, justification))
  }
  assert.throws(() => validateReview(next.actions, 1, 'action-3', justification))
  assert.throws(() => validateReview(state.actions, 2, 'action-3', justification))
  assert.throws(() => validateReview(state.actions, 1, 'action-3', '   '))
})

test('descrição e evidência inválidas não criam submissões', () => {
  assert.throws(() => createSubmission({ ...input, description: '  ' }, 1, 'invalid', now))
  for (const evidence of [
    { ...input.evidence, type: 'text/plain' },
    { ...input.evidence, size: 0 },
    { ...input.evidence, size: 101 * 1024 * 1024 },
    { ...input.evidence, size: NaN },
    { ...input.evidence, name: '' },
  ]) assert.throws(() => createSubmission({ ...input, evidence }, 1, 'invalid', now))
})

test('nova sessão restaura os mocks sem compartilhar objetos mutáveis', () => {
  const state = createDemoState()
  state.actions[0].evidence.name = 'alterado.mp4'
  state.missions[0].progress.current = 0
  state.rewards[0].progress.current = 0
  const fresh = createDemoState()
  assert.equal(fresh.actions[0].evidence.name, 'reciclagem-demo.mp4')
  assert.equal(fresh.missions[0].progress.current, 1)
  assert.equal(fresh.rewards[0].progress.current, 1)
})
