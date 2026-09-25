import addContactsToSequenceIcon from '@/assets/icons/onboarding/add-contacts-to-sequence.svg';
import addNewContactIcon from '@/assets/icons/onboarding/add-new-contact.svg';
import createYourFirstSequenceIcon from '@/assets/icons/onboarding/create-your-first-sequence.svg';
import integrationSetupIcon from '@/assets/icons/onboarding/integration-setup.svg';
import runYourFirstTaskIcon from '@/assets/icons/onboarding/run-your-first-task.svg';

export const onboardingSteps = [
  { label: 'Integrations Setup', duration: '5 min', icon: integrationSetupIcon },
  { label: 'Add new Contact', duration: '5 min', icon: addNewContactIcon },
  { label: 'Create your first sequence', duration: '10 min', icon: createYourFirstSequenceIcon },
  { label: 'Add contacts to sequence', duration: '5 min', icon: addContactsToSequenceIcon },
  { label: 'Run your first task', duration: '10 min', icon: runYourFirstTaskIcon },
];
