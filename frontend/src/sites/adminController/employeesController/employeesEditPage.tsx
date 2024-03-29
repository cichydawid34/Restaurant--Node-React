import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../css.css';

export const EmployeesEditPage = () => {
	let [ name, setName ] = useState('');
	const [ surname, setSurname ] = useState('');
	const [ position, setPosition ] = useState('');
	const { id } = useParams();

	useEffect(() => {
		axios(`/Employees/${id}`).then((res: any) => {
			console.log(res);
			setName(res.data.name);
			setSurname(res.data.surname);
			setPosition(res.data.position);
		});
	}, []);

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();

		//Modify User
		await axios.put(`/Employees/${id}`, {
			name: name,
			surname: surname,
			position: position
		});
		navigate('/Employees/List');
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="CardMain">
					<div className="Card">
						<h2>Edit Employee</h2>
						<Form onSubmit={SubmitHandler}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={(e: any) => setName(e.target.value)}
								/>
								<Form.Label>Surname</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter surname"
									value={surname}
									onChange={(e: any) => setSurname(e.target.value)}
								/>
								<Form.Label>Position</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter position"
									value={position}
									onChange={(e: any) => setPosition(e.target.value)}
								/>
							</Form.Group>
							<Button type="submit" variant="success">
								Submit
							</Button>
							<Link to="/Menu/List" className="btn btn-danger ml-2">
								Cancel
							</Link>
						</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
