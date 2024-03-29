import { Response, Request } from 'express';
const express = require('express');
const router = express.Router();
const Booking = require('../Models/BookingModel');
const Table = require('../Models/TableModel');
const verify = require('../routes/users/authToken');

//GET BOOKINGS
router.get('/', async (req: Request, res: Response) => {
	try {
		//tables
		const bookings = await Booking.find().populate('table');
		return res.status(200).json(bookings);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//POST add booking
router.post('/', async (req: Request, res: Response) => {
	const table = Table.find();
	const bookings = Booking.find();
	const booking = new Booking({
		table: req.body.table,
		start: req.body.start,
		end: req.body.end,
		client: {
			name: req.body.client.name,
			surname: req.body.client.surname
		}
	});
	//validate dates
	if (req.body.start >= req.body.end) return res.status(404).json('Start date must be earlier than end date');

	//check if table exist
	const tableExist = await Table.findById(req.body.table);
	if (!tableExist) return res.status(404).json('No such table');

	//check is table available
	for await (var book of bookings) {
		if (
			book.table == req.body.table &&
			((new Date(book.start) >= new Date(req.body.start) &&
				new Date(book.start) < new Date(req.body.end) &&
				new Date(book.end) > new Date(req.body.start) &&
				new Date(book.end) <= new Date(req.body.end)) ||
				(new Date(book.start) <= new Date(req.body.start) &&
					new Date(book.start) < new Date(req.body.end) &&
					new Date(book.end) > new Date(req.body.start) &&
					new Date(book.end) > new Date(req.body.end)) ||
				(new Date(book.start) >= new Date(req.body.start) &&
					new Date(book.start) < new Date(req.body.end) &&
					new Date(book.end) > new Date(req.body.start) &&
					new Date(book.end) > new Date(req.body.end)) ||
				(new Date(book.start) < new Date(req.body.start) &&
					new Date(book.start) < new Date(req.body.end) &&
					new Date(book.end) > new Date(req.body.start) &&
					new Date(book.end) < new Date(req.body.end)))
		) {
			return res.status(400).json('Stolik jest zajęty');
		}
	}

	//save
	try {
		const savedBooking = await booking.save();
		console.log(savedBooking);
		return res.status(201).json(savedBooking);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//GET booking
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const booking = await Booking.findById(+req.params.id).populate('table');
		return res.status(200).json(booking);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//Delete booking
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const removedBooking = await Booking.deleteOne({ _id: req.params.id });
		return res.status(200).json('Deleted');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//PUT booking
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const updatedBooking = await Booking.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				table: req.body.table,
				start: req.body.start,
				end: req.body.end,
				client: {
					name: req.body.name,
					surname: req.body.surname
				}
			}
		);
		return res.status(200).json('Updated');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

module.exports = router;
