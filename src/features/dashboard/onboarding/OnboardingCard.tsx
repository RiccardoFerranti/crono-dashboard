import { Card } from '@/ui/Card';
import { ScrollArea } from '@/ui/ScrollArea';
import { onboardingSteps } from './consts';

export function OnboardingCard() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-3 overflow-hidden" aria-labelledby="onboarding-title">
      <h2 id="onboarding-title" className="text-ink shrink-0 text-sm leading-5.5 font-semibold">
        Onboarding
      </h2>
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 pr-2">
          {onboardingSteps.map((step, index) => (
            <div key={step.label} className="contents">
              <div className="flex items-center">
                <div className="flex items-center gap-4">
                  <img src={step.icon} alt="" className="size-10 shrink-0 object-contain" />
                  <span className="text-ink text-sm leading-5.5 font-semibold">{step.label}</span>
                </div>
                <span className="text-sidebar-inactive ml-auto text-sm leading-6 font-normal tracking-normal">
                  {step.duration}
                </span>
              </div>
              {index < onboardingSteps.length - 1 && <div aria-hidden="true" className="bg-divider h-px" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
