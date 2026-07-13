import './App.css';

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#effcff",
    }}>
      {/* form to submit tasks */}
      <h1>Progress Tracker</h1>
      <form style={{
        display: "flex",
        gap: "10px",}}>
        <input type="text" style={{ height: "30px" ,fontSize:"16px",borderRadius:"5px" }} placeholder="Task name"></input>
        <input type="date"  style={{ height: "30px" ,fontSize:"16px",borderRadius:"5px"} }></input>
        <button  style={{ height: "30px " ,fontSize:"16px",borderRadius:"5px" }} >Add Task</button>
      </form>
    </div>
  );
}

export default App;
