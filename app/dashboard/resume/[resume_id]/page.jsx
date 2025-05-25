import React  from 'react'
import ResumeForm from '../../_components/ResumeForm'
import Resume from '../../_components/Resume'
const page = () => {

  return (
    <div className='flex flex-col lg:flex-row mt-[72px] mx-auto bg-zinc-900 w-full justify-between h-[calc(100vh-72px)] gap-6 p-4 md:p-6'>
      <ResumeForm/>
      <div className="hidden lg:flex lg:w-12 xl:w-[50vw] print:min-h-auto"> 
        <Resume/>
      </div>
    </div>
  )
}

export default page
