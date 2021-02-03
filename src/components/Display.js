import PropTypes from "prop-types";

const Display = ({
  isLoading,
  fetchError,
  currentLocation,
  MAP_MODE,
  googleMapsKey,
  OnDisplayClicked,
  viewBy,
}) => {
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div>Fetch error: {fetchError}</div>
      ) : currentLocation && currentLocation.message ? (
        <div>Failed to load map: {currentLocation.message}</div>
      ) : (
        <>
          <h1>
            What Is My Location?{" "}
            <span role="img" aria-label="point_down">
              👇
            </span>
          </h1>

          <div className="map">
            <iframe
              title="gMap"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: "0" }}
              src={`https://www.google.com/maps/embed/v1/${MAP_MODE}?key=${googleMapsKey}&q=${viewBy}`}
              allowFullScreen
            ></iframe>

            {currentLocation && (
              <div className="info">
                <div className="display">
                  <input
                    type="radio"
                    name="display"
                    value="city"
                    onClick={(view) => OnDisplayClicked("city")}
                    defaultChecked
                  />
                  View by city
                  <br />
                  <input
                    type="radio"
                    name="display"
                    value="latlng"
                    onClick={(view) => OnDisplayClicked("latlng")}
                  />
                  View exact location
                </div>
                <hr />
                <strong>Country: </strong>
                {currentLocation.country_name}
                <br />
                <strong>City: </strong>
                {currentLocation.city}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

Display.prototype = {
  isLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.string,
  currentLocation: PropTypes.object.isRequired,
  MAP_MODE: PropTypes.string.isRequired,
  googleMapsKey: PropTypes.string.isRequired,
  OnDisplayClicked: PropTypes.func.isRequired,
  viewBy: PropTypes.string.isRequired,
};

export default Display;
