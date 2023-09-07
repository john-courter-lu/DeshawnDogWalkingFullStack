
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateCitiesForWalker, updateWalker } from "../apiManager";

const WalkerDetailUpdate = ({ walker, setSelectedWalker, cities }) => {
    const navigate = useNavigate();
    const [updatedWalker, setUpdatedWalker] = useState(walker);
    //为了显示user的cities selection, 同时by default, 显示cities selectedWalker walks
    const [selectedCities, setSelectedCities] = useState([]);

    useEffect(
        () => {
            //下面是保证: 点击不同walker时, email和name的return也跟着改变
            setUpdatedWalker(walker)

            // Set the initial selected cities based on the walker's data
            setSelectedCities(walker.cities.map((city) => city.id));
            //这是把an array of objects .map into an array of numbers

            //是为了下面.includes()
            //因为 .includes() method is primarily used for checking if an array contains a specific value, and it performs a strict equality (===) comparison. When working with arrays of objects, .includes() might not behave as expected because it compares object references, not object contents.

            //也可以用.some
            /*           
            const containsObjectBoolean = arrayOfObjects.some(obj => (
            obj.id === objectToCheck.id && obj.name === objectToCheck.name
            )); 
            */
            // 会返回true or false
        }
        , [walker])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedWalker({ ...updatedWalker, [name]: value });
        //{ ...updatedWalker } is using the spread operator (...) to create a shallow copy of the updatedWalker object. This is done to preserve the properties that haven't changed while allowing you to update specific properties.

        /* "[name]: value" is an object property computed name. `name` is the name attribute of the input field that triggered the `onChange` event, and `value` is the new value of that input field. By using square brackets around `name`, you're creating a dynamic object key based on the `name` attribute of the input field. 
        
        Finally, the entire expression { ...updatedWalker, [name]: value } creates a new object that includes all the properties of the existing updatedWalker object, but with one property (name) updated to the new value
      
        */

        /* In essence, this line of code updates the state of updatedWalker by replacing the value of a specific property (name) while keeping all other properties unchanged. This is a common pattern in React when you need to update state objects based on user input without losing the existing data. */
    };

    const handleUpdate = async () => {
        try {
            // Call the updateWalker function with the updated data
            await updateWalker(walker.id, updatedWalker);

            // Implement this part to update cities
            const updatedCityListForSelectedWalker = selectedCities.map(cityId => {
                const city = cities.filter(city => city.id === cityId)[0];
                return city;
            })

            walker.cities = updatedCityListForSelectedWalker;
            // You can send a PUT request to update the walker in the backend
            console.log(walker);
            await updateCitiesForWalker(walker);

            //通过设置下面的, 来让Edit Walker Details消失 
            setSelectedWalker(null);
            // Redirect to the list of walkers
            navigate("/walkers");


        } catch (error) {
            console.error("Error updating walker:", error);
        }
    };

    const handleCitiesCheckboxChange = (cityId) => {
        // Implement this function to update the selected cities in the state
        if (selectedCities.includes(cityId)) {
            // If the city is already selected, remove it
            setSelectedCities(selectedCities.filter((id) => id !== cityId));
        } else {
            // If the city is not selected, add it
            setSelectedCities([...selectedCities, cityId]);
            // This expression creates a new array by taking all the elements from selectedCities (the previous selected city IDs) and appending the new cityId to the end of the array.
        }
        // You should update the updatedWalker object accordingly
        console.log(selectedCities)
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
                            checked={selectedCities.includes(city.id)}//用包括不包括的boolean value来决定checked or not
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
