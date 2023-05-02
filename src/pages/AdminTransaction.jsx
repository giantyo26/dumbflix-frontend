import triangle from "../assets/image/triangle.png";

import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Transaction() {
    // Fetching data films from database
    let { data: transactions } = useQuery("transactionCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
    });

    return (
        <div className="bg-black w-screen h-[3000px] pt-10">
            <div className="mx-auto w-[900px] h-[300px]">
                <h1 className="text-white font-semibold text-lg mb-4">Incoming Transaction</h1>
                <table class="rounded-md w-[100%]" style={{ backgroundColor: "#1F1F1F" }} >
                    <thead>
                        <tr>
                            <th className="text-darkRed p-3">No</th>
                            <th className="text-darkRed p-3 w-[140px]">User</th>
                            <th className="text-darkRed p-3 w-[160px]">Subscribe for</th>
                            <th className="text-darkRed p-3">Status User</th>
                            <th className="text-darkRed p-3">Status Payment</th>
                            <th className="text-darkRed p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {transactions?.map((item) => (
                            <tr className="border-t-[1px] border-solid border-gray-700">
                                <td className="text-white p-3 text-center">{item.id}</td>
                                <td className="text-white p-3 text-center">{item.user.fullname}</td>

                                {item.price == "30000" && <td className="text-white p-3 text-center">1 Month</td>}
                                {item.price == "80000" && <td className="text-white p-3 text-center">3 Month</td>}
                                {item.price == "150000" && <td className="text-white p-3 text-center">6 Month</td>}

                                <td className="text-blue-500 p-3 text-center">{item.user.subscribe}</td>

                                <td className="text-green-500 p-3 text-center">{item.status}</td>

                                <td className="dropdown text-center py-2">
                                    <label tabIndex={0} className="cursor-pointer"><img src={triangle} alt="action" /></label>
                                    <ul tabIndex={0} className="dropdown-content menu py-1 shadow bg-darkBlack rounded-md w-40">
                                        <li className="text-green-600 cursor-pointer hover:bg-darkGrey">Approved</li>
                                        <li className="text-darkRed cursor-pointer hover:bg-darkGrey">Canceled</li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
