export interface Missao { id:number; nome:string; descricao:string; dificuldade:string; pontuacaoRecompensa:number; xpRecompensa:number; quantidadeSemanal:number; tipo:string; status:boolean; idTier:number; idNivel:number }
export type StatusPagamento = 'PENDENTE' | 'PAGO' | 'SUBSIDIADO';
export interface ContaInput { idUsuario:number; idRecompensa:number|null; nomeTitular:string; concessionaria:string; numeroInstalacao:string; mesReferencia:string; valorConta:number; valorSubsidio:number; arquivoComprovante:string|null; statusPagamento:string }
export type Conta = ContaInput & {id:number};
export interface Usuario {id:number; nome:string}
