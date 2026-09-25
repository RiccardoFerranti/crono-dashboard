import { Card } from '@/ui/Card';

export function WelcomeCard() {
  return (
    <Card className="flex flex-col gap-2 px-6 pt-8" aria-labelledby="welcome-title">
      <h1 id="welcome-title" className="text-2xl leading-7.5 font-bold">
        Welcome Alex,
      </h1>
      <p className="text-sidebar-inactive text-sm leading-5 font-normal">
        Here’s your performance overview where you can track your daily and monthly KPIs
      </p>
    </Card>
  );
}
