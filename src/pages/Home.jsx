import { useEffect, useState } from "react";
import "../App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Home() {
  // State variables
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [controlBtn, setControlBtn] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null); // State for selected priority filter

  // Function to add a new todo
  const handleAddNewToDo = () => {
    let updatedTodoArr = [...allTodos];
    if (editIndex !== null) {
      updatedTodoArr[editIndex] = {
        title: newTodoTitle,
        description: newDescription,
        priority: priority,
      };
      setEditIndex(null);
      setControlBtn(false);
    } else {
      let newToDoObj = {
        title: newTodoTitle,
        description: newDescription,
        priority: priority,
      };
      updatedTodoArr.push(newToDoObj);
    }
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewDescription("");
    setNewTodoTitle("");
  };

  // Effect hook to load todos from local storage on component mount
  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  // Function to delete a todo
  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  // Function to handle updating a todo
  const handleUpdate = (index) => {
    setEditIndex(index);
    const todoToEdit = allTodos[index];
    setNewTodoTitle(todoToEdit.title);
    setNewDescription(todoToEdit.description);
    setPriority(todoToEdit.priority);
    setControlBtn(true);
  };

  // Function to delete a completed todo
  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  // Function to mark a todo as completed
  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;
    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );
    handleToDoDelete(index);
  };

  // Function to handle priority selection for filtering todos
  const handlePrioritySelect = (selectedPriority) => {
    setSelectedPriority(selectedPriority);
  };

  // Filtered todos based on selected priority
  const filteredTodos = selectedPriority
    ? allTodos.filter((todo) => todo.priority === selectedPriority)
    : allTodos;

  return (
    <div className="w-[100%]">
      <h1 className="text-5xl mt-4">Todo List App</h1>
      <div className="todo-wrapper shadow-lg rounded-lg shadow-green-900">
        <div className="todo-input flex flex-col md:flex-row">
          {/* Input fields for adding a new todo */}
          <div className="todo-input-item">
            <label className="mt-2 mb-2 md:mb-0">Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Title:"
              className="text-gray-500"
              required
            />
          </div>
          <div className="todo-input-item">
            <label className="mt-2 mb-2 md:mb-0">Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description:"
              className="text-gray-500"
              required
            />
          </div>

          <div className="todo-input-item">
            <label className="mt-2 mb-2 md:mb-0">Priority:</label>
            {/* Dropdown for selecting priority */}
            <select
              className="text-gray-500 py-2 rounded-md"
              value={priority}
              required
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="todo-input-item mt-1">
            <button
              className="primary-btn py-2"
              type="button"
              onClick={handleAddNewToDo}
            >
              {/* Button text changes based on the operation (add or update) */}
              {controlBtn ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="btn-area">
          {/* Buttons to switch between in-complete and completed todos */}
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            In-Complete
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        {/* Total number of todos */}
        <div className="flex items-center gap-4">
          <h2 className="pt-2 text-xl">Total Todos: {allTodos.length}</h2>
          {/* Dropdown for filtering todos by priority */}
          <div className="todo-input-item">
            <label className="my-2">Filter Priority</label>
            <select
              className="text-gray-500 rounded-md"
              value={selectedPriority}
              required
              onChange={(e) => handlePrioritySelect(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        {/* List of todos */}
        <div className="todo-list mt-10">
          {/* Rendering in-complete or filtered todos based on screen */}
          {isCompletedScreen === false &&
            filteredTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="text-3xl text-white my-2 w-[35%] underline rounded-lg">
                    {item.priority}
                  </p>
                </div>
                <div className="flex justify-center gap-4 items-center">
                  {/* Icons for edit, delete, and complete operations */}
                  <FaEdit
                    title="edit?"
                    className="icon"
                    onClick={() => handleUpdate(index)}
                  />
                  <RiDeleteBin6Fill
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}

          {/* Rendering completed todos */}
          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <i>Completed at: {item.completedOn}</i>
                  </p>
                </div>
                <div>
                  {/* Icon for deleting completed todo */}
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
