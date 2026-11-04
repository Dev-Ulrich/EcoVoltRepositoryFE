export interface Missao {
  id: number;
  nome: string;
  descricao: string;
  pontuacaoRecompensa: number;
  status: boolean;
}

export interface Conta {
  id: number;
  nomeTitular: string;
  mesReferencia: string;
  valorConta: number;
  statusPagamento: string;
}

export interface Recompensa {
  id: number;
  descricao: string;
  valor: number;
  status: string;
}

export interface Ranking {
  id: number;
  idUsuario: number;
  posicao: number;
  pontuacaoTotalPeriodo: number;
  periodoReferencia: string;
}