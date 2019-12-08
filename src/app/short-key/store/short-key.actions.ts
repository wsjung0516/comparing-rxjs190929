export class ShortKeyAction {
  public static readonly type = '[ShortKey] Add item';
  constructor(public payload: string) { }
}