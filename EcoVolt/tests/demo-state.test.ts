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

test('aprovação atualiza pontos, XP, missão e ranking sem conceder bônus duplicados', async () => {
  const { selectMissions, selectRewards } = await import('../src/data/demoState.ts')
  const initial = createDemoState()
  const action = createSubmission({ ...input, category: 'composting' }, 1, 'new-compost', now)
  const sent = demoReducer(initial, { type: 'submit', action })
  const approved = demoReducer(sent, { type: 'resolve', userId: 1, id: action.id, approved: true, reason: '' })
  const user = selectDemoUser(approved, mockUsers[0])
  assert.equal(user.points, 325) // 115 + 80 da ação + 50 e 80 das duas missões.
  assert.equal(user.xp, 380) // 90 + 40 da ação + 100 e 150 das missões.
  assert.equal(user.completedActions, 2)
  assert.equal(user.activeMissions, 0)
  assert.ok(selectMissions(approved, 1).every(mission => mission.status === 'completed'))
  assert.equal(selectRewards(approved, user).find(reward => reward.id === 'reward-2')?.status, 'available')
  assert.equal(selectRanking(approved, user).find(entry => entry.userId === 1)?.position, 1)
  assert.equal(demoReducer(approved, { type: 'resolve', userId: 1, id: action.id, approved: true, reason: '' }), approved)
  assert.equal(demoReducer(sent, { type: 'resolve', userId: 2, id: action.id, approved: true, reason: '' }), sent)
})

test('recusa exige motivo e permite revisão seguida de aprovação', () => {
  const initial = createDemoState()
  const invalid = demoReducer(initial, { type: 'resolve', userId: 1, id: 'action-1', approved: false, reason: '' })
  assert.equal(invalid, initial)
  const rejected = demoReducer(initial, { type: 'resolve', userId: 1, id: 'action-1', approved: false, reason: 'O vídeo não mostra a separação dos resíduos.' })
  validateReview(rejected.actions, 1, 'action-1', 'A separação está visível ao final do vídeo.')
  const review = demoReducer(rejected, { type: 'review', userId: 1, id: 'action-1', justification: 'A separação está visível ao final do vídeo.', now })
  const approved = demoReducer(review, { type: 'resolve', userId: 1, id: 'action-1', approved: true, reason: '' })
  assert.equal(approved.actions.find(action => action.id === 'action-1')?.status, 'approved')
  assert.equal(approved.actions.find(action => action.id === 'action-1')?.rejectionReason, undefined)
  assert.equal(selectDemoUser(approved, mockUsers[0]).points, 235)
})
