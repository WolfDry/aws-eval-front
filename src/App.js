import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios'

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [userList, setUserList] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        console.log(JSON.stringify(response.data))
        setUserList(response.data);
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
        throw error;
      }
    }

    fetchData()
      .catch(console.error)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/users', formData)
    setUserList([...userList, { id: (userList.slice(-1).id)+1, name: formData.name, email: formData.email }])
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
    setUserList(userList.filter(user => user.id !== id))
  }

  return (
    <>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Soumettre</button>
      </form>


      <h2>User liste : </h2>
      {userList.map((user) => (
        <>
          <p key={user.id}> name : {user.name} | email : {user.email}</p>
          <button onClick={()=>handleDelete(user.id)}>
            Edit
          </button>
          <button onClick={()=>handleDelete(user.id)}>
            Supprimer
          </button>
        </>
      ))}
    </>
  );
};

export default UserForm;
