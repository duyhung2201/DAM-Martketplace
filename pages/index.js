import Head from "next/head";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import styles from "../styles/Home.module.css";
import itemCategories from "../constants/itemCategories";
import useGlobalState from "../hooks/useGlobalState";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import * as IPFS from "ipfs-core";
import SkeletonItems from "../components/SkeletonItems";
import recoverPublicKey from "../utils/recoverPublicKey";
import { bufferToHex } from "ethereumjs-util";
import { Transaction } from "ethereumjs-tx";
import getSignedTransaction from "../utils/getSignedTransaction";

export default function Home(props) {
	const router = useRouter();
	// const { account, isAuthenticated } = useMoralis()
	const [ipfsReference, setIpfsReference] = useGlobalState("ipfsReference");

	useEffect(() => {
		const initialIpfs = async () => {
			const ipfs = await IPFS.create({ repo: "ok" + Math.random() });
			setIpfsReference(ipfs);
		};

		initialIpfs();
	}, []);

	const collectionReference = collection(db, "items_listed");
	const queryGetData = query(collectionReference);
	let [dataSnapshot, dataLoading, error] = useCollection(queryGetData);

	dataSnapshot = {
		docs: [
			{
				data: {
					owner: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					customers_requesting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					customers_granting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					image_url: "/static/images/aigc1.png",
					name: "Coffee machine",
					contract_address: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					price: 10,
					description:
						"Immerse yourself in the Metaverse with Necphy's AI-assisted Coffee Machine. Your digital mornings now come with perfectly brewed virtual coffee. Experience the future, one cup at a time.",
					rating: 4,
				},
				id: 1,
			},
			{
				data: {
					owner: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					customers_requesting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					customers_granting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					image_url: "/static/images/aigc2.png",
					name: "Futuristic car",
					contract_address: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					price: 3,
					description:
						"Unleash your digital self with our Self-Driving Sports Sedan. Navigate through the Metaverse in style and comfort. Autonomous driving reimagined for the virtual roads ahead.",
					rating: 4.5,
				},
				id: 2,
			},
			{
				data: {
					owner: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					customers_requesting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					customers_granting: "0x56F53dec94c55C9D6A134Dc4eE5988eE7Ee3A626",
					image_url: "/static/images/aigc3.png",
					name: "Romantic box",
					contract_address: "0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A",
					price: 6,
					description:
						"Protect your virtual emotions with our Metaphoric Heart Box. An exclusive Metaverse item, it symbolizes emotional safeguarding in a world where falling for another is just a click away.",
					rating: 3.5,
				},
				id: 3,
			},
		],
	};

	function hex_to_ascii(str1) {
		var hex = str1.toString();
		var str = "";
		for (var n = 0; n < hex.length; n += 2) {
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
		}
		return str;
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<div className="flex flex-col">
				<div
				// onClick={() => {
				//     // const nonce = 201
				//     // const gasPrice = "0x6ccbf77e"
				//     // const gasLimit = "0xe894"
				//     // const to = "0xfF7A1b81dFe016054E0C8243a0Dd7a6690edd4DB"
				//     // const value = "0x470de4df820000"
				//     // const data = "0xdf393a19"
				//     // const signedTx = getSignedTransaction(
				//     //     nonce,
				//     //     gasPrice,
				//     //     gasLimit,
				//     //     to,
				//     //     value,
				//     //     data
				//     // )
				//     // console.log(`signedTx: ${signedTx}`)
				//     // Create a tx object from signed tx
				//     const txData = {
				//         nonce: "0xc8",
				//         gasPrice: "0x6f26665b",
				//         gasLimit: "0xe894",
				//         to: "0x0BF607251Bb841642A5898d8337E0BaBEa2b5B62",
				//         value: "0x2386f26fc10000",
				//         data: "0xdf393a19",
				//         v: 1,
				//         r: "0x5d71f761ca3f53b1e45fbda461642fff8b2ceb09330ea2756ed142b8584c5e2d",
				//         s: "0x06c292b7fbd348253634b7bb2ed9beba230611a2d9d1665a182ef2f2e0b2c9ba",
				//     }
				//     const opts = {
				//         chain: "rinkeby",
				//     }
				//     const tx = new Transaction(txData, opts)
				//     const address = bufferToHex(tx.getSenderAddress())
				//     const publicKey = bufferToHex(tx.getSenderPublicKey())
				//     console.log(`address: ${address}`)
				//     console.log(`publicKey: ${publicKey}`)
				// }}
				>
					<p className="font-bold text-3xl mx-8 my-8">Explore Digital Assets</p>
				</div>
				<div className="flex flex-row justify-start mb-3 pb-2 border-b-2">
					<p
						className="mx-10 font-semibold  cursor-pointer text-black border-blue-400 border-b-4"
						onClick={() => {
							router.push(`/`);
						}}
					>
						All Products
					</p>
					{itemCategories.map((category) => {
						return (
							<p
								className="mx-10 font-semibold text-slate-500 cursor-pointer hover:text-black"
								onClick={() => {
									router.push(`/${category.replace(" ", "-")}`);
								}}
							>
								{category}
							</p>
						);
					})}
				</div>
				{dataSnapshot ? (
					<div className="grid grid-cols-3 gap-3">
						{dataSnapshot.docs.map((doc, idx) => {
							return (
								<div className="flex flex-row justify-center" key={idx}>
									<ItemCard itemData={doc.data} itemId={doc.id} />
								</div>
							);
						})}
					</div>
				) : (
					<SkeletonItems />
				)}
			</div>
		</div>
	);
}
