import React, { useState, useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(
  updateQuery,
  autoCompleteRef,
  { setLocation, setAddress }
) {
  const windowObj = window;
  autoComplete = new windowObj.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["geocode"] }
  );

  autoComplete.setFields([
    "address_components",
    "formatted_address",
    "geometry",
  ]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, setLocation, setAddress)
  );
}

async function handlePlaceSelect(
  updateQuery,
  setLocation,
  setAddress
) {
  const addressObject = autoComplete.getPlace();
  setLocation({
    lat: addressObject.geometry.location.lat(),
    lng: addressObject.geometry.location.lng(),
    formatted_address: addressObject.formatted_address
  });
  const query = addressObject.formatted_address;
  updateQuery(query);
  setAddress && setAddress(query);
}

function SearchLocationInput({
  setLocation,
  placeholder,
  setAddress,
  style = {},
}) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ2n6a8tjm7_QW6JUotp5O5UhqT6F1qf4&libraries=places`,
      () =>
        handleScriptLoad(setQuery, autoCompleteRef, { setLocation, setAddress })
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div className="search-location-input" style={style}>
      <input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder || "Enter a City"}
        value={query}
        className={"border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
      />
    </div>
  );
}

export default SearchLocationInput;
