
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateWalker } from "../apiManager";

const WalkerDetailUpdate = ({ walker, setSelectedWalker }) => {
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

        } catch (error) {
            console.error("Error updating walker:", error);
        }
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
                {/* Add more input fields for other walker details as needed */}
                <button type="button" onClick={handleUpdate}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default WalkerDetailUpdate;
