import { createClient } from "@/app/utils/supabase/client"

const supabase = await createClient();

export async function getDeck(deckId: string) {
    const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("id", deckId)
        .single(); 

    if (error) throw error;
    return data;
}

export const getDecks = async(userId: string) => {
    const { data, error } = await supabase.from("decks").select("*").eq("user_id", userId);
    console.log(data);

    if (error) throw error;
    return data;
}

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