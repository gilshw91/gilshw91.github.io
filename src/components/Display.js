import PropTypes from "prop-types";

const Display = ({
  isLoading,
  fetchError,
  currentLocation,
  MapMode,
  googleMapsKey,
  onDisplayClicked,
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
              src={`https://www.google.com/maps/embed/v1/${MapMode}?key=${googleMapsKey}&q=${viewBy}`}
              allowFullScreen
            ></iframe>

            {currentLocation && (
              <div className="info">
                <div className="display">
                  <input
                    type="radio"
                    name="display"
                    id="city"
                    value="city"
                    onClick={() => onDisplayClicked("city")}
                    defaultChecked
                  />
                  <label htmlFor="city">View by city</label>
                  <br />
                  <input
                    type="radio"
                    id="latlng"
                    name="display"
                    value="latlng"
                    onClick={() => onDisplayClicked("latlng")}
                  />
                  <label htmlFor="latlng">View exact location</label>
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

Display.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.string,
  currentLocation: PropTypes.object,
  MapMode: PropTypes.string.isRequired,
  googleMapsKey: PropTypes.string.isRequired,
  onDisplayClicked: PropTypes.func.isRequired,
  viewBy: PropTypes.string,
};

export default Display;
