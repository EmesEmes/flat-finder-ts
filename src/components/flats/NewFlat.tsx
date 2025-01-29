import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { FlatsServices } from "@/services/flats/flatsServices";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

const NewFlat = () => {
  const { userProfile } = useUser();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file)); // Genera vistas previas
    setImagePreviews(previews);
    
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;


    const newFlat = {
      city: form.current.city.value,
      streetname: form.current.streetname.value,
      streetnumber: form.current.streetnumber.value,
      areasize: form.current.areasize.value,
      yearbuilt: form.current.yearbuilt.value,
      hasac: form.current.hasac.checked,
      rentprice: form.current.rentprice.value,
      dateavailable: form.current.dateavailable.value,
      userid: userProfile.id,
      images: form.current.images.files[0],
    };
    const createFlat = new FlatsServices();
    const example = await createFlat.createFlat(newFlat);

    if (example.success) {
      toast({
        title: "Flat Created",
        description: "Your flat has been created successfully",
      });
      form.current.reset();
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: example.error,
      });
    }
  };
  return (
    <main>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-10">
        <h2 className="font-bold text-xl">
          Let's Create a <span className="text-indigo-700">New Flat</span>
        </h2>

        <form className="my-8" onSubmit={handleSubmit} ref={form}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Quito"
              type="text"
              name="city"
              required
            />
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="streetname">Street Name</Label>
              <Input
                id="streetname"
                placeholder="Av. Amazonas"
                type="text"
                name="streetname"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="streetnumber">Street Number</Label>
              <Input
                id="streetnumber"
                placeholder="1351"
                type="number"
                name="streetnumber"
                required
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="areasize">Area Size</Label>
              <Input
                id="areasize"
                placeholder="120"
                type="text"
                name="areasize"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="yearbuilt">Year Built</Label>
              <Input
                id="yearbuilt"
                placeholder="2021"
                type="number"
                name="yearbuilt"
                required
              />
            </LabelInputContainer>
          </div>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <LabelInputContainer className="flex flex-row space-x-2 items-center space-y-0 mb-6">
            <Label htmlFor="hasac">Has AC?</Label>
            <Input id="hasac" type="checkbox" name="hasac" />
          </LabelInputContainer>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="rentprice">Rent Price</Label>
              <Input
                id="rentprice"
                placeholder="1350"
                type="text"
                name="rentprice"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="dataavailable">Date Available</Label>
              <Input
                id="dateavailable"
                placeholder="2021"
                type="date"
                name="dateavailable"
                required
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer>
            <Label htmlFor="images">Date Available</Label>
            <Input
              id="images"
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
            />
          </LabelInputContainer>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-24 rounded-md"
                />
              </div>
            ))}
          </div>

          <button
            className="bg-indigo-700 hover:bg-indigo-900 transition duration-300 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Create Flat 🏠
          </button>
        </form>
      </div>
    </main>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export default NewFlat;
