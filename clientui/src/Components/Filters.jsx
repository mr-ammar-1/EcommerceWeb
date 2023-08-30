import React from "react";
import { Input } from "antd";
import Switch from '@mui/material/Switch';

const category = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Garments",
    value: "garments",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Home",
    value: "home",
  },
];

function Filters({setfilter}) {
  const [ElectronicsChecked, setElectronicsChecked] = React.useState(false);
  const [FashionChecked, setFashionChecked] = React.useState(false);
  const [SportsChecked, setSportsChecked] = React.useState(false);
  const [GarmentsChecked, setGarmentsChecked] = React.useState(false);
  const [HomeChecked, setHomeChecked] = React.useState(false);

 
  return (
    <div className="w-96 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-orange-900 text-xl">Filters</h1>
        <i
          className="ri-close-line text-orange-900 text-xl
            cursor-pointer"
        ></i>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-orange-700"> Category </h1>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
          <Switch
             checked={ElectronicsChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setfilter("Electronics")
                setElectronicsChecked(e.target.checked);
                
              } else {
                setfilter("")
                setElectronicsChecked(e.target.unchecked);
              }
            }}
             inputProps={{ 'aria-label': 'controlled' }}
              />
            
            <label hmlfor="category">Electronics</label>
            </div>
            <div className="flex items-center gap-2">
           
            <Switch
             checked={FashionChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setfilter("Fashion")
                setFashionChecked(e.target.checked);
                
              } else {
                setfilter("")
                setFashionChecked(e.target.unchecked);
              }
            }}
             inputProps={{ 'aria-label': 'controlled' }}
              />
            <label hmlfor="category">Fashion</label>
            </div>
            <div className="flex items-center gap-2">
            <Switch
             checked={SportsChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setfilter("Sports")
                setSportsChecked(e.target.checked);
                
              } else {
                setfilter("")
                setSportsChecked(e.target.unchecked);
              }
            }}
             inputProps={{ 'aria-label': 'controlled' }}
              />
            <label hmlfor="category">Sports</label>
            </div>
            <div className="flex items-center gap-2">
            <Switch
             checked={GarmentsChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setfilter("Garments")
                setGarmentsChecked(e.target.checked);
                
              } else {
                setfilter("")
                setGarmentsChecked(e.target.unchecked);
              }
            }}
             inputProps={{ 'aria-label': 'controlled' }}
              />
            <label hmlfor="category">Garments</label>
            </div>
            <div className="flex items-center gap-2">
            <Switch
             checked={HomeChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setfilter("Home")
                setHomeChecked(e.target.checked);
                
              } else {
                setfilter("")
                setHomeChecked(e.target.unchecked);
              }
            }}
             inputProps={{ 'aria-label': 'controlled' }}
              />
            <label hmlfor="category">Home</label>
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default Filters;
