import FullList from "./FullList";
import ListItem from "./ListItem";

interface DomTemplate {
    ul: HTMLUListElement,
    clear(): void,
    render(list: FullList): void
}

export default class RenderTemplate implements DomTemplate {

    ul: HTMLUListElement;

    static instance: RenderTemplate = new RenderTemplate();

    constructor(){
        this.ul =  document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = ""
    }

    render(fulllist: FullList): void {

        this.clear();

        const checked = (item: ListItem) => {
            item.checkStatus = !item.checkStatus
            fulllist.save(); 
        }

        const deleteList = (id: string) => {
            
            fulllist.deleteItem(id);
            fulllist.save();
            this.render(fulllist)
            
        }

        fulllist.list.forEach(element => {

            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const input = document.createElement("input") as HTMLInputElement;
            input.type = "checkbox";
            input.id = element.id;
            input .checked = element.checkStatus;
            input.onchange = () => checked(element);

            const label = document.createElement("label");
            label.htmlFor = element.id;
            label.textContent = element.item;

            const button = document.createElement("button");
            button.textContent = "X";
            button.className = "button";
            button.onclick = () => deleteList(element.id);

            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(button);

            this.ul.appendChild(li);
        })

    }
}