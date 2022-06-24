import { Slider, RangeSlider } from "@mantine/core";
 
export default function PreferenceSlider ({categoryHeading, category, MARKS, setPreferences, step, preferences, min=0, max=100}) {
    return (
      <div className="flex flex-col mx-3 w-full l mb-5">
      <h2 >{categoryHeading}</h2>
      { typeof(preferences[category]) === 'number' ? 
       <Slider
       size="sm"
       onChangeEnd={(e) =>
         setPreferences((preferences) => {
           return { ...preferences, [category]: e };
         })
       }/* 
       label={(val) => MARKS.find((mark) => mark.value === val).label} */
       defaultValue={preferences[category]}
       step={step}
       marks={MARKS}
       min ={min}
       max={max}
     />
  : <RangeSlider
  size="sm"
  onChangeEnd={(e) =>{
    setPreferences((preferences) => {
      return { ...preferences, [category]: e };
    })
  }
  }/* 
  label={(val) => MARKS.find((mark) => mark.value === val).label} */
  defaultValue={preferences[category]}
  step={step}
  marks={MARKS}
  min ={min}
  max={max}
/>

  
  }
   </div> 
       
    )
  }