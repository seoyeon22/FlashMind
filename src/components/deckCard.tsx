export default function DeckCard({ deck }: any){
    return (
        <div className="border p-4 rounded-md">
            <h3>{deck.name}</h3>
        </div>
    )
}