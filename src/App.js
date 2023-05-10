import { MyMeals } from './MyMeals';
import './App.css';
import { useEffect, useState } from 'react';
import { getAllMeals, addMeal, editMeal, deleteMeal } from './FetchMeals';


function App() {

  const [myMeal, setMeal] = useState([]);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const [mealId, setMealId] = useState('');

  useEffect(() => {
    getAllMeals(setMeal)
  }, [])

  const updatingInInput = (_id, title) => {
    setEditing(true)
    setTitle(title)
    setMealId(_id)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    addMeal(title, setMeal, setTitle)
  }

  return (
    <div className="App">
      <h1>Meal Plan</h1>

      <form onSubmit={finalSearch}>
        <input type='text' placeholder='Add a meal' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} />
      </form>
      
      <button 
      disabled={!title}
      onClick={editing ? () => editMeal(mealId, title, setMeal, setTitle, setEditing) : () => addMeal(title, setMeal, setTitle)}>
      {editing ? 'Edit' : 'Add'}
      </button>

      {myMeal.map((meal) => 
      <MyMeals text={meal.title} key={meal._id} 
      updatingInInput = {() => updatingInInput(meal._id, meal.title)} 
      deleteMeal={() => deleteMeal(meal._id, setMeal)}
      />
      )}
      
    </div>
  );
}

export default App;
