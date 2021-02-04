import { useState, useEffect } from "react";
import Display from "./Display";

function MapContainer() {
  const googleMapsKey = "AIzaSyCdQymwSuF0P6Ee-ffX0ZtWjpJdpaT5eLk";
  const ipData = "dcb19aafdd3accd0ca61b014f91a6cc5888d57f4f703a9758da3751e";
  const MapMode = "place"; // options: place, view, directions, streetview, search
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null); // Contains the respones from the ipData about the users' location
  const [displayOption, setDisplayOption] = useState("city");

  // Fetching users' data, using ipData service
  useEffect(() => {
    try {
      fetch(`https://api.ipdata.co?api-key=${ipData}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentLocation(data);
          setIsLoading(false);
        })
        .catch((err) => setFetchError(err.message));
    } catch (err) {
      setFetchError(err.message);
    }
  }, []);

  // Controls the option to display the location (show city area or exact location)
  const viewBy =
    currentLocation &&
    (displayOption === "city"
      ? `${currentLocation.city},${currentLocation.country_name}`
      : `${currentLocation.latitude},${currentLocation.longitude}`);

  return (
    <Display
      isLoading={isLoading}
      fetchError={fetchError}
      currentLocation={currentLocation}
      MapMode={MapMode}
      googleMapsKey={googleMapsKey}
      onDisplayClicked={(view) => setDisplayOption(view)}
      viewBy={viewBy}
    />
  );
}

export default MapContainer;
