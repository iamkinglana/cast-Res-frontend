
function Logout({ trigger, setTrigger, handleLogout }) {

  return (trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setTrigger(false)}>X</button>
        <h1>Are you sure you want to logout?</h1>
        <button className="create-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  ): null )
} 
 
export default Logout