import React, { useState } from 'react';

export interface radioProps {
  onChangeBackground : (e: React.ChangeEvent<HTMLInputElement>) => void
} 

export const Radio = (props: radioProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    props.onChangeBackground(event)
  };

  const options = [
    { name: 'Bananas', value: 'bananas' },
    { name: 'Robots', value: 'robots' },
    { name: 'Hearts', value: 'hearts' },
    { name: 'Stars', value: 'stars' },
    { name: 'Skulls', value: 'skulls' },
    { name: 'Bullets', value: 'bullets' },
  ];
  
  return (
    <div className="flex flex-col mb-4">
      

      {options.map((option) => {
        return (
          <label className="mb-2" key={option.value}>
            <input
              type="radio"
              name="radio-checkbox"
              value={option.value}
              className="mr-2"
              checked={selectedValue === option.value}
              onChange={handleOptionChange}
            />
            {option.name}
          </label>
        );
      })}
      
    </div>
  );
};

export default Radio;
