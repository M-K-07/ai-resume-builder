import React from 'react';
import ResumeForm from '../../_components/ResumeForm';
import Resume from '../../_components/Resume';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import dbConnect from '../../../../lib/dbConnect';
import ResumeModel from '../../../../models/Resume';
import { notFound } from 'next/navigation';


// This page is now an async server component for auth
const Page = async ({ params }) => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  await dbConnect();
  const resume = await ResumeModel.findById(params.resume_id).lean()
  if (!resume || resume.userId !== user.id) {
    // Not found or not owned by user
    notFound();
  
  }

  return (
    <div className='flex flex-col lg:flex-row mt-[72px] mx-auto bg-zinc-900 w-full justify-between h-[calc(100vh-72px)] gap-6 p-4 md:p-6'>
      <ResumeForm/>
      <div className="hidden lg:flex lg:w-12 xl:w-[50vw] print:min-h-auto"> 
        <Resume/>
      </div>
    </div>
  );
};

export default Page;
