import { useState, useEffect } from 'react';

const useInitialState = API => {
  const [locations, setLocations] = useState({
    mylist: [],
    trends: [],
    originals: [],
  });

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setLocations(data));
  }, []);

  return locations;
};

export default useInitialState;
