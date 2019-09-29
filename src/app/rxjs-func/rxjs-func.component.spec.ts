import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RxjsFuncComponent } from './rxjs-func.component';

describe('RxjsFuncComponent', () => {
  let spectator: Spectator<RxjsFuncComponent>;

  const createComponent = createComponentFactory(RxjsFuncComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
