import { Card } from '@/ui/Card';
import { Sidebar } from './components/Sidebar';

// Layout placeholders only. Feature components will replace each card's content.
export function DashboardPage() {
  return (
    <div className="bg-canvas text-ink flex min-h-dvh">
      <Sidebar />
      <main
        aria-label="Dashboard"
        className="grid min-w-0 flex-1 gap-2 p-4 xl:h-dvh xl:min-h-160 xl:grid-cols-[minmax(0,1fr)_408px]"
      >
        <div className="grid min-w-0 gap-2 xl:min-h-0 xl:grid-rows-[142px_143px_minmax(280px,1fr)]">
          <div className="grid min-w-0 gap-2 sm:grid-cols-2">
            <Card className="min-h-35.5 p-6" aria-labelledby="welcome-title">
              <h1 id="welcome-title" className="text-ink text-2xl font-bold">
                Welcome Alex,
              </h1>
            </Card>
            <Card className="min-h-35.5 p-4" aria-labelledby="replies-title">
              <h2 id="replies-title" className="text-inktext-sm font-semibold">
                Replies
              </h2>
            </Card>
          </div>
          <Card className="min-h-35.75 p-4" aria-labelledby="tasks-title">
            <h2 id="tasks-title" className="text-ink text-sm font-semibold">
              Today’s tasks
            </h2>
          </Card>
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
          <Card className="min-h-73.25 p-4" aria-labelledby="performance-title">
            <h2 id="performance-title" className="text-ink text-sm font-semibold">
              May’s performance
            </h2>
          </Card>
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
