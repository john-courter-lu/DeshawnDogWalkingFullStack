import { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getDogById, getDogs } from "../apiManager.js"

export const DogDetail = () => {
    const { dogId } = useParams()
    const [dog, setDog] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            getDogById(dogId)
                .then(setDog)
        },
        [dogId]
    )

    return (
        <article className="dogs">
          <h2>Dog Info Details</h2>
          <section className="dog" key={`dog--${dog.id}`}>
            <div className="dog__header">
              {dog.name}
            </div>
            <div className="dog__details">
              <div>
                <strong>City:</strong> {dog.city ? dog.city.name : "Unknown"}
              </div>
              <div>
                <strong>Walker:</strong> {dog.walker ? dog.walker.name : "No Walker Assigned"}
              </div>
            </div>
          </section>
        </article>
      );
      
}
