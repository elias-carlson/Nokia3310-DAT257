package se.chalmers.TDA257.booking;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalTime;

/**
 * Class for the booking object containing details about the booking including who made it and
 * their phone number as well as when it is.
 */
@Getter @Setter
public class Booking {
    private int bookingID;
    private String guestName;
    private String guestTelNr;
    private int nrOfPeople;
    private Date bookingDate;
    private LocalTime startTime;
    private String additionalInfo;
    
    public Booking(int bookingID, String guestName, String guestTelNr, int nrOfPeople, Date bookingDate,
                   LocalTime startTime, String additionalInfo) {
        this.bookingID = bookingID;
        this.guestName = guestName;
        this.guestTelNr = guestTelNr;
        this.nrOfPeople = nrOfPeople;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.additionalInfo = additionalInfo;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + bookingID +
                ", guestName='" + guestName + '\'' +
                ", guestTelNr='" + guestTelNr + '\'' +
                ", nrOfPeople=" + nrOfPeople +
                ", bookingDate=" + bookingDate +
                ", startTime=" + startTime +
                ", additionalInfo=" + additionalInfo +
                '}';
    }
}
