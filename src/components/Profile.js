import { useState } from 'react'

function Profile({ currentUser }) {
  const [updatedUser, setUpdatedUser] = useState(currentUser)
  const [clicked, setClicked] = useState(false)

  function handleEdit(e) {
    e.preventDefault()
    fetch(`/users/${currentUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value
      })
    })
    .then(res => res.json())
    .then(user => {
      setUpdatedUser(user)
      setClicked(false)
    })
    e.target.reset()
  }

  const onClick = () => {
    setClicked(!clicked)
  }

  const changeInput = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
  })
  }

  return(
    <div className="profile-container">
      <h1>My Profile</h1>
      {clicked ?
      <div>
      <form onSubmit={e => handleEdit(e)}>
        <label><b>Name: </b></label>
        <input className="profile-inputs" type="text" name="name" value={updatedUser.name} onChange={changeInput}/>
        <br />< br/>
        <label><b>Username: </b></label>
        <input className="profile-inputs" type="text" name="username" value={updatedUser.username} onChange={changeInput}/>
        <br />< br/>
        <label><b>Password: </b></label>
        <input className="profile-inputs" type="password" name="password" value={updatedUser.password} onChange={changeInput}/>
        <br />< br/>
        <button className="comment-btn">Save</button>
      </form> <br />
      <button className="comment-btn" onClick={onClick}>Cancel</button>
      </div>
      :
      <div>
        <label><b>Name: </b>{updatedUser.name}  </label><br />< br/>
        <label><b>Username: </b>{updatedUser.username}  </label><br />< br/>
        <label><b>Password: </b>******</label><br />< br/>
        <button className="comment-btn" onClick={onClick}>Edit Profile</button>
      </div>
      }
    </div>
  )
}

export default Profile
