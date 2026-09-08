import assert from 'node:assert/strict'
import { test } from 'node:test'
import { authenticateDemo, DEMO_SESSION_KEY, readDemoSession, saveDemoSession } from '../src/auth/demoAuth.ts'
import { demoCredentials } from '../src/data/mockUsers.ts'

function memoryStorage() {
  const entries = new Map<string, string>()
  return {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => { entries.set(key, value) },
    removeItem: (key: string) => { entries.delete(key) },
    entries,
  }
}

test('aceita apenas a conta demonstrativa e normaliza o e-mail', () => {
  const user = authenticateDemo(` ${demoCredentials.email.toUpperCase()} `, demoCredentials.password)
  assert.equal(user.email, demoCredentials.email)
  assert.equal('password' in user, false)
  assert.throws(() => authenticateDemo(demoCredentials.email, 'incorreta'))
  assert.throws(() => authenticateDemo('outro@example.com', demoCredentials.password))
})

test('restaura o acesso pelo ID fictício e remove a sessão ao sair', () => {
  const storage = memoryStorage()
  assert.equal(readDemoSession(storage), null)
  const user = authenticateDemo(demoCredentials.email, demoCredentials.password)
  saveDemoSession(storage, user)
  assert.deepEqual([...storage.entries], [[DEMO_SESSION_KEY, String(user.id)]])
  assert.deepEqual(readDemoSession(storage), user)
  saveDemoSession(storage, null)
  assert.equal(readDemoSession(storage), null)
  assert.equal(storage.entries.size, 0)
})

test('ignora dados inválidos e não aceita dados de usuário inseridos no storage', () => {
  const storage = memoryStorage()
  for (const value of ['invalid', '999', '{"id":1,"points":999999}']) {
    storage.setItem(DEMO_SESSION_KEY, value)
    assert.equal(readDemoSession(storage), null)
  }
})

test('alterações no usuário retornado não modificam o mock original', () => {
  const user = authenticateDemo(demoCredentials.email, demoCredentials.password)
  const originalPoints = user.points
  user.points = -1
  assert.equal(authenticateDemo(demoCredentials.email, demoCredentials.password).points, originalPoints)
})
