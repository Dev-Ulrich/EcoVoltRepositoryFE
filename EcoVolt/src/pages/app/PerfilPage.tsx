import { Link } from 'react-router-dom'
import { Award, Leaf } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import ProgressBar from '../../components/common/ProgressBar'
import { actionLinkClass } from '../../components/actions/actionPresentation'
import { useDemoData } from '../../hooks/useDemoData'
import { actionCategories } from '../../data/mockActions'

export default function PerfilPage() {
  const { user, actions, missions, ranking, rewards } = useDemoData()
  if (!user) return null
  const position = ranking.find((entry) => entry.userId === user.id)?.position
  const completed = missions.filter(
    (mission) => mission.status === 'completed',
  ).length
  const ods = actions
    .filter((action) => action.status === 'approved')
    .reduce<Record<number, number>>((result, action) => {
      const id = actionCategories[action.category].ods
      result[id] = (result[id] ?? 0) + 1
      return result
    }, {})
  return (
    <section aria-labelledby="profile-title">
      <div className="flex flex-wrap items-center gap-5">
        <div
          aria-hidden="true"
          className="flex size-20 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-3xl font-bold text-emerald-900"
        >
          PD
        </div>
        <div>
          <h1 id="profile-title" className="text-3xl font-bold">
            {user.displayName}
          </h1>
          <p className="mt-2 break-all">{user.email}</p>
          <div className="mt-2">
            <Badge variant="info">Perfil demonstrativo · {user.tier}</Badge>
          </div>
        </div>
      </div>
      <p className="my-6 text-slate-600 dark:text-emerald-100">
        Seus indicadores refletem as ações e missões desta sessão. As alterações
        reiniciam ao recarregar ou sair.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Pontos', value: user.points },
          { label: 'Experiência', value: `${user.xp} XP` },
          { label: 'Ações aprovadas', value: user.completedActions },
          { label: 'Posição no tier', value: position ? `#${position}` : '—' },
        ].map((item) => (
          <Card key={item.label} className="shadow-sm">
            <h2 className="text-sm font-semibold">{item.label}</h2>
            <p className="mt-3 text-3xl font-bold">{item.value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <h2 className="mb-5 text-xl font-bold">Progresso das missões</h2>
          <ProgressBar
            value={
              missions.length
                ? Math.round((completed / missions.length) * 100)
                : 0
            }
            label={`${completed} de ${missions.length} missões concluídas`}
          />
          <Link className={`${actionLinkClass} mt-5`} to="/app/missoes">
            Ver missões
          </Link>
        </Card>
        <Card className="shadow-sm">
          <h2 className="text-xl font-bold">ODS das suas contribuições</h2>
          {Object.keys(ods).length ? (
            <ul className="mt-4 space-y-3">
              {Object.entries(ods)
                .sort((a, b) => b[1] - a[1])
                .map(([id, count]) => (
                  <li key={id} className="flex items-center gap-3">
                    <Leaf aria-hidden="true" size={20} />
                    <span>
                      ODS {id} · {count}{' '}
                      {count === 1 ? 'ação aprovada' : 'ações aprovadas'}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="mt-4">
              Suas ODS aparecerão após a primeira aprovação simulada.
            </p>
          )}
        </Card>
      </div>
      <h2 className="mb-5 mt-10 text-2xl font-bold">Conquistas</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {rewards.map((reward) => (
          <Card key={reward.id} className="shadow-sm">
            <Award
              aria-hidden="true"
              className="text-emerald-600 dark:text-emerald-300"
            />
            <h3 className="mt-4 font-bold">{reward.title}</h3>
            <p className="my-3 text-sm">{reward.requirement}</p>
            <Badge
              variant={reward.status === 'available' ? 'success' : 'neutral'}
            >
              {reward.status === 'available' ? 'Desbloqueada' : 'A conquistar'}
            </Badge>
          </Card>
        ))}
      </div>
      <Link className={`${actionLinkClass} mt-6`} to="/app/recompensas">
        Explorar recompensas
      </Link>
    </section>
  )
}
