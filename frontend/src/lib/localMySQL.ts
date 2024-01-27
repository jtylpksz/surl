interface responseData {
  ok: boolean;
  message: string;
  userId: string;
  username: string;
}

export const db = async (url: string, options = {}): Promise<responseData> => {
  try {
    const request = await fetch(`http://localhost:5000/${url}`, options);
    if (request.ok) {
      const response = await request.json();
      return response;
    }
    throw new Error(`HTTP Error ${request.status}`);
  } catch (error) {
    throw new Error(`HTTP Error ${error}`);
  }
};
