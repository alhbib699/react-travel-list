import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
const [items, setItems] = useState([]);

function handleAddItems(item){
  setItems(items => [...items, item]);
}

function handleToggleItem(id){
  setItems(items=>items.map(item=> item.id === id ? {...item, packed: !item.packed} : item));
}

function handleDeleteItems(id){
  setItems(items => items.filter(item => item.id !== id));
}
function handleClearList(){
  setItems([]);
}

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems}/>
      <PackingList items={items } onClearList={handleClearList} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem}/>
      <Stats  items ={items}/>
    </div>
  );
}
