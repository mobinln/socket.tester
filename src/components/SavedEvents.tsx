export type itemType = {
    name: string;
    body?: string;
    type: "text" | "json";
};

export default function SavedEvents({
    items,
    handleDelete,
    handleSend,
}: {
    items: itemType[];
    handleDelete: (item: itemType) => void;
    handleSend: (item: itemType) => void;
}) {
    return (
        <ul style={{ maxHeight: 200, overflowY: "auto" }}>
            {items.map((item) => (
                <li key={item.name} style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: 5 }}>{item.name}</span>
                    <span
                        style={{
                            marginRight: "auto",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "30ch",
                        }}
                    >
                        {item.body}
                    </span>
                    <button
                        onClick={() => handleSend(item)}
                        style={{
                            paddingLeft: 8,
                            paddingRight: 4,
                            paddingTop: 8,
                            paddingBottom: 6,
                            marginRight: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className="button button-outline"
                    >
                        <svg width="20" height="20" fill="currentColor">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleDelete(item)}
                        style={{
                            paddingLeft: 8,
                            paddingRight: 4,
                            paddingTop: 8,
                            paddingBottom: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className="button button-outline"
                    >
                        <svg width="20" height="20" fill="currentColor">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    );
}
