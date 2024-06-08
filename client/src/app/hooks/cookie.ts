export const useCookies = () => {
    const getCookie = (name: string): string | string[] => {
      const value = `; ${document.cookie}`;
      return value; // Explicitly return undefined if cookie is not found
    };
  
    return { getCookie };
  };