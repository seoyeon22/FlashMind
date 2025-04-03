import { createDeck } from "@/services/deckService";
import { useAuthStore } from "@/stores/authStore";
import { useDeckStore } from "@/stores/deckStore";
import { useState } from "react";

interface Deck {
    id: string;
    name: string;
}

export default function CreateDeckForm({ onCreate }: { onCreate: (deck: Deck) => void }){
    const { user } = useAuthStore();
    const { addDeck } = useDeckStore();
    const [deckName, setDeckName] = useState("");

    const handleCreateDeck = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const deckName = formData.get("deckName") as string;
        
        if(!deckName || !user){
            return;
        }

        try{
            const newDeck = await createDeck(user, deckName);
            addDeck(newDeck);
            setDeckName("");
            onCreate(newDeck);
        } catch(error) {
            console.error("Error creating deck:", error);
        }
    };

    return (
        <form onSubmit={handleCreateDeck}>
            <div className="border-1 border-dashed p-1 flex flex-col rounded-md shadow-md">
                <input className="text-center" name="deckName" type="text" placeholder="title" 
                    value={deckName} onChange={(e) => setDeckName(e.target.value)}required></input>
                <button type="submit" className="bg-blue-500 rounded-md">Create Deck</button>
            </div>
        </form>
    )
}
