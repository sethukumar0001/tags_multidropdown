import React, { useState } from "react";
import CustomSearchableDropdown from "./CustomDropdown";
import { getValue } from "./lodash";

function App(props) {
  const [values, setValues] = useState([]);
  const handleSelectChange = (value) => {
    let selectedValue = getValue(value,`name`,'');
    if(values.includes(selectedValue)){
      let filtered = values.filter((item)=>item !== selectedValue);
      setValues(filtered)
    }else{
      values.push(selectedValue)
      setValues([...values])
    }
  };
  return (
    <div className="home">
      <CustomSearchableDropdown
        label={"label"}
        values={values}
        onChange={handleSelectChange}
        width={'480px'}
      />
    </div>
  );
}

export default App;