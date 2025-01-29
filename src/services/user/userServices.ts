import { supabase } from "@/utils/supabaseClient";

export class UserService {
  constructor() {}

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return { success: false, error: error.message };
    }

    console.log(data.user);
    return { success: true, data };
  }

  async register(newUser: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    birthdate: string;
    isadmin: boolean;
    avatar?: any;
  }) {
    const file = newUser.avatar;

    const filePath = `public/${newUser.phone}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) {
      return { success: false, error: error.message };
    }

    try {
      // Crear usuario en Supabase Auth
      const { data: user, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      if (authError) {
        console.error(authError);
        return { success: false, error: authError.message };
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.user.id,
          email: user.user.email,
          password: newUser.password,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          phone: newUser.phone,
          birthdate: newUser.birthdate,
          isadmin: newUser.isadmin,
          avatar: data.path,
        },
      ]);

      if (profileError) {
        console.error(profileError);
        return { success: false, error: profileError.message };
      }
      return { success: true, data: user };
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(id: string) {
    const { data, error } = await supabase.from("profiles").select().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    } else {
      return { success: true, user: data[0] };
    }
  }
}
