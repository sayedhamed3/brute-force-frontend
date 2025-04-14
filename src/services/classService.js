const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;
const index = async () => {
    try {
      const res = await fetch(`${BASE_URL}/sign-in`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  export { 
    index,
  };