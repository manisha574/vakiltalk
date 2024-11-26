// import React from 'react';

// const ProgressBar = ({ value, max, label, color }) => {
//   const percentage = max > 0 ? (value / max) * 100 : 0;
//   const barColor = color || 'blue'; // Default to blue if no color is provided
//   const isEmpty = value === 0;

//   return (
//     <div className='flex items-center mb-2'>
//       <span className='w-1/4 text-sm'>{label}</span>
//       <div className='relative w-3/4 h-4 bg-gray-300 rounded-full'>
//         <div
//           className={`absolute top-0 left-0 h-full ${isEmpty ? 'bg-gray-400' : `bg-${barColor}-500`} rounded-full`}
//           style={{ width: `${percentage}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;
import React from 'react';

const ProgressBar = ({ ratingGraph }) => {
  // Define star labels and their corresponding keys in the ratingGraph object
  const starLabels = [
    { label: '5 Star', key: 'fiveStarCount' },
    { label: '4 Star', key: 'fourStarCount' },
    { label: '3 Star', key: 'threeStarCount' },
    { label: '2 Star', key: 'twoStarCount' },
    { label: '1 Star', key: 'oneStarCount' },
  ];

  return (
    <div className='mt-4'>
      {starLabels.map(({ label, key }) => {
        // Get the progress data for the current star rating
        const progressData = ratingGraph[key] || { progressBar: 0, ratingCount: 0 };

        return (
          <div className='flex items-center mb-2' key={key}>
            <span className='w-1/4 text-sm'>{label}</span>
            <div className='relative w-3/4 h-4 bg-gray-300 rounded-full'>
              <div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  progressData.progressBar === 0 ? 'bg-gray-400' : 'bg-blue-500'
                }`}
                style={{ width: `${progressData.progressBar}%` }}
              />
            </div>
            {/* <span className='ml-2 text-sm'>{`${progressData.progressBar}%`}</span> */}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
