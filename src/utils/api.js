
export const fetchTicketsAndUsers = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return { tickets: data.tickets, users: data.users };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { tickets: [], users: [] }; // Return empty arrays in case of error
    }
  };
  