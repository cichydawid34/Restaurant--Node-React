import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';

export const OrdersAddPage = () => {
	const [ employeeName, setEmployeeName ] = useState('');
	const [ employeeSurname, setEmployeeSurname ] = useState('');

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.post('/Orders', {
			employename: employeeName,
			employeSurname: employeeSurname
		});
		navigate('/Employees/List');
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<Form onSubmit={SubmitHandler}>
						<Form.Group>
							<Form.Label>New Order</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter employee name"
								value={employeeName}
								onChange={(e: any) => setEmployeeName(e.target.value)}
							/>
							<Form.Control
								type="text"
								placeholder="Enter employee surname"
								value={employeeSurname}
								onChange={(e: any) => setEmployeeSurname(e.target.value)}
							/>
						</Form.Group>
						<Button type="submit" variant="success">
							Submit
						</Button>
						<Link to="/Orders/List" className="btn btn-danger ml-2">
							Cancel
						</Link>
					</Form>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};