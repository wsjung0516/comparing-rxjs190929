import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ShortKeyAction } from './short-key.actions';

export interface ShortKeyStateModel {
  items: string[];
}

@State<ShortKeyStateModel>({
  name: 'shortKey',
  defaults: {
    items: []
  }
})
export class ShortKeyState {

  @Selector()
  public static getState(state: ShortKeyStateModel) {
    return state;
  }

  @Action(ShortKeyAction)
  public add(ctx: StateContext<ShortKeyStateModel>, { payload }: ShortKeyAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
