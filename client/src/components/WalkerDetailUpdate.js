
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateWalker } from "../apiManager";

const WalkerDetailUpdate = ({ walker, setSelectedWalker, cities }) => {
    const navigate = useNavigate();
    const [updatedWalker, setUpdatedWalker] = useState(walker);

    //下面是保证: 点击不同walker时, email和name的return也跟着改变
    useEffect(
        () => {
            setUpdatedWalker(walker)
        }
        , [walker])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedWalker({ ...updatedWalker, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            // Call the updateWalker function with the updated data
            await updateWalker(walker.id, updatedWalker);

            //通过设置下面的, 来让Edit Walker Details消失 
            setSelectedWalker(null);
            // Redirect to the list of walkers
            navigate("/walkers");

            // Implement this part to update cities
            // You can send a PUT request to update the walker in the backend
            // Then redirect to the list of walkers
            // Example: navigate("/walkers");
            
        } catch (error) {
            console.error("Error updating walker:", error);
        }
    };

    useEffect(() => {
        // Fetch the list of cities here (you need to implement this)
        // The cities should be an array of objects with id and name properties
        // You can set the initial state to match the cities the walker currently walks
    }, []);

    const handleCitiesCheckboxChange = (cityId) => {
        // Implement this function to update the selected cities in the state
        // You should update the updatedWalker object accordingly
    };


    return (
        <div>
            <h2>Edit Walker Details</h2>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedWalker.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={updatedWalker.email}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Add cities checkbox input fields for walker details*/}
                <h3>Choose Cities:</h3>
                {cities.map((city) => (
                    <div key={city.id}>
                        <input
                            type="checkbox"
                            id={`city-${city.id}`}
                            name={`city-${city.id}`}

                            onChange={() => handleCitiesCheckboxChange(city.id)}
                        />
                        <label htmlFor={`city-${city.id}`}>{city.name}</label>
                    </div>
                ))}


                <button type="button" onClick={handleUpdate}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default WalkerDetailUpdate;
