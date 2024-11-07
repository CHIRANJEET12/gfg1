const getImageUrls = async () => {
    const response = await fetch('/');
    if (!response.ok) throw new Error('Failed to fetch image URLs');
    return response.json();
  };
  
  export default getImageUrls;
  