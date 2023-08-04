import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import RenderTemplate from './model/Template';

const fullList = FullList.instance;
const template = RenderTemplate.instance;
const addTask = document.getElementById("itemEntryForm") as HTMLFormElement;
const clearTask = document.getElementById("clearItemsButton") as HTMLButtonElement;

const addTaskToOverallTaskList = (event: SubmitEvent) => {
  event.preventDefault();

  const input = document.getElementById("newItem") as HTMLInputElement;

  let newVal: string = input.value.trim();
  let valId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1

  if(!newVal.length) return

  const newItem: ListItem = new ListItem(valId.toString(), newVal, false);
  console.log(newItem);
  
  fullList.addItem(newItem);
  template.render(fullList);
  
  input.value = "";
}

const clearOverallTaskList = () => {
  fullList.clearList();
  template.clear();
}

const initApp = (): void => {

  addTask.addEventListener("submit", addTaskToOverallTaskList);   // Adding task to ovarall task list click event

  clearTask.addEventListener("click", clearOverallTaskList);      // Clear overall task click event

  fullList.load();

  template.render(fullList);

}

document.addEventListener("DOMContentLoaded", initApp);
