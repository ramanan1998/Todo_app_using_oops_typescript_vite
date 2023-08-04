import ListItem from "./ListItem";

export interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(obj: ListItem): void,
    deleteItem(id: string): void
}

export default class FullList implements List {

    private _list: ListItem[] = [];

    static instance: FullList = new FullList();

    private constructor(list: ListItem[] = []){
        this._list = list;
    }

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        
        const storedList: string | null = localStorage.getItem("myList");
        
        if(typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checkStatus: boolean }[] = JSON.parse(storedList);
        
        parsedList.forEach(item => {
            const newListItem: ListItem = new ListItem(item._id, item._item, item._checkStatus);
            this.addItem(newListItem);
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(obj: ListItem): void {
        this._list.push(obj);
        this.save();
    }

    deleteItem(id: string): void {
        this._list = this._list.filter((element: ListItem) => element.id !== id);
        // console.log(this._list)
        this.save();
    }
}