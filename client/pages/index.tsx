import { useEffect, useState } from "react";

import NavBar from "../src/components/NavBar/NavBar";
import Footer from "../src/components/Footer/Footer";
import BallotCard from "../src/types/BallotCard";
import axios from "axios";

export default function Home() {
  const [viewItems, setViewItems] = useState<boolean[]>(Array(10).fill(false));
  const [ballotCards, setBallotCards] = useState<BallotCard[]>([]);

  useEffect( () => {
    async function fetchBallotCards() {
      try {
        const response  = await axios.get("http://localhost:8000/users/ballots/items");
        const data = await response.data
        console.log(data);
        setBallotCards(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBallotCards();
  }, [])

  const handleView = (event, index) => {
    // event.preventDefault();

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

  const renderItems = (index) => {
    if (viewItems[index] === false) return null;
    else {
      return ( 
        <div style={{
          borderRadius: "10px",
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
                  <button> {item} </button>
                </li>
              );
            }) }
          </ol>  
        </div>
      )
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


      {/* TODO: Adjust Footer so it is limited in size */}
      <Footer />
    </div>
  );
}
