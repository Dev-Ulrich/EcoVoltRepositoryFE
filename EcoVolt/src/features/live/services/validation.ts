import type { ContaInput } from "../types/api";
export function validateEnergy(value: ContaInput): string {
  if (!Number.isSafeInteger(value.idUsuario) || value.idUsuario <= 0)
    return "Selecione um usuário válido.";
  if (!value.nomeTitular.trim() || !value.concessionaria.trim())
    return "Preencha o titular e a concessionária.";
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value.mesReferencia))
    return "Informe um mês válido.";
  if (
    !Number.isFinite(value.valorConta) ||
    value.valorConta < 0 ||
    value.valorConta > 99999999.99
  )
    return "Informe um valor de conta válido.";
  return "";
}
