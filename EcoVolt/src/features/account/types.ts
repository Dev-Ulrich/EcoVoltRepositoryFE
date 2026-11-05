export interface Mission {
  id: number;
  nome: string;
  descricao: string;
  dificuldade: string;
  pontos: number;
  xp: number;
  status: string;
  participacao: string;
  progresso: number;
  acoes?: Action[];
}
export interface Action {
  id: number;
  nome: string;
  descricao: string;
  pontos: number;
  quantidade?: number;
}
export interface Submission {
  id: number;
  nome: string;
  userId: number;
  status: string;
  descricao: string;
  arquivo: string | null;
  data: string;
  pontos: number;
  actionId: number;
  feedback: string | null;
  revisao: string | null;
  motivoRevisao: string | null;
}
export interface Account {
  id: number;
  nomeTitular: string;
  concessionaria: string;
  numeroInstalacao: string | null;
  mesReferencia: string;
  valorConta: number;
  valorSubsidio: number;
  status: string;
  arquivo: string | null;
}
export interface Reward {
  id: number;
  descricao: string;
  tipo: string;
  valor: number;
  limite: number | null;
  status: string;
  periodo: string;
}
export interface RankingRow {
  id: number;
  nome: string;
  pontos: number;
  xp: number;
  tier: string;
  posicao: number;
}
