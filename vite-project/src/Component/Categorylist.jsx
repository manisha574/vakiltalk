import React from 'react';
import Categorydiv from './Categorydiv';

export default function Categoryist({ categorydata }) {
  return (
    <div >
      {categorydata.map((column, index) => (
        <Categorydiv
          key={index}
          show={column.show}
          label={column.label}
          color={column.color}
          bcolor={column.bcolor}
        />
      ))}
    </div>
  );
}
