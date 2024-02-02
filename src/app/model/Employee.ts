import {Qualification} from "./Qualification";

export class Employee {
  public isEditing: boolean = false; // Дополнительное свойство для контроля режима редактирования
  public isAwaitingDeletion: boolean = false;
  public isCreating: boolean =false;
  public temporarySkillSet: string = '';
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public street: string,
    public postcode: string,
    public city: string,
    public phone: string,
    public skillSet:Qualification[]
  ) {}

}
