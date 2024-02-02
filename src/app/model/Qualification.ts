export class Qualification {
  public isEditing: boolean = false;
  public isAwaitingDeletion: boolean = false;
  public isCreating: boolean =false;
  constructor(
    public id: number,
    public skill: string,
  ) {}

}
