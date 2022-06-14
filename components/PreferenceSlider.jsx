import { Slider } from "@mantine/core";

export default function PreferenceSlider ({categoryHeading, category, MARKS, setPreferences, step, preferences, min=0, max=100}) {

    return (
      <div className="flex flex-col mx-3 w-full l mb-5 lg:mb-6">
      <h2 >{categoryHeading}</h2>
        <Slider
          size="sm"
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