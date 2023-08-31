import { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getCities, createDog } from "../apiManager.js"

export const AddADog = () => {

    const [newDog, setNewDog] = useState({})
    const [cities, setCities] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getCities()
                .then(setCities)
        },
        []
    )

    const handleSaveButtonClick = async (event) => {

        event.preventDefault()

        //step 1 create a dog object as the a json body sent to API POST
        const dogObjToSend = {
            name: newDog.name,
            cityId: parseInt(newDog.cityId) 
            // Parse cityId to an integer
        };

        //Step 2 use creatDog in apiManager to post the dog json
        try {

            const createdDog = await createDog(dogObjToSend);

            // Handle success - you can navigate or perform any other action here
            console.log("New dog created:", createdDog);

            navigate(`/dogs/${createdDog.id}`);
            // Navigate to the dog detail page 

        } catch (error) {
            // Handle error - display an error message or take appropriate action
            console.error("Error creating a new dog:", error);
        }
    }


    return (
        <>
            <form className="treatment__form">
                <h2 className="treatment__title">Add A New Dog</h2>
                <fieldset >

                    <div className="form-group">
                        <label htmlFor="name-input">Name</label>
                        <textarea id='name-input'
                            className="form-control"
                            required autoFocus
                            rows="1"

                            placeholder="New Dog Name"
                            value={newDog.name}

                            onChange={(evt) => {
                                const copy = { ...newDog }
                                copy.name = evt.target.value
                                setNewDog(copy)
                            }}
                        >
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city-select">City</label>
                        <select id='city-select'
                            className="form-control"
                            required autoFocus
                            onChange={(evt) => {
                                const copy = { ...newDog }
                                copy.cityId = evt.target.value
                                setNewDog(copy)
                            }}
                        >
                            <option value='0'>Please Choose</option>
                            {cities.map(city => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>

                </fieldset>

                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Submit
                </button>
            </form>

        </>

    )

}