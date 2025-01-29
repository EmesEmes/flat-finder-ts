import { supabase } from "@/utils/supabaseClient";

export class FlatsServices {
  constructor() {}

  async createFlat(newFlat: {
    city: string;
    streetname: string;
    streetnumber: number;
    areasize: number;
    yearbuilt: number;
    hasac: string;
    rentprice: number;
    dateavailable: string;
    userid: string;
    images: any;
  }) {
    const file = newFlat.images;
    const filePath = `public/${newFlat.userid}/${file.name}`;

    const { data: dataImage, error: errorImage } = await supabase.storage
      .from("flatsimages")
      .upload(filePath, file);

    if (errorImage) {
      return { success: false, error: errorImage.message };
    }

    const { data, error } = await supabase
      .from("flats")
      .insert([
        {
          city: newFlat.city,
          streetname: newFlat.streetname,
          streetnumber: newFlat.streetnumber,
          areasize: newFlat.areasize,
          yearbuilt: newFlat.yearbuilt,
          hasac: newFlat.hasac,
          rentprice: newFlat.rentprice,
          dateavailable: newFlat.dateavailable,
          userid: newFlat.userid,
          images: dataImage.path,
        },
      ])
      .select();

    if (error) {
      return { success: false, error: error.message };
    } else {
      return { success: true, data };
    }
  }

  async getFlats() {
    const { data: flats, error } = await supabase.from("flats").select();

    if (error) {
      return { success: false, error: error.message };
    } else {
      return { success: true, flats };
    }
  }

  async addFavorite(flatId: string, userId: string) {
    console.log("User ID:", userId);
    console.log("Flat ID:", flatId);
    const { data, error } = await supabase
      .from("favoritesflats")
      .insert([{ flatid: flatId, userid: userId }])
      .select();

    if (error) {
      return { success: false, error: error.message };
    } else {
      return { success: true, data };
    }
  }

  async removeFavorite(userId: string, flatId: string) {
    const { data, error } = await supabase
      .from("favoritesflats")
      .delete()
      .eq("userid", userId)
      .eq("flatid", flatId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }

  async getFavorites(userId: string) {
    const { data, error } = await supabase
      .from("favoritesflats")
      .select("flatid")
      .eq("userid", userId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, favorites: data.map((fav) => fav.flatid) };
  }

  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from("favoritesflats")
      .select("*")
      .eq("userid", userId);

    if (error) {
      return { success: false, error: error.message };
    }

    const flatsIds = data.map((fav) => fav.flatid);

    const { data: flats, error: errorFlats } = await supabase
      .from("flats")
      .select()
      .in("id", flatsIds);

    if (errorFlats) {
      return { success: false, error: errorFlats.message };
    }

    return { success: true, flats };
  }

  async getFlatById(flatId: string) {
    const { data, error } = await supabase
      .from("flats")
      .select()
      .eq("id", flatId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, flat: data[0] };
  }

  async getFlatsByUserId(userId: string) {
    const { data, error } = await supabase
      .from("flats")
      .select()
      .eq("userid", userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, flats: data };
  }
}
