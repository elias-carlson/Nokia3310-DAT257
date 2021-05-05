import React,{useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BookingDataService from '../api/BookingDataService.js'

/**
 * Represents the page for selecting time
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Timelist(props) {
    const [timelist, setTimelist] = useState([]);
    const [dropdownTitle, setDropDownTitle] = useState('Välj tid');
    
    useEffect(() => {
        BookingDataService.retrieveAllAvailableTimes(props.booking.date, new Date().toLocaleTimeString(), props.booking.guests)
            .then(
                (response) => {
                    setTimelist(response.data)
                }
            )
    }, [])

    function handleSelect(item){
        console.log(item)
        props.booking.time = item
        setDropDownTitle('Tid: ' + item)
    }

    return (
        <div className="Timelist">
            
            <DropdownButton title={dropdownTitle} id="dropdown-menu" onSelect={handleSelect}>
                {timelist.map(n => (
                    <Dropdown.Item key={n.toString()} eventKey={n.slice(0,-3)}> {n.slice(0,-3)} </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    )
}