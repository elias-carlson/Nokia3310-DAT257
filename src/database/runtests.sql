--Pretend there 8 seats, 4 tables (2 seats per table)
INSERT INTO Tables VALUES (1, 2);
INSERT INTO Tables VALUES (2, 2);
INSERT INTO Tables VALUES (3, 2);
INSERT INTO Tables VALUES (4, 2);

--Inserting all the allowed booking times for a specific date
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 1700, 1900);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 1730, 1930);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 1800, 2000);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 1830, 2030);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 1900, 2100);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 1930, 2130);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 2000, 2200);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 2030, 2230);
INSERT INTO BookingTimes VALUES (CURRENT_DATE, 2100, 2300);