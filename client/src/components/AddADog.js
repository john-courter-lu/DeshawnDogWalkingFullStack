import { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getCities } from "../apiManager.js"

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

    const handleSaveButtonClick = (event) => {

        event.preventDefault()

        //第一步 用POST 新建一个dog json
        const dogObjToSend = {
            name: newDog.name,
            cityId: newDog.cityId,
        };

        //第二步 用POST 于API连接

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