export class Todo {

  public id: number;
  public description: string;
  public isDone: boolean;
  public targetDate: Date;

  constructor(id: number, description: string, isDone: boolean, targetDate: Date) {
    this.id = id;
    this.description = description;
    this.isDone = isDone;
    this.targetDate = targetDate;
  }

}
