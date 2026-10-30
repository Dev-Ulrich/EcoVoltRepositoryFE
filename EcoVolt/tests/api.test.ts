import assert from "node:assert/strict";
import { test } from "node:test";
import { httpRequest } from "../src/features/live/services/http.ts";
test("HTTP: leitura, escrita, exclusão e erros", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (input, init) => {
      assert.equal(input, "https://api.test/conta-energia");
      assert.equal(init?.method, "POST");
      assert.equal(init?.body, '{"valorConta":10}');
      return new Response('{"id":1}', { status: 201 });
    };
    assert.deepEqual(
      await httpRequest("https://api.test", "/conta-energia", {
        method: "POST",
        body: '{"valorConta":10}',
      }),
      { id: 1 },
    );
    globalThis.fetch = async () => new Response(null, { status: 204 });
    assert.equal(
      await httpRequest("https://api.test", "/conta-energia/1", {
        method: "DELETE",
      }),
      undefined,
    );
    globalThis.fetch = async () =>
      new Response('{"detalhe":"Usuário inexistente"}', { status: 400 });
    await assert.rejects(
      httpRequest("https://api.test", "/conta-energia"),
      /Usuário inexistente/,
    );
    globalThis.fetch = async () => {
      throw new TypeError("network");
    };
    await assert.rejects(
      httpRequest("https://api.test", "/missao"),
      /Não foi possível acessar/,
    );
    await assert.rejects(httpRequest("", "/missao"), /não foi configurada/);
  } finally {
    globalThis.fetch = original;
  }
});
