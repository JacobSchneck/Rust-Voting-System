import { useEffect, useState } from "react";

import NavBar from "../src/components/NavBar/NavBar";
import Footer from "../src/components/Footer/Footer";
import axios from "axios";

import BallotCard from "../src/types/BallotCard";

import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const [viewItems, setViewItems] = useState<boolean[]>(Array(10).fill(false));
  const [ballotCards, setBallotCards] = useState<BallotCard[]>([]);
  const { user } = useUser();

  useEffect( () => {
    async function fetchBallotCards() {
      try {
        const response  = await axios.get("http://localhost:8000/users/ballots/items");
        const data = await response.data
        setBallotCards(data);
      } catch (e) {
      }
    };
    fetchBallotCards();
  }, [])

  const handleView = (event: any, index: number) => {
    if (viewItems[index]) {
      console.log(`Goodbye ballot #${index}`);
      viewItems[index] = false;
      setViewItems([...viewItems]);
    } else {
      console.log(`Hello ballot: #${index}`);
      viewItems[index] = true;
      setViewItems([...viewItems]);
    }
  }

  // TODO: Actually record votes
  const handleVote = () => {
    if (!user) {
      alert("In order to vote please log in.");
      return;
    }

    alert("Thank you for voting");
  }

  const renderItems = (index: number) => {
    if (viewItems[index] === false) return null;
    else {
      return ( 
        <div style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "10px"
        }}>
          <ol style={{display: "grid" }}> 
            { ballotCards[index].items.map( (item, index) => {
              return (
                <li key={`${item}-${index}`}> 
                  <button onClick={() => handleVote()}> {item} </button>
                </li>
              );
            }) }
          </ol>  
        </div>
      );
    }
  }

  const renderBallots = () => {
    return (
      ballotCards.map( (card, index) => {
        return (
          <div key={`${card.title}-${index}}`} style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            padding: "1%"
          }} onClick={(event)=> handleView(event, index)}>
              <div> {card.title} </div>
              <div> {renderItems(index)} </div>
              <div> {card.username} </div>
          </div>
        )
      })
    )
  }

  return (
    <div>
      <NavBar />
      <div style={{ 
        border: "1px solid black",
        textAlign: "center"}}>
        Filters
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        { renderBallots() }

      </div>

      <Footer />
    </div>
  );
}
