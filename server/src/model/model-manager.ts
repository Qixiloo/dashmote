import * as fs from "fs/promises";

export class ModelManager<T extends { name: TYPE }, TYPE> {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getByName(itemName: TYPE) {
    let itemArray = await this.getAll();
    let index = this.findItem(itemArray, itemName);
    if (index === -1)
      throw new Error(
        `Model-Manager; Item with Name:${itemName} doesn't exist`
      );
    else return itemArray[index];
  }

  async getAll(): Promise<T[]> {
    try {
    
      let itemsTxt = await fs.readFile(this.filePath, "utf8");
      let items = JSON.parse(itemsTxt) as T[];
      return items;
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.log("no such files");
        return [];
      } else throw err;
    }
  }

  findItem(itemArray: T[], name: TYPE) {
    return itemArray.findIndex((currItem) => currItem.name === name);
  }

  async save(items: T[] = []) {
    let itemsTxt = JSON.stringify(items);
    await fs.writeFile(this.filePath, itemsTxt);
  }

  async remove(itemName: TYPE) {
    let itemArray = await this.getAll();
    let index = this.findItem(itemArray, itemName);
    if (index === -1)
      throw new Error(`Item with name:${itemName} doesn't exist`);
    else {
      itemArray.splice(index, 1);
      await this.save(itemArray);
    }
  }
}
