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


function PackingList({items , onDeleteItem , onToggleItem , onClearList}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems ;
  if(sortBy === "input") sortedItems = items;
  if( sortBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  if( sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return(
    <div className="list">
      <ul>
      {sortedItems.map((item) => (<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}
      />))}
      </ul>
      <div className="actions">
      <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={()=> onClearList()}>Clear list</button>
      </div>
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

function Stats({items}) {
  if(!items.length) return <p className="stats"><em>Start adding items to your packing list!🚀</em></p>
  const numberOfItems = items.length;
  const numberOfPacked = items.filter(item => item.packed).length;
  const percentPacked = numberOfItems === 0 ? 0 : Math.round((numberOfPacked / numberOfItems) * 100);
  return <footer className="stats">
    {/* <em>🧳You have X item on your list, and you already packed X (X%)</em> */}
    <em>
      {percentPacked === 100 ? "You are ready to go! 🧳✈️" :
      `You packed ${numberOfPacked} out of ${numberOfItems} items
(${percentPacked}% ready for travel ✈️)`}</em>
  </footer>
}

