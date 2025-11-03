import React from 'react';
import { useAuth } from '../../context/AuthContext';

// Card skeleton
export const CardSkeleton = ({ count = 1 }) => {
  const { darkMode } = useAuth();
  
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 animate-pulse`}>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      ))}
    </>
  );
};

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  const { darkMode } = useAuth();
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
      <table className="w-full">
        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-700">
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Profile skeleton
export const ProfileSkeleton = () => {
  const { darkMode } = useAuth();
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 animate-pulse`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
};

// Chart skeleton
export const ChartSkeleton = () => {
  const { darkMode } = useAuth();
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
      <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  );
};

// List skeleton
export const ListSkeleton = ({ items = 5 }) => {
  const { darkMode } = useAuth();
  
  return (
    <div className="space-y-3">
      {[...Array(items)].map((_, i) => (
        <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 animate-pulse`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Stats skeleton
export const StatsSkeleton = ({ count = 4 }) => {
  const { darkMode } = useAuth();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 animate-pulse`}>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

// Full page skeleton
export const PageSkeleton = () => {
  return (
    <div className="space-y-6 fade-in">
      <CardSkeleton count={1} />
      <StatsSkeleton count={4} />
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <TableSkeleton rows={10} columns={5} />
    </div>
  );
};

export default {
  Card: CardSkeleton,
  Table: TableSkeleton,
  Profile: ProfileSkeleton,
  Chart: ChartSkeleton,
  List: ListSkeleton,
  Stats: StatsSkeleton,
  Page: PageSkeleton
};
