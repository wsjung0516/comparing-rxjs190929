import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PaintComponent } from './paint.component';

describe('PaintComponent', () => {
  let spectator: Spectator<PaintComponent>;

  const createComponent = createComponentFactory(PaintComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
