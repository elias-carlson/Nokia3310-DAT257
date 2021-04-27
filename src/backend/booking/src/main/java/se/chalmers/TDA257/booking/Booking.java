package se.chalmers.TDA257.booking;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Class for the booking object containing information about what time the booking is as well
 * as information about the guest
 */
@Getter @Setter
public class Booking {
    private long id;
    private Date bookingDate;
    private int numberOfPeople;
    private String email;

    public Booking(long id, Date bookingDate, int numberOfPeople, String email) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.numberOfPeople = numberOfPeople;
        this.email = email;
    }
}
