export class Category {
  public id: number;
  public name: string;
  public hasBooks: boolean = false;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
