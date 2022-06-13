import { Slider } from "@mantine/core";

export default function PreferenceSlider ({categoryHeading, category, MARKS, setPreferences, step, preferences, min=0, max=100}) {

    return (
      <div className="flex flex-col w-40 mx-3 lg:w-72">
      <h2 >{categoryHeading}</h2>
        <Slider
          className="mb-8"
          onChangeEnd={(e) =>
            setPreferences((preferences) => {
              return { ...preferences, [category]: e };
            })
          }
          label={(val) => MARKS.find((mark) => mark.value === val).label}
          defaultValue={preferences[category]}
          step={step}
          marks={MARKS}
          min ={min}
          max={max}
        />
      </div>
    )
  }