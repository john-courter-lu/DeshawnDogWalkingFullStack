import React, { useState } from "react";
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

export const AssignADog = ({ open, dogs, onClose, onAssign }) => {
    const [selectedDogId, setSelectedDogId] = useState(null);

    const handleAssignDog = () => {
        if (selectedDogId) {
            onAssign(selectedDogId);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select a Dog</DialogTitle>
            <DialogContent>
                <RadioGroup
                    value={selectedDogId}
                    onChange={(e) => setSelectedDogId(e.target.value)}
                >
                    {dogs.map((dog) => (
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

