export const db = async (url: string, options = {}): Promise<string | Array<Object>> => {
  try {
    const request = await fetch(`http://localhost:5000/api/${url}`, options);
    if (request.ok) {
      const response = await request.json();
      return response;
    }
    throw new Error(`HTTP Error ${request.status}`);
  } catch (error) {
    throw new Error(`HTTP Error ${error}`);
  }
};
