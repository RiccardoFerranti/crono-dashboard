export type SignalCategory = 'role-change' | 'company-change' | 'website-view';

export type SignalMessagePart = {
  text: string;
  emphasis?: 'strong' | 'accent';
};

export type Signal = {
  id: string;
  category: SignalCategory;
  inSequence: boolean;
  message: SignalMessagePart[];
  date: string;
  image: {
    src: string;
    alt: string;
  };
};
