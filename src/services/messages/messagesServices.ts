import { supabase } from "@/utils/supabaseClient";

export class MessagesServices {
  constructor() {}

  async getMessagesByFlatId(flatId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("flatid", flatId)
      .order("created_at", { ascending: true });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, comments: data };
  }

  async createComment({ flatId, userId, comment }: { flatId: string; userId: string; comment: string }) {
    const { data, error } = await supabase.from("comments").insert([
      {
        flatid: flatId,
        authorid: userId,
        comment: comment,
        response: "",
      },
    ]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, comment: data };
  }

  async updateResponse({ commentId, response }: { commentId: string; response: string }) {
    const { data, error } = await supabase
      .from("comments")
      .update({ response: response })
      .eq("id", commentId);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, comment: data };
  }
}
