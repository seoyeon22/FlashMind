import { supabase } from "@/utils/supabase/server"

export const getDecks = async(userId: string) => {
    const { data, error } = await supabase.from("decks").select("*").eq("user_id", userId);

    if (error) throw error;
    return data;
}