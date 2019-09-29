import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CanvasComponent } from './canvas.component';

describe('CanvasComponent', () => {
  let spectator: Spectator<CanvasComponent>;

  const createComponent = createComponentFactory(CanvasComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
