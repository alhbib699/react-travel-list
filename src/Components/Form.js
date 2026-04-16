import { useState } from "react";

export default function Form({onAddItem}) {
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