import { Progress } from '@mantine/core';

export default function CityProgressCompareBar({heading, values, labels}) {
  
    return (
        <div className='mb-2 bg-offwhite'>
            <h2 className='font-display'>{heading}</h2>
            <Progress size="xl" value={values?.city1 || 0} label={labels?.city1 ?? values?.city1} color="#1595b1" />
            <Progress size="xl" value={values?.city2 || 0} label={labels?.city2 ?? values?.city2} color="#fd9676" />
        </div>
        
    )
}