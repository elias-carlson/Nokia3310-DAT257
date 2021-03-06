package se.chalmers.TDA257.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.xml.crypto.Data;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.net.URI;
import java.sql.Time;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.LocalDate;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Controller for the backend which acts as a RESTful API
 */
@RestController
@CrossOrigin(origins = "https://hamncafetgullholmen.herokuapp.com")
public class BookingController {
    public static final String ACCOUNT_SID = System.getenv("ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("AUTH_TOKEN");

    @Autowired
    private DatabaseController databaseController;

    @PostMapping("/bookings/confirmation")
    private ResponseEntity<?> SendConfirmationSMS(@RequestBody Booking booking){
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        String confirmationMsg = "Hej, " + booking.getGuestName() + "! Din bokning kl. " + booking.getStartTime() + ", " + booking.getBookingDate() + " hos oss på Gullholmens Hamncafé är nu bekräftad. För att ändra eller ta bort din bokning kontakta oss på 030457007. No show debiteras med 100kr/person. Tack för din bokning! OBS, detta sms går inte att svara på.";

        try {
            Message message = Message.creator(
                //To
                new com.twilio.type.PhoneNumber(booking.getGuestTelNr()),
                //From
                new com.twilio.type.PhoneNumber("+46701926415"),
                confirmationMsg)
                    .create();
            return ResponseEntity.ok(true);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.ok(false);
        }
    }


    @GetMapping("/availableTimes")
    public List<Time> getAllAvailableTimes(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, @DateTimeFormat(pattern = "HH:mm:ss") LocalTime time, int guests){
        return databaseController.fetchAvailableTimes(date, time, guests);
    }

    @GetMapping("/availableDays")
    public List<Date> getAllAvailableDays(int guests){
        return databaseController.fetchAvailableDays(guests);
    }

    /**
     * Kolla ifall det finns några bokningar på datumet, om det gör det - skicka alert att det inte går att stänga dagen
     * pga finns bokningar. Om det inte finns några bokningar läggs datumet till i en lista i backenden över stängda dagar
     * när bokningarna hämtas samt försöker lägga till bokningar kollar funktionen först om datumet
     * finns med i listan över stängda datum (kom ihåg att radera när 2 dagar gammal i cron)
     * 
     */

    /**
     * Deletes specified booking if it exists
     * @return Responseentity describing for example if the deletion was succesful
     */
    @DeleteMapping("/bookings/id/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
        int success = databaseController.deleteBookingByID(id);
        if (success != 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/bookings/delete/{date}")
    public ResponseEntity<Void> deleteBookingTimes(@PathVariable Date date) {
        int success = databaseController.deleteBookingTimes(date);
        if (success != 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/bookings/add/{date}")
    public ResponseEntity<Void> addBookingTimes(@PathVariable Date date) {
        int success = databaseController.addBookingTimes(date);
        if (success != 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Adds a new booking, and creates an URI for the newly created booking
     * 
     * @param booking
     * @return Responseentity describing for example if the deletion was succesful
     */
    @PostMapping("/bookings/create")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
        databaseController.insertNewBooking(booking);
        Booking b = databaseController.fetchBookingByTelNrDateTime(booking.getGuestTelNr(),booking.getBookingDate(),booking.getStartTime());
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(b.getBookingID()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/bookings/date/{date}")
    public List<Booking> getBookingsByDate(@PathVariable Date date) {
        return databaseController.fetchBookingsByDate(date);
    }

    @GetMapping("/bookings/date/{date}/{time}")
    public List<Booking> getBookingByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        Time sqlTime = Time.valueOf(time);
        return databaseController.fetchBookingsByDateAndTime(date,sqlTime);
    }

    @GetMapping("/timeslots/date/{date}")
    public List<Time> getTimeSlotsByDate(@PathVariable Date date) {
        return databaseController.fetchTimeSlotsByDate(date);
    }

    @GetMapping("/bookings/count/bookedtables/{date}/{time}")
    public int getNumberOfBookedTablesByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        Time sqlTime = Time.valueOf(time);
        return databaseController.fetchNumberOfBookedTablesByDateAndTime(date,sqlTime);
    }

    @GetMapping("/bookings/count/guests/{date}/{time}")
    public int getNumberOfGuestsByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        int nrOfGuests = 0;
        Time sqlTime = Time.valueOf(time);
        List<Booking> bookings = databaseController.fetchBookingsByDateAndTime(date,sqlTime);
        for (Booking b : bookings) {
            nrOfGuests += b.getNrOfPeople();
        }
        return nrOfGuests;
    }

    /**
     * Updates the booking with specified id with the values from updatedBooking
     * @param id
     * @param updatedBooking
     * @return number of rows affected
     */
    @PutMapping("/bookings/{id}")
    public int updateBooking(@PathVariable int id, @RequestBody Booking updatedBooking) {
        return databaseController.updateBooking(id,updatedBooking);
    }

}
