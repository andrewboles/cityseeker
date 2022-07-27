import { Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';

export const IntroModal = ({setIntroSeen}) => {
    const [opened, setOpened] = useState(true);
  return (
    <>
    <Modal
    size="75%"
      opened={opened}
      onClose={() => {
        setOpened(false)
        localStorage.setItem('introseen',"true")
        setIntroSeen(true)
        }
    }
      centered
    >
        <div className='flex flex-1 flex-col justify-between items-center p-0'>
            <div className='flex flex-row justify-center items-baseline mb-2'>
             <h2 className=' font-display text-3xl font-semibold mr-2'>this is</h2>
             <h2 className=' font-logo text-3xl text-midnight'>cityseeker</h2>
            </div>
            <video className=' shadow-2xl rounded-lg' controls muted autoPlay>
            <source src="./introvid.mov" type="video/mp4"/>
            </video>
        </div>
      {/* Modal content */}
    </Modal>
  </>
  )
}
