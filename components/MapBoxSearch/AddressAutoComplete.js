import React from "react";
import UseInput from "./UseInput";

const AddressAutoComplete = ({ handleChange, defaultAddress, handleClearFilters }) => {
  const address = UseInput("");
  return (
    <div className="relative lg:w-full">
      <input
        placeholder={defaultAddress}
        name="title"
        type="text"
        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        {...address}
      />
      {address.suggestions?.length > 0 && (
        <div className="flex flex-col px-1 py-2 mt-2 rounded-sm absolute z-1 lg:w-full">
          {address.suggestions.map((suggestion, index) => {
            return (
              <p
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name);
                  address.setSuggestions([]);
                  handleChange(suggestion.geometry.coordinates);
                }}
              >
                {suggestion.place_name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddressAutoComplete;
