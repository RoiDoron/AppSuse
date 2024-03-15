export function ColorInput({ note, onUpdateNote }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']

    function onSetColor(ev) {
        console.log(ev.target.style.backgroundColor)
        const newColor = ev.target.style.backgroundColor
        const updatedStyle = { ...note.style, backgroundColor: newColor }
        const updatedNote = { ...note, style: updatedStyle }
        onUpdateNote(updatedNote)
    }

    return <section className="color-input">
        <div className="items-container">
            {
                colors.map(color => <div key={color}
                    className="item"
                    onClick={onSetColor}
                    style={{ backgroundColor: color }}
                ></div>)
            }
        </div>
    </section>
}