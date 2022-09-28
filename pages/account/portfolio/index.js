import { collection, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useMoralis } from "react-moralis"

import Header from "../../../components/Header"
import ItemCard from "../../../components/ItemCard"
import { db } from "../../../firebase"
import useGlobalState from "../../../hooks/useGlobalState"

function portfolio() {
    const { account } = useMoralis()
    const router = useRouter()

    const collectionReference = collection(db, "items_listed")

    const queryGetData = query(
        collectionReference,
        where("customers_requesting", "array-contains", account)
    )
    const [dataSnapshot, dataLoading, error] = useCollection(queryGetData)

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
                            router.push("/account/listed")
                        }}
                    >
                        Your Listed Products
                    </p>
                    <p
                        className="mx-10 font-semibold text-black cursor-pointer border-blue-400 border-b-4"
                        onClick={() => {
                            router.push("/account/portfolio")
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
                        className="mx-10 font-semibold text-slate-500 cursor-pointer  hover:text-black "
                        onClick={() => {
                            router.push("/account/request")
                        }}
                    >
                        Pending Requests
                    </p>
                </div>
                {dataSnapshot ? (
                    <div className="grid grid-cols-3 gap-3">
                        {dataSnapshot.docs.map((doc) => {
                            return (
                                <div className="flex flex-row justify-center">
                                    <ItemCard itemData={doc.data()} itemId={doc.id} />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default portfolio
