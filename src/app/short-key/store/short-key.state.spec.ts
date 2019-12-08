import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ShortKeyState, ShortKeyStateModel } from './short-key.state';
import { ShortKeyAction } from './short-key.actions';

describe('ShortKey store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShortKeyState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: ShortKeyStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ShortKeyAction('item-1'));
    const actual = store.selectSnapshot(ShortKeyState.getState);
    expect(actual).toEqual(expected);
  });

});
