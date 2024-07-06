import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { getDocs, collection, addDoc, query, orderBy } from 'firebase/firestore';
import { exportedScoreboard } from './Game';
import '../styles/styles.css';

// This Component responsible for displaying the table of 3 top players
function Leaderboard() {

  const [players, setPlayers] = useState([]);
  const playersCollectionRef = collection(db, "player");

  // When enter to this page:
  // Read the data from the Firebase DB, and update it in the table
  useEffect(() => {
    getPlayersListFromDbAndSetInTable();
  }, []);

  // When scoreboard is updated in the Game page, addDataToFireBase() triggered
  useEffect(() => {
     if (exportedScoreboard.length > 0){
        addDataToFireBase();
     }
  }, [exportedScoreboard]);

  // Get players list from Firebase DB, and set it in the table
  const getPlayersListFromDbAndSetInTable = async () => {
    try {
      const data = await getDocs(query(playersCollectionRef, orderBy("time", "asc"))); // get the data in sorted order
      const filteredData = data.docs.map((doc) => ({ ...doc.data() }));
      setPlayers(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to add data to Firebase
  const addDataToFireBase = async () => {
    try {
      for (let player of exportedScoreboard) {
        await addDoc(playersCollectionRef, {
            name: player.name, 
            time: player.time
          });
      }
      // After adding data to firebase, update the table in the web
      getPlayersListFromDbAndSetInTable();
    } catch (err) {
      console.log(err);
    }
  };

  // get only the top 3 players
  const topPlayers = players.slice(0, 3);

  return (
    <div className="content">
      <h2>Top 3 table</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.time.toFixed(3)} sec</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
