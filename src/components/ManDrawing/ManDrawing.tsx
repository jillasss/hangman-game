import React from 'react';
import './styles/ManDrawing.scss';

class ManDrawingProps {
  mistakes:number = 0;
}

const ManDrawing: React.FC<ManDrawingProps> = ({ mistakes }) => {
  return (
    <div className="man-drawing">
      {/* Виселица */}
      <div className="gallows">
        <div className="top" />
        <div className="middle" />
        <div className="bottom" />
      </div>

      {/* Человечек */}
      {mistakes >= 1 && <div className="head" />}
      {mistakes >= 2 && <div className="body" />}
      {mistakes >= 3 && <div className="left-arm" />}
      {mistakes >= 4 && <div className="right-arm" />}
      {mistakes >= 5 && <div className="left-leg" />}
      {mistakes >= 6 && <div className="right-leg" />}
    </div>
  );
};

export default ManDrawing;