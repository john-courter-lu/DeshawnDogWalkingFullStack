import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    DialogActions,
} from "@mui/material";
import { assignWalkerToDog } from "../apiManager.js";

export const AssignADog = ({ open, dogs, filtereddogs, selectedWalker, onClose, onAssign }) => {
    const [selectedDogId, setSelectedDogId] = useState(null);
    // const [selectedDog, setSelectedDog] = useState(null);

    // useEffect(() => {
    //     const findSelectedDog = dogs.filter(dog => dog.id === selectedDogId);
    //     setSelectedDog(findSelectedDog)
    // }, [selectedDogId])

    const handleAssignDog = async () => {
        if (selectedDogId) {

            //构建object来传递到fetch PUT中

            const filteredDogArray = dogs.filter(dog => dog.id === selectedDogId);
            const selectedDog = filteredDogArray[0];
            //警惕🚦🛑: .filter()的return为数组! 所以一定要加[0],
            //要不然selectedDog.name,selectedDog.cityId,都会读取错误undefined

            //注意已经在radio button onChange时用了parseInt/Number,
            //所以这里不用Number(selectedDogId)
            const updatedDogtoSend = {
                id: selectedDogId,
                name: selectedDog.name,
                cityId: selectedDog.cityId,
                walkerId: selectedWalker.id
            }

            console.log(selectedDog, "updatedDogtoSend", updatedDogtoSend)
            //注意updatedDogtoSend结果: {id: 6, name: undefined, cityId: undefined, walkerId: 8}
            //selectedDog不是必须要用useState,而是.filter()返回的是array

            // 调用fetch PUT 或apiManager中的function
            await assignWalkerToDog(selectedDogId, updatedDogtoSend)

            onClose();
            //提醒: 这个函数就是把显示对话框设置为false;

            onAssign(selectedDogId);
            //这个是调用父组件中的confirm函数, 只是一个confirm, 或给user看的notification, 修改database的事情还是需要上面来
            //可以考虑合并到这个函数里, 而不需要prop传递.

        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select a Dog</DialogTitle>
            <DialogContent>
                <RadioGroup
                    value={selectedDogId}
                    onChange={(e) => {
                        setSelectedDogId(Number(e.target.value))
                    }}
                >
                    {filtereddogs.map((dog) => (
                        <FormControlLabel
                            key={dog.id}
                            value={dog.id.toString()}
                            control={<Radio />}
                            label={dog.name}
                        />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAssignDog} color="primary">
                    Assign Dog
                </Button>
            </DialogActions>
        </Dialog>
    );
};

