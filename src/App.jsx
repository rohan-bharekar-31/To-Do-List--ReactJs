import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [btnTxt, setBtnTxt] = useState("ADD");
  const [showFinished, setShowFinished] = useState(true);

  const storeToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(params));
  };

  useEffect(() => {
    let t = JSON.parse(localStorage.getItem('todos'));
    if (t) {
      setTodos(t);
    }
  }, []);

  useEffect(() => {
    storeToLS(todos);
  }, [todos]);

  const handleAdd = () => {
    if (todo === "") {
      alert("ToDo cannot be empty ");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    if (btnTxt === "SAVE") {
      setBtnTxt("ADD");
    }
  };

  const handleEdit = (e) => {
    setTodos(todos.filter((item) => {
      if (item.id === e.target.name) {
        setTodo(item.todo);
        return false;
      }
      return true;
    }));
    setBtnTxt("SAVE");
  };

  const handleDelete = (e) => {
    setTodos(todos.filter((item) => item.id !== e.target.name));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    setTodos(todos.map((item) => {
      if (item.id === e.target.id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    }));
  };

  const toggleshowFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />

      <div className="container bg-purple-200 rounded-md p-6 min-h-[80vh] mt-10 m-auto flex flex-col items-center w-full md:w-1/2">
        <h1 className="font-bold text-xl">i-Task</h1>

        <div className="addtodo flex flex-col md:flex-row justify-center items-center p-4 gap-4 w-full">
          <h1 className="font-bold">Add a ToDo</h1>
          <input
            className="w-full md:w-auto flex-grow rounded-md p-2"
            type="text"
            value={todo}
            onChange={handleChange}
          />
          <button
            onClick={handleAdd}
            className="p-2 py-1 rounded-md font-bold bg-purple-600 hover:bg-purple-950 text-white"
          >
            {btnTxt}
          </button>
        </div>

        <div className="flex flex-col items-center w-full md:w-9/12 justify-center gap-3">
          <h1 className="font-bold text-3xl text-blue-600 mt-1">Your ToDos</h1>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showFinished"
              onChange={toggleshowFinished}
              checked={showFinished}
            />
            <label htmlFor="showFinished" className="text-blue-600">
              Show Finished Todos
            </label>
          </div>

          <div className="todos flex flex-col w-full items-center gap-3">
            {todos.map((item) => (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo p-2 rounded-md flex justify-between items-center gap-1 w-full bg-white shadow-md flex-wrap"
                >
                  {/* Checkbox and Todo Text */}
                  <div className="flex gap-2 items-center w-full md:w-auto flex-shrink min-w-0 overflow-hidden text-ellipsis">
                    <input
                      type="checkbox"
                      className="mx-1"
                      checked={item.isCompleted}
                      onChange={handleCheckBox}
                      id={item.id}
                    />
                    <label htmlFor={item.id} className="flex-grow">
                      <div
                        className={`overflow-hidden text-ellipsis whitespace-nowrap ${item.isCompleted ? 'line-through' : ''}`}
                      >
                        {item.todo}
                      </div>
                    </label>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={handleEdit}
                      name={item.id}
                      className="p-2 py-1 rounded-md font-bold bg-purple-600 hover:bg-purple-950 text-white mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      name={item.id}
                      className="p-2 py-1 rounded-md font-bold bg-purple-600 hover:bg-purple-950 text-white mx-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )     
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
