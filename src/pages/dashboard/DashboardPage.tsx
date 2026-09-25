import { RepliesCard } from '@/features/dashboard/replies/Replies';
import { PerformanceCard } from '@/features/dashboard/performance/PerformanceCard';
import { TasksCard } from '@/features/dashboard/tasks/TasksCard';
import { WelcomeCard } from '@/features/dashboard/welcome/Welcome';
import { Card } from '@/ui/Card';
import { Sidebar } from './components/Sidebar';

export function DashboardPage() {
  return (
    <div className="bg-canvas text-ink flex min-h-dvh">
      <Sidebar />
      <main
        aria-label="Dashboard"
        className="grid min-w-0 flex-1 gap-2 p-4 xl:h-dvh xl:min-h-160 xl:grid-cols-[minmax(0,1fr)_408px]"
      >
        <div className="grid min-w-0 gap-2 xl:min-h-0 xl:grid-rows-[auto_auto_minmax(0,1fr)]">
          <div className="grid min-w-0 items-start gap-2 sm:grid-cols-2">
            <WelcomeCard />
            <RepliesCard />
          </div>
          <TasksCard />
          <Card className="flex min-h-70 min-w-0 flex-col overflow-hidden" aria-labelledby="signals-title">
            <div className="shrink-0 p-4">
              <h2 id="signals-title" className="text-ink text-sm font-semibold">
                Signals
              </h2>
            </div>
            <div className="min-h-0 flex-1 xl:overflow-y-auto" />
          </Card>
        </div>
        <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:min-h-0 xl:grid-cols-1 xl:grid-rows-[293px_minmax(280px,1fr)]">
          <PerformanceCard />
          <Card className="min-h-70 p-4" aria-labelledby="onboarding-title">
            <h2 id="onboarding-title" className="text-ink text-sm font-semibold">
              Onboarding
            </h2>
          </Card>
        </div>
      </main>
    </div>
  );
}
