import { useUser } from "@/context/UserContext";
import FlatTable from "../tableFlats/FlatTable"
import { useEffect, useState } from "react";
import { FlatsServices } from "@/services/flats/flatsServices";


const MyFlats = () => {
  const { userProfile} = useUser();
  const [flats, setFlats] = useState([]);
  
  useEffect(() => {
    const fetchFlats = async() => {
      if(!userProfile) return;
      const flatsService = new FlatsServices();
      const result = await flatsService.getFlatsByUserId(userProfile.id);
      if(result.success){
        setFlats(result.flats)
      } else {
        console.log(result.error)
      }
    }
    fetchFlats()
  },[userProfile])

  console.log(flats)

  const handleEdit = async(flatId) => {
    console.log("Edit")
  }
  return (
    <main className="container mx-auto">
      <h2 className="text-3xl text-center mb-10">My <span className="text-indigo-700">Flats</span></h2>
      <FlatTable flats={flats} onEdit/>
    </main>
  )
}

export default MyFlats