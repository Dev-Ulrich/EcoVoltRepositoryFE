import { Sparkles } from 'lucide-react'


type RewardBalanceProps = {
  points: number
}

function RewardBalance({ points }: RewardBalanceProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#073e30] p-6 text-white sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-100">Seu saldo de conquistas</p>
          <p className="mt-2 text-4xl font-bold tracking-tight">{points.toLocaleString('pt-BR')} <span className="text-lg font-semibold">pontos</span></p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-100">Pontos acumulados em ações aprovadas e missões concluídas. Este catálogo não realiza resgates.</p>
        </div>
        <Sparkles aria-hidden="true" className="shrink-0 text-emerald-200" size={28} />
      </div>
    </div>
  )
}

export default RewardBalance