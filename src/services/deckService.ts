import { createClient } from "@/app/utils/supabase/client"

const supabase = createClient();

export async function getDeck(deckId: string, userId: string) {
    const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("id", deckId)
        .eq("user_id", userId)
        .single(); 

    if (error || !data){
        alert("해당 덱에 대한 접근 권한이 없습니다.");
        window.location.href = "/dashboard";
        return null;
    }
    return data;
}

export const getDecks = async(userId: string) => {  
    const { data, error } = await supabase
      .from("decks")
      .select("*")
      .eq("user_id", userId);
  
    if (error) {
      console.error("getDecks 에러:", error);
      throw error;
    }

    return data;
};

export const createDeck = async (userId: string, name: string) => {
    const { data, error } = await supabase.from("decks").insert([{ user_id: userId, name: name, }]).select();

    if(error) {
        throw new Error(error.message);
    }

    return data[0];
}

export async function updateDeckName(deckId: string, userId: string, newName: string) {
    const { error } = await supabase
        .from("decks")
        .update({ name: newName })
        .eq("id", deckId)
        .eq("user_id", userId);

    if (error) throw error;
}

export async function deleteDeck(deckId: string, userId: string) {
    const { error } = await supabase.from("decks").delete().eq("id", deckId).eq("user_id", userId);
    if (error) throw error;
}