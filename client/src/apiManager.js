export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
};

export const getDogById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
};

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};

export const getWalkers = async () => {
  const res = await fetch("/api/walkers");
  return res.json();
};

export const createDog = async (dog) => {
  const res = await fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error("Failed to create a new dog");
  }
};

export const addCity = async (city) => {
  const response = await fetch("/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(city),
  });

  if (!response.ok) {
    throw new Error("Error adding city");
  }

  return response.json();
};

export const assignWalkerToDog = async (dogId, updatedDog) => {
  try {
    const response = await fetch(`/api/dogs/${dogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    });

    //下面用if 和 try...catch来捕捉:
    //1. http response status; 
    //2. runtime error
    if (!response.ok) {
      throw new Error(`Error assigning walker to dog (Status ${response.status})`);
    }
    
    return response.json();
    
  } catch (error) {
    console.error("Error assigning walker to dog:", error);
    throw error;
  }
};

export const updateWalker = async (walkerId, updatedWalker) => {
  try {
    const response = await fetch(`/api/walkers/${walkerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWalker),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok (Status ${response.status})`);
    }

    return response.json();

  } catch (error) {
    console.error("Error updating walker:", error);
    throw error;
  }
};

// update walkerCities or cities for a walker
export const updateCitiesForWalker = async (selectedWalker) => {
  try {
    const response = await fetch(`/api/walkercities`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedWalker),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok (Status ${response.status})`);
    }

    return response.json();

  } catch (error) {
    console.error("Error updating cities for the walker:", error);
    throw error;
  }
};

export const deleteDog = async (dogId) => {
  const response = await fetch(`/api/dogs/${dogId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Error deleting dog");
  }
};

export const removeWalker = async (walkerId) => {
  try {
    const response = await fetch(`/api/walkers/${walkerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error removing walker (Status ${response.status})`);
    }

    return true; // Return true if the removal was successful
  
  } catch (error) {
    console.error("Error removing walker:", error);
    throw error;
  }
};
// 这个的error catching是最全面的了, 既有!response.ok 又有error. 
// 同时有  return true; 不知是否有实质影响; 反正不用也行
