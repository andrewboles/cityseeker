import { Slider, RangeSlider } from "@mantine/core";

export default function PreferenceSlider({ categoryHeading, category, MARKS, setPreferences, step, preferences, min = 0, max = 100 }) {
  return (
    <div className="flex flex-col mx-3 w-full l mb-8 ">
      <h2 className=" font-display font-regular">{categoryHeading}</h2>
      {typeof (preferences[category]) === 'number' ?
        <Slider
          size="sm"
          onChangeEnd={(e) =>
            setPreferences((preferences) => {
              return { ...preferences, [category]: e };
            })
          }
          defaultValue={preferences[category]}
          step={step}
          marks={MARKS}
          min={min}
          max={max}
          color="pink"
        />
        : <RangeSlider
          size="sm"
          onChangeEnd={(e) => {
            setPreferences((preferences) => {
              return { ...preferences, [category]: e };
            })
          }
          }
          defaultValue={preferences[category]}
          step={step}
          marks={MARKS}
          min={min}
          max={max}
          color="cyan"
        />
      }
    </div>

  )
}