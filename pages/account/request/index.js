import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import Header from "../../../components/Header";
import { db } from "../../../firebase";
import useGlobalState from "../../../hooks/useGlobalState";
import RequestCard from "../../../components/RequestCard";
import { useMoralis } from "react-moralis";

function request() {
	const { account } = useMoralis();
	const router = useRouter();
	const collectionReference = collection(db, "items_listed");
	const queryGetData = query(
		collectionReference,
		where("owner", "==", account),
		where("customers_requesting", "!=", [])
	);

	let [dataSnapshot, dataLoading, error] = useCollection(queryGetData);
	dataSnapshot = {
		docs: [
			{
				data: {
					owner: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					customers_requesting: [
						"0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
						"0x6b680D3dd3646AA5C786F2e9194154C360906706",
						"0xDF7dA4B504a2dD305ECa158935Ff174f7cAb4DFa",
						"0xDD833312A8264F6471AeCe8390BeD8058e361019",
					],
					customers_granting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					image_url: "/static/images/aigc1.png",
					name: "Coffee machine",
					contract_address: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					price: 10,
					description: "test",
					rating: 4,
				},
				id: 1,
			},
			{
				data: {
					owner: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					customers_requesting: [
						"0xDF7dA4B504a2dD305ECa158935Ff174f7cAb4DFa",
						"0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
						"0xDD833312A8264F6471AeCe8390BeD8058e361019",
						"0x6b680D3dd3646AA5C786F2e9194154C360906706",
					],
					customers_granting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					image_url: "/static/images/aigc2.png",
					name: "Futuristic car",
					contract_address: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					price: 10,
					description: "test",
					rating: 4,
				},
				id: 2,
			},
			{
				data: {
					owner: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					customers_requesting: [
						"0xDD833312A8264F6471AeCe8390BeD8058e361019",
						"0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
						"0xDF7dA4B504a2dD305ECa158935Ff174f7cAb4DFa",
						"0x6b680D3dd3646AA5C786F2e9194154C360906706",
					],
					customers_granting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					image_url: "/static/images/aigc3.png",
					name: "Romantic box",
					contract_address: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					price: 10,
					description: "test",
					rating: 4,
				},
				id: 1,
			},
		],
	};

	return (
		<div>
			<Header />
			<div className="flex flex-col">
				<div>
					<p className="font-bold text-3xl mx-8 my-8">Your Account</p>
				</div>
				<div className="flex flex-row justify-start mb-3 pb-2 border-b-2">
					<p
						className="mx-10 font-semibold text-slate-500 cursor-pointer hover:text-black"
						onClick={() => {
							router.push("/account/listed");
						}}
					>
						Your Listed Products
					</p>
					<p
						className="mx-10 font-semibold text-slate-500 cursor-pointer hover:text-black"
						onClick={() => {
							router.push("/account/portfolio");
						}}
					>
						Your Portfolio
					</p>
					{/* <p
                        className="mx-10 font-semibold text-slate-500 cursor-pointer hover:text-black"
                        onClick={() => {
                            router.push("/account/purchased")
                        }}
                    >
                        Purchased Products
                    </p> */}
					<p
						className="mx-10 font-semibold text-black cursor-pointer border-blue-400 border-b-4"
						onClick={() => {
							router.push("/account/request");
						}}
					>
						Pending Requests
					</p>
				</div>
				{dataSnapshot ? (
					<div className="flex flex-col">
						{dataSnapshot.docs.map((doc) => {
							return (
								<RequestCard key={doc.id} itemData={doc.data} itemId={doc.id} />
							);
						})}
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}

export default request;
