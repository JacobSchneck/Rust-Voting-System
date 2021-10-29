import { useState } from "react";

import NavBar from "../src/components/Navbar/NavBar";
import Footer from "../src/components/Footer/Footer";

export default function Home() {
  const [viewItems, setViewItems] = useState<boolean[]>(Array(10).fill(false));

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
          borderRadius: "3px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "10px"
        }}>
          <ol style={{display: "grid" }}> 
            <li> <button> Thing       </button> </li>
            <li> <button> Object      </button> </li>
            <li> <button> Wing Doodle </button> </li>
            <li> <button> SpeckleDorf </button> </li>
          </ol>  

        </div>
      )
    }
  }

  const renderBallots = () => {
    const arr = Array(10).fill(0);
    return (
      arr.map( (el, index) => {
        return (
          <div style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            padding: "1%"
          }}>
              {/* <h1> */}
                Ballot Description
              {/* </h1> */}

              <button style={{marginLeft: "5px"}} onClick={(event) => handleView(event, index)}>
                View
              </button>
              {renderItems(index)}

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
