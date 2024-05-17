import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [note, setNotes] = useState(null);
  useEffect(() => {
    axios
    .get(process.env.REACT_APP_API_URL)
    .then((res) => {
      console.log(res?.data?.data)
      setNotes(res?.data?.data);
    });
  }, []);

  return (
    <div className='App'>
      <h1>Notes</h1>
      {note ? (
        <ul>
          {note?.map((note, index) => (
            <li key={index}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      ): (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
