import { useState } from "react";
 


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

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems}/>
      <PackingList items={items } onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌍 FAR AWAY 🧳</h1>
}


function Form({onAddItem}) {
const [description, setDescription] = useState("");
const [quantity, setQuantity] = useState(1);



  function handleSubmit(e) {
    e.preventDefault();
    
    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);  
  }

  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>Your smart travel packing assistant?</h3>
    <select value={quantity} onChange={(q) => setQuantity(parseInt(q.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (<option value={num} key={num}>{num}</option>))}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
    <button>➕ Add</button>  
  </form>
}


function PackingList({items , onDeleteItem , onToggleItem}) {
  return(
    <div className="list">
    <ul>
      {items.map((item) => (<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}
      />))}
    </ul>
    </div>
  );
}

function Item({ item , onDeleteItem, onToggleItem}) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={()=>onToggleItem(item.id)}/>
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity}  {item.description}</span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}

function Stats() {
  return <footer className="stats">
    {/* <em>🧳You have X item on your list, and you already packed X (X%)</em> */}
    <em>You packed packedItems out of totalItems items
(percent ready for travel ✈️)</em>
  </footer>
}

