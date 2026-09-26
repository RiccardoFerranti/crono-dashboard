import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('should render its children', () => {
    render(
      <ScrollArea>
        <p>Scrollable content</p>
      </ScrollArea>,
    );

    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('should apply the content constraint class when requested', () => {
    const { container } = render(
      <ScrollArea constrainContentToViewport>
        <p>Scrollable content</p>
      </ScrollArea>,
    );

    expect(container.firstElementChild).toHaveClass('[&>[data-radix-scroll-area-viewport]>div]:!block');
  });
});
