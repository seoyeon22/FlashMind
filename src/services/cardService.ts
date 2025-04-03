import { createClient } from "@/app/utils/supabase/client";

const supabase = await createClient();

export async function getCards(deckId: string, userId: string) {
    const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("deck_id", deckId)
        .eq("user_id", userId)

    if (error) throw error;

    return data;
}

export const createCard = async(deckId: string, userId: string, question: string, answer: string) => {

    const { data, error } = await supabase.from("flashcards").insert([
        {
            deck_id: deckId,
            user_id: userId,
            question: question,
            answer: answer,
        },
    ])
    .select();
    
    console.log("supabse response:", data, error)

    if(error){
        throw new Error(error.message);
    }

    return data;
}

export const updateCard = async (cardId: string, userId: string, question: string, answer: string) => {
    const { error } = await supabase
        .from("flashcards")
        .update({ question, answer })
        .eq("id", cardId)
        .eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }
};

export const deleteCard = async (cardId: string, userId: string) => {
    const { error } = await supabase
        .from("flashcards")
        .delete()
        .eq("id", cardId)
        .eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }
};