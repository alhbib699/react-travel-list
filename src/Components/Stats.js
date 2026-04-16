export default function Stats({items}) {
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