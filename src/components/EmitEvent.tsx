import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { useSocket } from "../logic/SocketProvider";
import Radio from "./Radio";
import SavedEvents, { itemType } from "./SavedEvents";

export default function EmitEvent() {
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [type, setType] = useState("text");
    const { socket } = useSocket();
    const [savedItems, setSavedItems] = useState<itemType[]>([]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            if (name) {
                let data = body;
                if (type === "json") {
                    data = JSON.parse(body);
                }
                socket.getInstance().send(name, data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h4>Emit</h4>
                {savedItems.length > 0 && (
                    <button className="button button-clear" onClick={() => setSavedItems([])}>
                        clear
                    </button>
                )}
            </div>
            <SavedEvents
                items={savedItems}
                handleDelete={(item) => setSavedItems(savedItems.filter((i) => i.name !== item.name))}
                handleSend={(item) => socket.getInstance().send(item.name, item.body)}
            />
            <hr />
            <div style={{ display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Event Name"
                    id="eventName"
                    style={{ marginBottom: 0, marginRight: 8 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" style={{ marginBottom: 0, marginRight: 8 }}>
                    send
                </button>
                <button
                    style={{ marginBottom: 0 }}
                    onClick={() => setSavedItems([...savedItems, { name, body, type: type as any }])}
                >
                    +
                </button>
            </div>
            <fieldset style={{ marginTop: 10 }}>
                <legend>Data type:</legend>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {["text", "json"].map((i) => (
                        <Radio key={i} checked={type === i} label={i} value={i} onChange={(c) => c && setType(i)} />
                    ))}
                </div>
            </fieldset>
            {type === "text" ? (
                <textarea
                    placeholder="Some text here..."
                    style={{ height: 200 }}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            ) : (
                <AceEditor
                    placeholder="JSON..."
                    mode="json"
                    theme="monokai"
                    onChange={(v) => setBody(v)}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={body}
                    height="200px"
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            )}
        </form>
    );
}
