import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [city, setCity] = useState("New York City")
	const [results, setResults] = useState(null);

	useEffect(() => {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
			.then(res => res.json())
			.then(
				(result) => {
					if (result['cod'] !== 200) {
						setIsLoaded(false)
					} else {
						setIsLoaded(true);
						setResults(result);
					}
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [city])

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return <>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link href="https://fonts.googleapis.com/css2?family=Aldrich&display=swap" rel="stylesheet"/>
			<h1 id="header">Detecting Weather</h1>

			<img className="logo" src={logo} alt="MLH Prep Logo"></img>
			<div>
				<h2>Enter a city below 👇</h2>
				<input
					type="text"
					value={city}
					onChange={event => setCity(event.target.value)} />
				<div className="Results">
					{!isLoaded && <h2>Loading...</h2>}
					{console.log(results)}
					{isLoaded && results && <>
						<h3>{results.weather[0].main}</h3>
						<p>Feels like {results.main.feels_like}°C</p>
						<i><p>{results.name}, {results.sys.country}</p></i>
					</>}
				</div>
			</div>
			<div id="footer">
				<div id="top-right">
					<span>Support Us</span>
					<span>Contribute</span>
				</div>
				<hr/>
				<div id="main-footer">
					<div id="t-and-c">Terms and Conditions</div>
					<div id="copyrights">© Copyrights by _Ganesh</div>
					<div id="about">
						<span id="story">Our Story</span>
						<span id="Team">Our Team</span>
						<span id="benefits">Benefits</span>
					</div>
					<div id="contact">
						<div id="contact_us">Contact Us</div>
						<div id="linkedin"><a href="https://www.linkedin.com/in/sri-tejaswi-ganesh-challapalli-984891219/">LinkedIn</a></div>
						<div id="github"><a href="https://github.com/ganesh10092003">GitHub</a></div>
						<div id="insta"><a href="https://www.instagram.com/insta_ganesh_2003/">Instagram</a></div>
					</div>
				</div>
			</div>
		</>
	}
}

export default App;
