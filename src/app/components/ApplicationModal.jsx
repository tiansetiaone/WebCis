// components/ApplicationModal.jsx
'use client';
import React from 'react';

const ApplicationModal = ({ applicationType }) => {
  const getModalContent = () => {
    switch(applicationType) {
      case 'pedestrian':
        return {
          title: 'Trotoar / Pedestrian',
          description: 'Tidak dilalui kendaraan'
        };
      case 'garage':
        return {
          title: 'Parkir / Plaza',
          description: 'Area parkir / carport'
        };
      case 'car':
        return {
          title: 'Traffic Rendah',
          description: 'Jalan Lingkungan'
        };
      case 'lorry':
        return {
          title: 'Traffic Sedang',
          description: 'Jalan Kolektor'
        };
      case 'fuso':
        return {
          title: 'Traffic Tinggi',
          description: 'Jalan Utama / Arteri'
        };
      case 'factory':
        return {
          title: 'Jalan Pabrik ',
          description: ''
        };
      case 'harbor':
        return {
          title: 'Jalan Pelabuhan',
          description: ''
        };
      default:
        return {
          title: 'Aplikasi',
          description: 'Informasi aplikasi'
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white shadow-lg rounded-md p-3 z-50 border border-gray-200">
      <div className="text-sm font-semibold text-[#0B203F]">{content.title}</div>
      <div className="text-xs mt-1">{content.description}</div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
    </div>
  );
};

export default ApplicationModal;