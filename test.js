const fetchData = async () => {
    await fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=f80fdfb5628b4e1b9cc769e9f9a549a0&ip=105.112.3.74"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
}               

fetchData()