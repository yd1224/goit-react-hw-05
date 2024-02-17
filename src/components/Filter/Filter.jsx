import { useState } from "react";
export const Filter = ({ value, onChange }) => {
  console.log("value", value);
  return (
    // <div>
    //   <div>
    //     <input
    //       type="checkbox"
    //       checked={value}
    //       name="popular"
    //       onChange={(evt) => onChange(evt.target.checked)}
    //     />
    //     <label htmlFor="popular">Scales</label>
    //   </div>
    // </div>
    <div>
      <input
        type="text"
        value={value}
        placeholder="Search for movie"
        onChange={(evt) => onChange(evt.target.value)}
      />
    </div>
  );
};
