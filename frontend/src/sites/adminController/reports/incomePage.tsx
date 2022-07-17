import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';
export const IncomePage = () => {
	const [ start, setStart ] = useState('');
	const [ end, setEnd ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ backendData, setBackendData ] = useState<any>([]);
	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.get(`/Reports/Income/${start}/${end}`).then((res) => {
			console.log(res.data);
			setPrice(res.data);
		});

		await axios.get(`/Reports/Orders/${start}/${end}`).then((res) => {
			console.log(res.data);
			setBackendData(res.data);
		});
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<Form onSubmit={SubmitHandler}>
						<Form.Group>
							<Form.Label>Summary of income in set of time </Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter start date"
								value={start}
								onChange={(e: any) => setStart(e.target.value)}
							/>
							<Form.Control
								type="date"
								placeholder="Enter end date"
								value={end}
								onChange={(e: any) => setEnd(e.target.value)}
							/>
						</Form.Group>
						<Button type="submit" variant="success">
							Submit
						</Button>
						<Link to="/Menu/List" className="btn btn-danger ml-2">
							Cancel
						</Link>
					</Form>
					<ListGroup>
						{backendData.map((order: any) => (
							<ListGroupItem className="d-flex">
								<p>{order.price}</p>
								{order.positions.map((positions: any) => <p>{positions.name} </p>)}
								<p>{order.date}</p>
							</ListGroupItem>
						))}
					</ListGroup>
					<div>price: {price}</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
