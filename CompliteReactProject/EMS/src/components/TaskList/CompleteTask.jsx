import React from 'react'

const CompleteTask = ({task}) => {
  return (
    <div className=" flex-shrink-0 h-full w-[400px] bg-blue-400 rounded-xl p-4">

          <div className='flex justify-between items-center'>
            <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.category}</h3>
            <h4 className='text-sm'>{task.date}</h4>
          </div>

          <h2 className='mt-5 text-2xl font-semibold'>{task.title}</h2>
          <p className='txt-sm mt-2'>
            {task.description}
          </p>
          <div className='mt-2'>
            <button className='w-full'>Complete</button>
          </div>
        </div>
  )
}

export default CompleteTask;