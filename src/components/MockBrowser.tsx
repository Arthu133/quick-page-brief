
import React from 'react';

interface MockBrowserProps {
  children: React.ReactNode;
}

const MockBrowser: React.FC<MockBrowserProps> = ({ children }) => {
  return (
    <div className="flex flex-col rounded-lg border shadow-lg overflow-hidden h-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded-md px-3 py-1 text-sm truncate">
          example.com/article
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
};

export default MockBrowser;
