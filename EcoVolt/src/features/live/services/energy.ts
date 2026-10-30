import { request } from "./api";
import type { Conta, ContaInput } from "../types/api";
export const saveEnergy = (value: ContaInput, id?: number) =>
  request<Conta>(`/conta-energia${id ? `/${id}` : ""}`, {
    method: id ? "PUT" : "POST",
    body: JSON.stringify(value),
  });
export const deleteEnergy = (id: number) =>
  request<void>(`/conta-energia/${id}`, { method: "DELETE" });
export const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
