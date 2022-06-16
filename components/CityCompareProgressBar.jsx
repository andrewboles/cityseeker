import { Progress } from '@mantine/core';

export default function CityProgressCompareBar({heading, values, labels}) {
  

    return (
        <div className='mb-2'>
            <h2>{heading}</h2>
            <Progress size="xl" value={values?.city1 || 0} label={labels?.city1 ?? values?.city1} color="lime" />
            <Progress size="xl" value={values?.city2 || 0} label={labels?.city2 ?? values?.city2} color="pink" />
        </div>
        
    )
}