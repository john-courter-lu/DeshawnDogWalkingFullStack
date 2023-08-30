import { Link } from "react-router-dom";
import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  const [dogs, setDogs] = useState([])

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDogs()
      .then(setDogs)
      .catch(() => {
        console.log("API not connected");
      });
  }, [])

  return (<>
    <p>{greeting.message}</p>
    <h2>List of Dogs</h2>
    <article className="dogs">
      {
        dogs.map(dog => {
          return (
            <section className="dog" key={`dog--${dog.id}`}>
              <div> {dog.name}</div>
            </section>
          )
        })
      }

    </article>
  </>)
}
