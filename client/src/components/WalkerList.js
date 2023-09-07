import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Typography, Button } from "@mui/material";
import { getCities, getWalkers, getDogs, removeWalker, assignWalkerToDog } from "../apiManager";
import { AssignADog } from "./AssignADog.js";
import { useNavigate } from "react-router-dom";
// getCities is for dropdown menu of selecting a city
// getDogs is for AssignADog
import WalkerDetailUpdate from "./WalkerDetailUpdate";
// Import the new component for updating walker details

export const WalkerList = () => {
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(""); // Track the selected city

    // for dialog window and assigning dog
    const [dogs, setDogs] = useState([]);
    const [openAssignDialog, setOpenAssignDialog] = useState(false);
    const [selectedWalker, setSelectedWalker] = useState(null);

    // 为了方便在关闭对话框的时候把dogs还原为全部dogs,这样设置一个新名字
    const [filteredDogs, setFilteredDogs] = useState([]);

    useEffect(() => {
        // Fetch the list of walkers when the component mounts
        getWalkers()
            .then((data) => setWalkers(data))
            .catch((error) => {
                console.error("Error fetching walkers:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch the list of walkers when the component mounts
        getCities()
            .then((data) => setCities(data))
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch the list of dogs
        // 一开始filteredDogs也必须赋值, 否则popup window中无法dogs.map(), 即使不显示
        // 这里不要用.then()两次来set, 会失败, 估计第二行上面的data不一样了. 而是data后=>直接做两个动作
        getDogs()
            .then((data) => {
                setDogs(data);
                setFilteredDogs(data)
            })
            .catch((error) => {
                console.error("Error fetching dogs:", error);
            });
    }, []);
    // 其实也可以把多个fetch 放到一个useEffect中

    const handleShowDogListToAssign = (walker) => {
        setSelectedWalker(walker);

        //在初始状态时, Dialog Window显示所有dogs, 即使open=false, 也就是不显示
        //不可以在Dialog Window中filter, 因为这样初始render会失败, 因为user还米有选择selectedWalker, 会显示无法.map
        //所以, 最好是在点击时, 把dogs filter成我们要的.
        //而且, 要用walker.cities.map 而不是selectedWalker.cities.map
        //因为setSelectedWalker是有延迟的.


        const dogsInSelectedWalkerCity = dogs.filter(
            (dog) => {
                const selectedWalkerCityIds = walker.cities.map((city) => city.id)
                return selectedWalkerCityIds.includes(dog.cityId)
            }
        )
        const onlyDogsNotAssignedToMe = dogsInSelectedWalkerCity
            .filter(
                dog => dog.walkerId !== walker.id
            )
        setFilteredDogs(onlyDogsNotAssignedToMe)

        setOpenAssignDialog(true);
    };

    const navigate = useNavigate();
    const handleAssignDogConfirm = (dogId) => {
        // Assign the selected dog to the walker
        window.alert(`Assigning dog ${dogId} to walker ${selectedWalker.name}`);
        navigate(`/dogs/${dogId}`);
    };
    //可以和子组件AssignADog中的handleAssignDog合并

    const handleRemoveClick = (walkerId) => {
        // Handle the removal of a walker when the "Remove" button is clicked
        removeWalker(walkerId) //调用removeWalker, 从apiManager中
            .then((success) => { //提示: removeWalker() 会return true; success等价于data
                if (success) { //等价于if(data===ture)
                    // If removal was successful, update the list of walkers
                    setWalkers((prevWalkers) =>
                        prevWalkers.filter((walker) => walker.id !== walkerId)
                    );
                    //这里直接用setWalkers来更新UI, 等价于refetch
                    /* 
                    When you use the functional form of setState, React provides you with the previous state as an argument to your function. 
                    
                    React automatically passes the current state (the previous state before the update) as prevWalkers to your callback function  provided to setWalkers.
                    
                    */
                }
            })
            .catch((error) => {
                console.error("Error removing walker:", error);
            });

        //下一步: update dogs' walkerId
        //第一步 找到所有dogsWalkedByMe 会返回一个数组

        const dogsWalkedByMe = dogs.filter(dog => dog.walkerId === walkerId);

        //第二步 每一个dog都updateDogs

        dogsWalkedByMe.forEach(dog => {

            const updatedDogtoSend = {
                id: dog.id,
                name: dog.name,
                cityId: dog.cityId,
                // walkerId 省略, 来得到null
            }

            assignWalkerToDog(dog.id, updatedDogtoSend)
            //必须要调用apiManager才能达到改动database的目的, 不能只改变UI的结果
            //可以在List of Dogs检查结果
        });

    };

    //下面是更新walker details中, 当点击名字时的onClick
    const handleEditWalker = (walker) => {
        // Set the selected walker for editing
        setSelectedWalker(walker);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                List of Walkers
            </Typography>

            {/* 👇City selection dropdown */}
            <FormControl
                variant="outlined"
                sx={{ m: 1, minWidth: 200 }}
            //sx === style; m === margin; minWidth是必须的,否则过小;
            >

                <InputLabel>Select a City</InputLabel>

                <Select
                    label="Select a City"
                    value={selectedCity}
                    // Handle city selection change
                    onChange={(event) => {
                        setSelectedCity(event.target.value)
                    }}
                >

                    <MenuItem value="">All Cities</MenuItem>
                    {cities.map((city) => (
                        <MenuItem key={city.id} value={city.name}>
                            {city.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* 👆City selection dropdown */}

            <Paper elevation={3} sx={{ mx: 'auto', my: 1, maxWidth: 500 }}>
                {/* sx= style; mx 水平; my 竖直; mx: 'auto' 居中; 好像不能同时指定四个margin  */}
                <List>
                    {walkers
                        //filter out selected city
                        .filter((walker) => !selectedCity || walker.cities.some((city) => city.name === selectedCity)
                        )
                        // If no city is selected (!selectedCity evaluates to true), we display all walkers.
                        //实际walker.cities是一个包含id和name的objects的array, 所以用.some()
                        //原来是walker.cities.includes(selectedCity)
                        //这是假设walker.cities是一个只包括city names的array
                        // Otherwise, we only display walkers whose cities property includes the selected city.
                        .map((walker) => (
                            <ListItem key={walker.id}
                            >
                                <ListItemText
                                    primary={walker.name}
                                    onClick={() => handleEditWalker(walker)} // Handle click to update walker details
                                />
                                <Button
                                    variant="outlined"
                                    sx={{ ml: 1 }}
                                    onClick={
                                        () => handleShowDogListToAssign(walker)}
                                >
                                    Assign Dog
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ ml: 1 }}
                                    onClick={() => handleRemoveClick(walker.id)} // Call the removal function
                                >
                                    Remove
                                </Button>
                            </ListItem>
                        ))}
                </List>
            </Paper>
            {/* Add the AssignADog component */}
            <AssignADog
                open={openAssignDialog}
                dogs={dogs}
                filtereddogs={filteredDogs}
                //把filteredDogs 传递过去, 而不是全部数组(一开始的时候是.)
                selectedWalker={selectedWalker}
                //传过去来组织updatedDog的object
                onClose={() => {
                    setOpenAssignDialog(false);
                    setSelectedWalker(null);
                }}
                onAssign={handleAssignDogConfirm}
            />
            {selectedWalker&&!openAssignDialog?  
                <WalkerDetailUpdate
                    walker={selectedWalker}
                    setSelectedWalker={setSelectedWalker}
                    cities={cities}
                />:""
            } {/* 
            {selectedWalker &&
                <WalkerDetailUpdate
                    walker={selectedWalker}
                    setSelectedWalker={setSelectedWalker}
                />
            }
            *//* Show the update form 
            
            `&&` is a logical AND operator in JavaScript. In this context, it's used for conditional rendering. It works as follows: if the expression on the left of `&&` is truthy, it evaluates the expression on the right and returns it. If the expression on the left is falsy, it short-circuits and returns the left expression.

            If ``selectedWalker`` is falsy (i.e., there is no selected walker), the expression short-circuits, and nothing is rendered. This is a common way to conditionally render components or content in React based on some condition.

            In essence, this line of code is saying, "If ``selectedWalker`` exists (is truthy), render the WalkerDetailUpdate component." It's a convenient way to show or hide components based on certain conditions in your application's UI
            
            */}
        </div>
    );
}

/* 
可以被加入来显示cities of a walker
                                <div>
                                    <strong>Cities: </strong>
                                    {walker.cities.map((city) => (
                                        <span key={city.id}>{city.name}; </span>
                                    ))}
                                </div>
*/