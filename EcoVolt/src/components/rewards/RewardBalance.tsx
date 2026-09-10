import { Sparkles } from 'lucide-react'

import Card from '../common/Card'

type RewardBalanceProps = {
  points: number
}

function RewardBalance({ points }: RewardBalanceProps) {
  return (
    <Card className="border-emerald-700 bg-emerald-700 !text-white shadow-md dark:border-emerald-500 dark:bg-emerald-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-100">Seu saldo demonstrativo</p>
          <p className="mt-2 text-4xl font-bold tracking-tight">{points.toLocaleString('pt-BR')} <span className="text-lg font-semibold">pontos</span></p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-100">Pontos acumulados em ações aprovadas e missões concluídas. Este catálogo não realiza resgates.</p>
        </div>
        <Sparkles aria-hidden="true" className="shrink-0 text-emerald-200" size={28} />
      </div>
    </Card>
  )
}

export default RewardBalance