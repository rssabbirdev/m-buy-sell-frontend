import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';

const AllOrder = () => {
	const [authHeader] = useAuthHeader();
	const { user } = useContext(AuthContext);
	const { data: orders, isLoading } = useQuery({
		queryKey: ['orders', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/orders/${user?.uid}`,
				{
					headers: authHeader,
				}
			);
			console.log(res);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
	}
	return (
		<div className='w-screen md:w-[calc(100vw-240px)]'>
			<div className='divider'></div>
			<h2 className='text-3xl text-center'>All order List</h2>
			<div className='divider'></div>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>No.</th>
							<th>Product Image</th>
							<th>Product Name</th>
							<th>Seller Name</th>
							<th>Price</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, i) => (
							<tr key={order._id}>
								<th>{i + 1}</th>
								<th>
									<div class='avatar'>
										<div class='w-16 rounded'>
											<img
												src={order.product_info?.product_image}
												alt='Tailwind-CSS-Avatar-component'
											/>
										</div>
									</div>
								</th>
								<td>{order.product_info?.product_name}</td>
								<td>{order.seller_info?.seller_name}</td>
								<td>${order.product_info?.product_price}</td>
								<td>
									<button
										// onClick={() =>
										// 	handleUserDelete(order._id)
										// }
										className='btn btn-xs btn-danger'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllOrder;