import React from 'react';

function Boss({ name, attempts, status }) {
  return (
    <div className='flex justify-between first:border-t border-b p-1 border-amber-400 mr-3 2xs:text-sm'>
      <p className='flex items-center'>{name}</p>
      <div className='mb-1'>
        {attempts} Attempts
        <div className='flex justify-end'>
          <div
            className={`w-16 font-semibold rounded-lg transition-all duration-150 ease-in-out ${
              !status
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-green-600 hover:bg-green-500'
            }`}
          >
            <span className='font-semibold'>
              {!status ? 'Pending' : 'Victory'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boss;
