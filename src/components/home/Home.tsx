import { useEffect, useState } from "react";
import { FlatsServices } from "@/services/flats/flatsServices";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import FlatTable from "../tableFlats/FlatTable";

const Home = () => {
  const [flats, setFlats] = useState([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { userProfile } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const getFlats = async () => {
      const flats = new FlatsServices();
      const example = await flats.getFlats();

      if (example.success) {
        setFlats(example.flats);
      } else {
        setFlats([]);
      }
    };
    getFlats();
  }, []);

  useEffect(() => {
    const getFavorites = async () => {
      const user = userProfile;
      if (user) {
        const flatsService = new FlatsServices();
        const result = await flatsService.getFavorites(user.id);
        if (result.success) {
          console.log(result.favorites);
          setFavorites(result.favorites);
        } else {
          console.log(result.error);
        }
      }
    };
    getFavorites();
  }, [userProfile]);

  const toggleFavorite = async (flatId: string) => {
    const user = userProfile;
    if (userProfile === null) {
          toast({
            title: "Error",
            variant: "destructive",
            description: "You must be logged in to add a favorite",
          });
          return;
        }
    const flatsService = new FlatsServices();
    if (favorites.includes(flatId)) {
      const result = await flatsService.removeFavorite(user.id, flatId);
      if (result.success) {
        setFavorites(favorites.filter((id) => id !== flatId));
      } else {
        console.log(result.error);
      }
    } else {
      const result = await flatsService.addFavorite(flatId, user.id, );
      if (result.success) {
        setFavorites([...favorites, flatId]);
      } else {
        console.log(result.error);
      }
    }
  };
  return (
    <>
    
    {/* <Table className="container mx-auto">
      <TableCaption>All Flats</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>View</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Street Name</TableHead>
          <TableHead>Street Number</TableHead>
          <TableHead>Area Size</TableHead>
          <TableHead>Year Built</TableHead>
          <TableHead>Has AC</TableHead>
          <TableHead>Rent Price</TableHead>
          <TableHead>Date Available</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flats.map(
          (flat: {
            id: string;
            city: string;
            streetname: string;
            streetnumber: number;
            areasize: number;
            yearbuilt: number;
            hasac: boolean;
            rentprice: number;
            dateavailable: string;
          }) => (
            <TableRow key={flat.id}>
              <TableCell>{<Link to={`/flat/${flat.id}`}>view</Link>}</TableCell>
              <TableCell>{flat.city}</TableCell>
              <TableCell>{flat.streetname}</TableCell>
              <TableCell>{flat.streetnumber}</TableCell>
              <TableCell>{flat.areasize}</TableCell>
              <TableCell>{flat.yearbuilt}</TableCell>
              <TableCell>{flat.hasac ? "Yes" : "No"}</TableCell>
              <TableCell>{flat.rentprice}</TableCell>
              <TableCell>{flat.dateavailable}</TableCell>
              <TableCell>
                {/* <Button onClick={() => handleFavorite(flat.id)}>Add Favorite</Button> */}
                {/* <Button onClick={() => toggleFavorite(flat.id)}>
                  {favorites.includes(flat.id) ? "Remove Favorite" : "Add Favorite"}
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table> */} 
    <FlatTable flats={flats} favorites={favorites} onToggleFavorite={toggleFavorite} />
    </>
  );
};

export default Home;
