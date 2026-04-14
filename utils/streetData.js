// Dummy data
export const streets = [
  { id: 1, name: 'Main Street', status: 'green', floodRisk: 'Low' },
  { id: 2, name: 'P. Santos Avenue', status: 'yellow', floodRisk: 'Medium' },
  { id: 3, name: 'Gen. Luna Road', status: 'red', floodRisk: 'High' },
  { id: 4, name: 'Bonifacio Street', status: 'green', floodRisk: 'Low' },
  { id: 5, name: 'Rizal Lane', status: 'yellow', floodRisk: 'Medium' },
  { id: 6, name: 'Del Pilar Drive', status: 'green', floodRisk: 'Low' },
  { id: 7, name: 'Mabini Court', status: 'red', floodRisk: 'High' },
  { id: 8, name: 'Quezon Boulevard', status: 'green', floodRisk: 'Low' },
  { id: 9, name: 'Laurel Street', status: 'yellow', floodRisk: 'Medium' },
  { id: 10, name: 'Gomez Avenue', status: 'green', floodRisk: 'Low' },
  { id: 11, name: 'Antonio Road', status: 'yellow', floodRisk: 'Medium' },
  { id: 12, name: 'Diaz Lane', status: 'red', floodRisk: 'High' },
];

// Road statues   
export const getStatusColor = (status) => {
  switch (status) {
    case 'green':
      return '#10b981'; // Green - Passable
    case 'yellow':
      return '#f59e0b'; // Yellow - Medium vehicle passable
    case 'red':
      return '#ef4444'; // Red - Impassable
    default:
      return '#9ca3af'; // Gray - Unknown
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'green':
      return 'Passable';
    case 'yellow':
      return 'Medium Vehicles Only';
    case 'red':
      return 'Impassable';
    default:
      return 'Unknown';
  }
};
