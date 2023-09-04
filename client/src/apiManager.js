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


export const deleteDog = async (dogId) => {
  const response = await fetch(`/api/dogs/${dogId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Error deleting dog");
  }
};

export const assignWalkerToDog = async (dogId, walkerId) => {
  const response = await fetch(`/api/dogs/${dogId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      DogId: dogId,
      WalkerId: walkerId,
    }),
  });
  return response.json();
};

