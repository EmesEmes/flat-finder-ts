import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface Flat {
  id: string;
  city: string;
  streetname: string;
  streetnumber: number;
  areasize: number;
  yearbuilt: number;
  hasac: boolean;
  rentprice: number;
  dateavailable: string;
}

interface FlatTableProps {
  flats: Flat[];
  favorites?: string[];
  onToggleFavorite?: (flatId: string) => void;
  onDelete?: (flatId: string) => void;
  onEdit?: any;
}

const FlatTable: React.FC<FlatTableProps> = ({ flats, favorites = [], onToggleFavorite, onDelete, onEdit }) => {
  return (
    <Table className="container mx-auto">
      <TableCaption>List of Flats</TableCaption>
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
          {onToggleFavorite && <TableHead>Action</TableHead>}
          {onDelete && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
  {flats.map((flat) => (
    <TableRow key={flat.id}>
      <TableCell>
        <Link to={`/flat/${flat.id}`}>View</Link>
      </TableCell>
      <TableCell>{flat.city}</TableCell>
      <TableCell>{flat.streetname}</TableCell>
      <TableCell>{flat.streetnumber}</TableCell>
      <TableCell>{flat.areasize}</TableCell>
      <TableCell>{flat.yearbuilt}</TableCell>
      <TableCell>{flat.hasac ? "Yes" : "No"}</TableCell>
      <TableCell>{flat.rentprice}</TableCell>
      <TableCell>{flat.dateavailable}</TableCell>
      {onToggleFavorite && (
        <TableCell>
          <Button onClick={() => onToggleFavorite(flat.id)}>
            {favorites.includes(flat.id) ? "Remove Favorite" : "Add Favorite"}
          </Button>
        </TableCell>
      )}
      {onDelete && (
        <TableCell>
          <Button onClick={() => onDelete(flat.id)}>Delete</Button>
        </TableCell>
      )}
      {onEdit && (
        <TableCell>
          <Link to={`/flat-edit/${flat.id}`} >Edit</Link>
        </TableCell>
      )}
    </TableRow>
  ))}
</TableBody>
    </Table>
  );
};

export default FlatTable;