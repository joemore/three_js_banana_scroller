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
  
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2">
        <input
          type="radio"
          name="radio-checkbox"
          value="banana"
          className="mr-2"
          checked={selectedValue === 'banana'}
          onChange={handleOptionChange}
        />
        Banana
      </label>

      <label className="mb-2">
        <input
          type="radio"
          name="radio-checkbox"
          value="astronaut"
          className="mr-2"
          checked={selectedValue === 'astronaut'}
          onChange={handleOptionChange}
        />
        Astronaut
      </label>

      <label className="mb-2">
        <input
          type="radio"
          name="radio-checkbox"
          value="love"
          className="mr-2"
          checked={selectedValue === 'love'}
          onChange={handleOptionChange}
        />
        Love
      </label>

      <label className="mb-2">
        <input
          type="radio"
          name="radio-checkbox"
          value="star"
          className="mr-2"
          checked={selectedValue === 'star'}
          onChange={handleOptionChange}
        />
        Star
      </label>

      <label className="mb-2">
        <input
          type="radio"
          name="radio-checkbox"
          value="skull"
          className="mr-2"
          checked={selectedValue === 'skull'}
          onChange={handleOptionChange}
        />
        Skull
      </label>
    </div>
  );
};

export default Radio;
