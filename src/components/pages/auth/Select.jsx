import React from 'react';
import { useNavigate } from 'react-router-dom';

const Select = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex-1">
          <button
              onClick={() => {navigate('/login/student')}}
              className="btn btn-primary w-full select-none"
          >
            Aluno
          </button>
        </div>
        <div className="flex-1">
          <button
              onClick={() => {navigate('/login/professor')}}
              className="btn btn-primary w-full select-none"
          >
            Professor
          </button>
        </div>
        <div className="flex-1">
          <button
              onClick={() => {navigate('/login/admin')}}
              className="btn btn-primary w-full select-none"
          >
            Admin
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="mt-4 text-center text-xs text-gray-500">
          <span className="block">⚛️ Quantum Tutor - 2025</span>
        </div>
      </div>
    </div>
  );
};

export default Select;